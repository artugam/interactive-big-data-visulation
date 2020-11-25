import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {CheckinsChart, CheckinsFilters, GlobalsData} from "./types";


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
    globalData: GlobalsData,
    checkinsFilters: CheckinsFilters;
    onSliderChange: (name: string, value: number | number[]) => void,
    onInputValueChange: (name: string, value: string) => void,
}

class Settings extends Component<ISettings> {

    onInputValueChange (event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        this.props.onInputValueChange(name, value);
    }

    onSliderChange (event: React.ChangeEvent<{}>, value: number | number[]): void {

        // @ts-ignore
        const name = event.target.parentElement.getElementsByTagName("input")[0].getAttribute('name');
        this.props.onSliderChange(name, value);
    };


    render() {
        return (
            <div className={"col-md-5 bg-white p-4 text-dark rounded-lg opacity"}>
                <h2>Settings</h2>
                <form className={"m-4"}>
                    <div className={"row"}>
                        <div className={"col-md-6"}>
                            <input type="checkbox" name="spaceLayer"  onChange={this.onInputValueChange}/>
                            <label htmlFor="spaceLayer">Space Layer</label><br/>
                            <input type="checkbox" name="aaa"  onChange={this.onInputValueChange}/>
                            <label htmlFor="aaa">Space Layer</label><br/>
                            <input type="checkbox" name="bbb"  onChange={this.onInputValueChange}/>
                            <label htmlFor="bbb">Space Layer</label><br/>
                        </div>
                        <div className={"col-md-6"}>
                            <input type="radio" name="ccc"  onChange={this.onInputValueChange}/>
                            <label htmlFor="ccc">Space Layer</label><br/>
                            <input type="radio" name="ddd"  onChange={this.onInputValueChange}/>
                            <label htmlFor="ddd">Space Layer</label><br/>
                            <input type="radio" name="eee"  onChange={this.onInputValueChange}/>
                            <label htmlFor="eee">Space Layer</label><br/>
                        </div>
                    </div>
                    <div className="mt-3">

                        <Typography id="spaceLayerLabel" gutterBottom>
                            Space Layer
                        </Typography>
                        <Slider
                            name="spaceLayer"
                            min={this.props.globalData.settings.spaceLayer.min}
                            max={this.props.globalData.settings.spaceLayer.max}
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

                        <Typography id="timeLayerLabel" gutterBottom>
                            Time Layer
                        </Typography>
                        <Slider
                            name="timeLayer"
                            min={this.props.globalData.settings.timeLayer.min}
                            max={this.props.globalData.settings.timeLayer.max}
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

                        <Typography id="timeLabel" gutterBottom>
                            Time Layer
                        </Typography>
                        <Slider
                            name="time"
                            min={this.props.globalData.settings.time.min}
                            max={this.props.globalData.settings.time.max}
                            key={`slider-${this.props.checkinsFilters.time}`}
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