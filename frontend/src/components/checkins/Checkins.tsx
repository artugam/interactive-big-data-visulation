import React, {RefObject} from "react";
import Settings from "./Settings";
import {
  AvailableSettings,
  ChartType,
  CheckinsState
} from "./types";
import Heatmap from "./charts/Heatmap";
import CheckinsService, {createCheckinsServiceInstance} from "./checkins.service";
import Chart3D from "./charts/Chart3D";

const DEFAULT_SPACE_LAYER = 6;
const DEFAULT_TIME_LAYER = 4;
const DEFAULT_TYPE = ChartType.BOXES;
const DEFAULT_TIME = [0, 123456];

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
    },
    chart3d: React.createRef<Chart3D>()
  };

  async componentWillMount() {
    const result = this.service.loadAvailableSettings().then(e => e.settings);
    this.setState({
      availableSettings: {
        ...this.state.availableSettings,
        global: {...this.state.availableSettings.global, ...result}
      }
    });
  }

  onUsedSettingChange = (name: string, value: number | number[] | string | boolean | object): void => {
    this.setState({usedSettings: {...this.state.usedSettings, [name]: value}}, () => {console.log(this.state.usedSettings);});
  };


  render() {
    return (
      <>
      <div className={"col-md-12 mx-0  p-5 row"}>
        <div className={"col-md-6"}>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                 aria-controls="nav-home" aria-selected="true">Settings</a>
              <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                 aria-controls="nav-profile" aria-selected="false">Layout</a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <Settings
                availableSettings={this.state.availableSettings}
                checkinsFilters={this.state.usedSettings}
                onSettingChange={this.onUsedSettingChange}

              />
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <Heatmap filters={this.state.usedSettings} onSettingChange={this.onUsedSettingChange} service={this.service} chart3d={this.state.chart3d}/>
            </div>
          </div>
        </div>
      {/*<div className={"col-md-12 mx-0  p-5 row"}>*/}
      {/*  <div className={"col-md-6"}>*/}
      {/*    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">*/}
      {/*      <li className="nav-item">*/}
      {/*        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"*/}
      {/*           aria-controls="pills-home" aria-selected="true">Settings</a>*/}
      {/*      </li>*/}
      {/*      <li className="nav-item">*/}
      {/*        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"*/}
      {/*           aria-controls="pills-profile" aria-selected="false">Layout</a>*/}
      {/*      </li>*/}
      {/*    </ul>*/}
      {/*    <div className="tab-content" id="pills-tabContent">*/}
      {/*      <div className="tab-pane fade show active row" id="pills-home" role="tabpanel"*/}
      {/*           aria-labelledby="pills-home-tab">*/}
      {/*        <Settings*/}
      {/*          availableSettings={this.state.availableSettings}*/}
      {/*          checkinsFilters={this.state.usedSettings}*/}
      {/*          onSettingChange={this.onUsedSettingChange}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">*/}
      {/*        <Heatmap filters={this.state.usedSettings} service={this.service}/>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*<Settings*/}
      {/*  availableSettings={this.state.availableSettings}*/}
      {/*  checkinsFilters={this.state.usedSettings}*/}
      {/*  onSettingChange={this.onUsedSettingChange}*/}
      {/*/>*/}


      <div className={"col-md-6"}>
        {/*<div id={'checkinsChart'}></div>*/}
        {/*<Chart3D />*/}
        {/*<Heatmap />*/}
        {/*<div id={'heatMap'}></div>*/}
        <Chart3D ref={this.state.chart3d} filters={this.state.usedSettings} service={this.service} onSettingChange={this.onUsedSettingChange}/>
        {/*<Heatmap filters={this.state.usedSettings} service={this.service} />*/}
      </div>
      </div>
  </>
  )
  };
}
