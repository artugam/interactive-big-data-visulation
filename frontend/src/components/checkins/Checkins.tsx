import React from "react";
import axios from 'axios';
import {loadSettings} from "../../config";

// @ts-ignore
import * as Plotly from 'plotly.js/dist/plotly';
import {Layout} from 'plotly.js';
import {ChartType, CheckinsChart, CheckinsChartGlobalSettings, CheckinsFilters} from "./types";



const DEFAULT_SPACE_LAYER = 2;
const DEFAULT_TIME_LAYER = 4;
const DEFAULT_TYPE = ChartType.BOXES;
// const DEFAULT_TYPE = ChartType.TILES;


export class Checkins extends React.Component {

  checkinsOutput: CheckinsChart = {
    data: [],
    settings: {
      time:{
        min: 0,
        max: 20
      },
      range: []
    }
  };

  state: CheckinsFilters = {

    spaceLayer: DEFAULT_SPACE_LAYER,
    timeLayer: DEFAULT_TIME_LAYER,
    type: DEFAULT_TYPE,
    time: 5
  }


  async componentDidMount() {
    await Promise.all([
      this.loadData(this.state),
      this.loadGlobalSettings()
    ])
  }

  async loadGlobalSettings() {
    const settings = await loadSettings();
    const output = await axios.get(settings.apiUrl + '/checkins/chart/global-settings')
      .then(data => {
        console.log(data);
        return data.data;
      }) as CheckinsChartGlobalSettings;
    console.log(output);
  }

  async loadData(params: CheckinsFilters) {

    const settings = await loadSettings();

    const output = await axios.get(settings.apiUrl + '/checkins/chart', {params})
      .then(data => {
        console.log(data);
        return data.data;
      }) as CheckinsChart;

    this.checkinsOutput = output;
    this.scatterD3();
  }

  onInputValueChange (event: React.ChangeEvent<HTMLInputElement>) {
    // const {name, value} = event.target;
    // console.log(name, value);
    // this.setState({[name]: value});
    // this.loadData(this.state)

  }

  scatterD3 = () => {
    const
      i = [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2] as unknown as Int8Array,
      j = [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3] as unknown as Int8Array,
      k = [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6] as unknown as Int8Array;
    const outData = [];

    for (const {x, y, z} of this.checkinsOutput.data) {
      // const trace1: Partial<PlotData> = {
      const trace1 = {
        x,
        y,
        z,
        i: this.state.type === ChartType.BOXES ? i : undefined,
        j: this.state.type === ChartType.BOXES ? j : undefined,
        k: this.state.type === ChartType.BOXES ? k : undefined,
        type: 'mesh3d',
        flatshading: true
      };
      outData.push(trace1);
    }

    const layout: Partial<Layout> = {
      selectdirection: 'h',
      scene: {
        xaxis: {
          // visible: false,
          // range: [0, 120]
          range: this.checkinsOutput.settings.range
        },
        yaxis: {
          // visible: false,
          range: this.checkinsOutput.settings.range,

          // range: [0, 10]
        },
        zaxis: {
          // visible: false
        }
      },
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
      }
    };
    Plotly.newPlot('checkinsChart', outData, layout);
  }

  render() {
    return (
      <>
        <label htmlFor="spaceLayer">Space Layer</label>
        <input name="spaceLayer" value={this.state.spaceLayer} onChange={this.onInputValueChange}/>
        <label htmlFor="spaceLayer">Time Layer</label>
        <input name="timeLayer" value={this.state.timeLayer} onChange={this.onInputValueChange}/>


        <div id={'checkinsChart'}></div>
      </>
  )};
}
