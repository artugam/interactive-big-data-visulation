import React from "react";
import Settings from "./Settings";
import {
  AvailableSettings,
  ChartType,
  CheckinsState
} from "./types";
import Heatmap from "./charts/Heatmap";
import CheckinsService, {createCheckinsServiceInstance} from "./checkins.service";
import Chart3D from "./charts/Chart3D";

const DEFAULT_SPACE_LAYER = 4;
const DEFAULT_TIME_LAYER = 4;
const DEFAULT_TYPE = ChartType.BOXES;
const DEFAULT_TIME = [0,123456];
const DEFAULT_STRUCTURE = 'boxes';

export class Checkins extends React.Component {

  service: CheckinsService = createCheckinsServiceInstance();


  state: CheckinsState = {
    usedSettings: {
      spaceLayer: DEFAULT_SPACE_LAYER,
      timeLayer: DEFAULT_TIME_LAYER,
      time: DEFAULT_TIME,
      axes: true,
      perspective: false,
      light: true,
      structure: DEFAULT_STRUCTURE,
      type: DEFAULT_TYPE,
    },
    availableSettings: {
      global: {
        spaceLayer: {
          min: 0,
          max: 7
        },
        timeLayer: {
          min: 0,
          max: 5
        }
      },
      chart: {
        time: {
          min: 0,
          max: 123
        }
      }
    }
  };

  async componentWillMount() {
    const result = this.service.loadAvailableSettings().then(e => e.settings);
    this.setState({ availableSettings: { ...this.state.availableSettings, global: { ...this.state.availableSettings.global, ...result }} } );
  }

  onUsedSettingChange = (name: string, value: number | number[] | string | boolean | object): void => {
    this.setState({ usedSettings: {...this.state.usedSettings, [name]: value}});
  };




  render() {
    return (
      <>
        <div className={"col-md-12 mx-0  p-5 row"}>
          <Settings
            availableSettings={this.state.availableSettings}
            checkinsFilters={this.state.usedSettings}
            onSettingChange={this.onUsedSettingChange}
          />

          <div className={"col-md-6 offset-1"}>
            {/*<div id={'checkinsChart'}></div>*/}
            {/*<Chart3D />*/}
            {/*<Heatmap />*/}
            {/*<div id={'heatMap'}></div>*/}
            {/*<Chart3D filters={this.state.usedSettings} service={this.service} onAvailableSettingChange={this.onAvailableSettingChange} />*/}
            <Heatmap filters={this.state.usedSettings} service={this.service} />
          </div>
        </div>
      </>
  )};
}
