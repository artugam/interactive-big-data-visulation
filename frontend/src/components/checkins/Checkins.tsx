import React from "react";
import axios from 'axios';
import {loadSettings} from "../../config";

// @ts-ignore
import * as Plotly from 'plotly.js/dist/plotly';
import {Layout, PlotData} from 'plotly.js';
import {CheckinsChart, CheckinsFilters} from "./types";




const DEFAULT_SPACE_LAYER = 4;
const DEFAULT_TIME_LAYER = 6;

export class Checkins extends React.Component {

  data: CheckinsChart[] = [];

  state: CheckinsFilters = {
    spaceLayer: DEFAULT_SPACE_LAYER,
    timeLayer: DEFAULT_TIME_LAYER
  }


  async componentDidMount() {
    await this.loadData(this.state);
  }

  async loadData(params: CheckinsFilters) {
    const settings = await loadSettings();
    this.data = await axios.get(settings.apiUrl + '/checkins/chart', {params}).then(data => data.data) as CheckinsChart[];
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

    for (const {x, y, z} of this.data) {
      // const trace1: Partial<PlotData> = {
      const trace1 = {
        title: 'asd',
        x,
        y,
        z,
        i,
        j,
        k,
        // mode: 'markers',
        fillcolor: 'rgba(217, 217, 217, 0.14)',
        // marker: {
        //   size: 12,
        //   line: {
        //     color: 'rgba(217, 217, 217, 0.14)',
        //     width: 0.5
        //   },
        //   opacity: 0.8
        // },
        type: 'mesh3d',
        // type: 'scatter3d',
        flatshading: true
      };
      outData.push(trace1);
    }

    const layout: Partial<Layout> = {
      scene: {
        xaxis: {
          // visible: false,
          // range: [0, 120]
          // range: [0, 10]
        },
        yaxis: {
          // visible: false,
          // range: [0, 120],
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
