import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {AvailableSettings, ChartType, CheckinsChartFilters, MinMax} from "./types";
import {Mark} from "@material-ui/core/Slider/Slider";
import Chart3D from "./charts/Chart3D";


// const marks = {
//     // spaceLayer : [
//     //     {
//     //         value: globalData.settings.spaceLayer.min,
//     //         label: globalData.settings.spaceLayer.min,
//     //     },
//     //     {
//     //         value: globalData.settings.spaceLayer.max,
//     //         label: globalData.settings.spaceLayer.max,
//     //     },
//     // ],
//     // timeLayer : [
//     //     {
//     //         value: globalData.settings.timeLayer.min,
//     //         label: globalData.settings.timeLayer.min,
//     //     },
//     //     {
//     //         value: globalData.settings.timeLayer.max,
//     //         label: globalData.settings.timeLayer.max,
//     //     },
//     // ],
//     time : [
//         {
//             value: globalData.settings.time.min,
//             label: globalData.settings.time.min,
//         },
//         {
//             value: globalData.settings.time.max,
//             label: globalData.settings.time.max,
//         },
//     ],
// };

interface ISettings {
  availableSettings: AvailableSettings,
  checkinsFilters: CheckinsChartFilters;
  onSettingChange: (name: string, value: number | number[] | boolean | string | object) => void;
  onClickSave: () => void;
}
type DefaultValues = {
  time?: number[],
  timeLayer?: number,
  spaceLayer?: number,
};

export class Settings extends Component<ISettings> {

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, checked} = event.target;
    this.props.onSettingChange(name, checked);
  }

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  onRadioValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {id, name} = event.target;
    this.props.onSettingChange(name, id);
  }

  /**
   *
   * @param name
   */

  onSliderChange = (name: string) => (e: any, value: number | number[]) => {
    this.props.onSettingChange(name, value);
  };

  generateSliderLabels = (params: MinMax): Mark[] => {
    return Array.from(Array(params.max + 1).keys()).map(value => {
      return {
        value,
        label: value
      }
    });
  }

  defaultValues?: DefaultValues = undefined;
  getDefaultValues = (): DefaultValues => {
    if(!this.defaultValues) {
      // @ts-ignore
      const [first, last] = this.props.checkinsFilters.time;
      this.defaultValues = {
        time: [first, last],
        timeLayer: this.props.checkinsFilters.timeLayer,
        spaceLayer: this.props.checkinsFilters.spaceLayer,
      }
      console.log(first);
      console.log(last);
      console.log(this.defaultValues.time);
    }
    return this.defaultValues;
  }

  render() {
    this.getDefaultValues();
    return (
      <div className={"bg-white p-4 text-dark rounded-lg opacity"}>
        <h2>Settings</h2>
        <form className={"m-4"}>
          <div className={"row"}>
            {/*<div className={"col-md-6 text-left"}>*/}
            {/*  <input type="checkbox" name="axes" onChange={this.onInputValueChange}*/}
            {/*         defaultChecked={this.props.checkinsFilters.axes}/>*/}
            {/*  <label htmlFor="axes">Axes</label><br/>*/}
            {/*  <input type="checkbox" name="perspective" onChange={this.onInputValueChange}*/}
            {/*         defaultChecked={this.props.checkinsFilters.perspective}/>*/}
            {/*  <label htmlFor="perspective">Perspective</label><br/>*/}
            {/*  <input type="checkbox" name="light" onChange={this.onInputValueChange}*/}
            {/*         defaultChecked={this.props.checkinsFilters.light}/>*/}
            {/*  <label htmlFor="light">Light</label><br/>*/}
            {/*</div>*/}
            <div className={"col-md-12 text-left"}>
              <div className={"row"}>
                <div className={"col-md-3"}>
                  <input type="radio" id="tiles" name="type" onChange={this.onRadioValueChange}
                         checked={this.props.checkinsFilters.type === ChartType.TILES}/>
                  <label htmlFor="tiles">&nbsp;Tiles</label><br/>
                </div>
                <div className={"col-md-3"}>
                  <input type="radio" id="boxes" name="type" onChange={this.onRadioValueChange}
                         checked={this.props.checkinsFilters.type === ChartType.BOXES}/>
                  <label htmlFor="boxes">&nbsp;Boxes</label><br/>
                </div>
                <div className={"col-md-3"}>
                  <input type="radio" id="mesh" name="type" onChange={this.onRadioValueChange}
                         checked={this.props.checkinsFilters.type === ChartType.MESH}/>
                  <label htmlFor="mesh">&nbsp;Mesh</label><br/>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Typography id="spaceLayerLabel" gutterBottom> Space Layer </Typography>
            <Slider
              key={`slider-spaceLayer`}
              name="spaceLayer"
              min={this.props.availableSettings.global.spaceLayer.min}
              max={this.props.availableSettings.global.spaceLayer.max}
              defaultValue={this.defaultValues?.spaceLayer}
              aria-labelledby="spaceLayerLabel"
              step={1}
              marks={this.generateSliderLabels(this.props.availableSettings.global.spaceLayer)}
              valueLabelDisplay="auto"
              onChangeCommitted={this.onSliderChange('spaceLayer')}
            />
          </div>

          <div className="mt-3">

            <Typography id="timeLayerLabel" gutterBottom> Time Layer </Typography>
            <Slider
              name="timeLayer"
              min={this.props.availableSettings.global.timeLayer.min}
              max={this.props.availableSettings.global.timeLayer.max}
              key={`slider-timeLayer`}
              defaultValue={this.defaultValues?.timeLayer}
              aria-labelledby="timeLayerLabel"
              step={1}
              marks={this.generateSliderLabels(this.props.availableSettings.global.timeLayer)}
              valueLabelDisplay="auto"
              onChangeCommitted={this.onSliderChange('timeLayer')}
            />
          </div>

          <div className="mt-3">
            <Typography id="timeLabel" gutterBottom> Time </Typography>
            <Slider
              name="time"
              min={this.props.availableSettings.chart.time.min}
              max={this.props.availableSettings.chart.time.max}
              key={`slider-time`}
              defaultValue={this.defaultValues?.time}
              aria-labelledby="timeLabel"
              step={1}
              marks={[
                {
                  value: this.props.availableSettings.chart.time.min,
                  label: this.props.availableSettings.chart.time.min,
                },
                {
                  value: this.props.availableSettings.chart.time.max,
                  label: this.props.availableSettings.chart.time.max,
                },
              ]}
              valueLabelDisplay="auto"
              onChangeCommitted={this.onSliderChange('time')}
            />
          </div>
        </form>
        <button type="button" className="btn btn-primary" onClick={this.props.onClickSave}>Update</button>
      </div>
    );
  }
}


export default Settings;
