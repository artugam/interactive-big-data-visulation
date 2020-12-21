import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {AvailableSettings, ChartType, CheckinsChartFilters} from "./types";


// const marks = {
//     spaceLayer : [
//         {
//             value: globalData.settings.spaceLayer.min,
//             label: globalData.settings.spaceLayer.min,
//         },
//         {
//             value: globalData.settings.spaceLayer.max,
//             label: globalData.settings.spaceLayer.max,
//         },
//     ],
//     timeLayer : [
//         {
//             value: globalData.settings.timeLayer.min,
//             label: globalData.settings.timeLayer.min,
//         },
//         {
//             value: globalData.settings.timeLayer.max,
//             label: globalData.settings.timeLayer.max,
//         },
//     ],
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
    onSettingChange: (name: string, value: number | number[] | boolean | string | object) => void
}

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
     * @param {React.ChangeEvent<{}>} event
     * @param {number | number[]} value
     */
    onSliderChange = (event: React.ChangeEvent<{}>, value: number | number[]): void => {
        // let out: number | number[] | MinMax = value;
        // if(Array.isArray(value)) {
        //     out = {
        //         min: value[0],
        //         max: value[0]
        //     }
        // }
        // @ts-ignore
        const name = event.target.parentElement.getElementsByTagName("input")[0].getAttribute('name');
        this.props.onSettingChange(name, value);
    };


    render() {
        return (
            <div className={"bg-white p-4 text-dark rounded-lg opacity"}>
                <h2>Settings</h2>
                <form className={"m-4"}>
                    <div className={"row"}>
                        <div className={"col-md-6 text-left"}>
                            <input type="checkbox" name="axes" onChange={this.onInputValueChange} defaultChecked={this.props.checkinsFilters.axes}/>
                            <label htmlFor="axes">Axes</label><br/>
                            <input type="checkbox" name="perspective"  onChange={this.onInputValueChange} defaultChecked={this.props.checkinsFilters.perspective}/>
                            <label htmlFor="perspective">Perspective</label><br/>
                            <input type="checkbox" name="light"  onChange={this.onInputValueChange} defaultChecked={this.props.checkinsFilters.light}/>
                            <label htmlFor="light">Light</label><br/>
                        </div>
                        <div className={"col-md-6 text-left"}>
                            <input type="radio" id="tiles" name="type" onChange={this.onRadioValueChange} checked={this.props.checkinsFilters.type === ChartType.TILES}/>
                            <label htmlFor="tiles">Tiles</label><br/>
                            <input type="radio" id="boxes" name="type" onChange={this.onRadioValueChange} checked={this.props.checkinsFilters.type === ChartType.BOXES}/>
                            <label htmlFor="boxes">Boxes</label><br/>
                            <input type="radio" id="mesh" name="type" onChange={this.onRadioValueChange} checked={this.props.checkinsFilters.type === ChartType.MESH}/>
                            <label htmlFor="mesh">Mesh</label><br/>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Typography id="spaceLayerLabel" gutterBottom> Space Layer </Typography>
                        <Slider
                            name="spaceLayer"
                            min={this.props.availableSettings.global.spaceLayer.min}
                            max={this.props.availableSettings.global.spaceLayer.max}
                            key={`slider-${this.props.checkinsFilters.spaceLayer}`}
                            defaultValue={this.props.checkinsFilters.spaceLayer}
                            aria-labelledby="spaceLayerLabel"
                            step={1}
                            // marks={marks.spaceLayer}
                            valueLabelDisplay="auto"
                            onChangeCommitted={this.onSliderChange.bind(this)}
                        />
                    </div>

                    <div className="mt-3">

                        <Typography id="timeLayerLabel" gutterBottom> Time Layer </Typography>
                        <Slider
                            name="timeLayer"
                            min={this.props.availableSettings.global.timeLayer.min}
                            max={this.props.availableSettings.global.timeLayer.max}
                            key={`slider-${this.props.checkinsFilters.timeLayer}`}
                            defaultValue={this.props.checkinsFilters.timeLayer}
                            aria-labelledby="timeLayerLabel"
                            step={1}
                            // marks={marks.timeLayer}
                            valueLabelDisplay="auto"
                            onChangeCommitted={this.onSliderChange.bind(this)}
                        />
                    </div>

                    <div className="mt-3">

                        <Typography id="timeLabel" gutterBottom> Time </Typography>
                        <Slider
                            name="time"
                            min={this.props.availableSettings.chart.time.min}
                            max={this.props.availableSettings.chart.time.max}
                            key={`slider-key`}
                            defaultValue={this.props.checkinsFilters.time}
                            aria-labelledby="timeLabel"
                            step={1}
                            // marks={marks.time}
                            valueLabelDisplay="auto"
                            onChangeCommitted={this.onSliderChange.bind(this)}
                        />
                    </div>
                </form>
            </div>
        );
    }
}


export default Settings;
