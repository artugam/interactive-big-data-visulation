import React, {RefObject} from "react";
import Settings from "./Settings";
import {
  AvailableSettings,
  ChartType, CheckinsChart,
  CheckinsState
} from "./types";
import Heatmap from "./charts/Heatmap";
import CheckinsService, {createCheckinsServiceInstance} from "./checkins.service";
import Chart3D from "./charts/Chart3D";
import {Button} from "@material-ui/core";

const DEFAULT_SPACE_LAYER = 6;
const DEFAULT_TIME_LAYER = 4;
const DEFAULT_TYPE = ChartType.BOXES;
const DEFAULT_TIME = [0, 123];

export class Checkins extends React.Component {


  service: CheckinsService = createCheckinsServiceInstance();

  initialSettings = {
    spaceLayer: DEFAULT_SPACE_LAYER,
    timeLayer: DEFAULT_TIME_LAYER,
    time: DEFAULT_TIME,
    axes: true,
    perspective: false,
    light: true,
    type: DEFAULT_TYPE,
  }

  state: CheckinsState = {
    lastSettings: this.initialSettings,
    usedSettings: this.initialSettings,
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
    },
    chart3d: React.createRef<Chart3D>(),
    chart3dVisibility: false,
    heatmapVisibility: false,
    chartData: undefined
  };


  onClickSave = async () => {
    await this.loadChartData();
  }

  async componentWillMount() {
    this.service.loadAvailableSettings().then(e => {
      this.setState({
        availableSettings: {
          ...this.state.availableSettings,
          global: {...this.state.availableSettings.global, ...e.settings}
        }
      });
    });
    await this.loadChartData();
  }

  async loadChartData () {
    this.setState({...this.state, chart3dVisibility: true}, () => {
      this.service.loadChartData(this.state.usedSettings).then((chartData: CheckinsChart) => {
        this.setState({...this.state, chartData, chart3dVisibility: false, lastSettings: this.state.usedSettings});
      });
    });
  }

  onUsedSettingChange = (name: string, value?: number | number[] | string | boolean | object, callback?: () => void): void => {
    this.setState({usedSettings: {...this.state.usedSettings, [name]: value}}, callback);
  };

  render() {
    return (
      <>
      <div className={"col-md-12 mx-0  p-5 row"}>
        <div className={"col-md-12 p-0"}>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                 aria-controls="nav-home" aria-selected="true">Settings</a>
              <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                 aria-controls="nav-profile" aria-selected="false">Layout</a>
            </div>
          </nav>
          <div className="tab-content bg-white" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <Settings
                availableSettings={this.state.availableSettings}
                checkinsFilters={this.state.usedSettings}
                onSettingChange={this.onUsedSettingChange}
                onClickSave={this.onClickSave}
              />
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <Heatmap filters={this.state.lastSettings} onClickSave={this.onClickSave} onSettingChange={this.onUsedSettingChange} service={this.service} chart3d={this.state.chart3d} />
            </div>
          </div>
        </div>


        <div className={"col-md-12"}>
          <Chart3D ref={this.state.chart3d} filters={this.state.lastSettings} chart={this.state.chartData} visible={this.state.chart3dVisibility}/>
        </div>
      </div>
  </>
  )};
}
