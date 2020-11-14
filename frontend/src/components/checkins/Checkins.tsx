import React from "react";
import axios from 'axios';
import {loadSettings} from "../../config";
import Plot from 'react-plotly.js';
// @ts-ignore
import * as Plotly from 'plotly.js/dist/plotly';
// import Plotly, {Data} from 'plotly.js';

export interface CheckinsRow {
  tile_x: string;
  tile_y: string;
  time: number;
}

export class Checkins extends React.Component {

  state = {data: [], layout: {}, frames: [], config: {}};

  data: {x: number[], y: number[], z: number[] } = {x: [], y: [], z: []};



  async componentDidMount() {
    const settings = await loadSettings();

    const data = await axios.get(settings.apiUrl + '/checkins/chart').then(data => data.data) as CheckinsRow[];

    console.log(data);
    for (const row of data) {
      this.data.x.push(Number(row.tile_x));
      this.data.y.push(Number(row.tile_y));
      this.data.z.push(row.time);
    }
    this.d3();
  }

  d3 = () => {
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', (err: any, rows: any) => {
    // Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', (err: any, rows: any) => {

      const unpack = (rows: any, key: any) => {
        return rows.map((row: any) => {
          return row[key];
        });
      }


      var z_data = []
      for (let i = 0; i < 24; i++) {
        z_data.push(unpack(rows, i));
      }

      console.log(z_data);

      const out = [z_data[0], z_data[1]]

      console.log(out);
      // var data = [{
      //   z: z_data,
      //   type: 'surface',
      // }];

      var data = [{
        x: this.data.x,
        y: this.data.y,
        z: this.data.z,
        type: 'mesh3d',
        zaxis: {
          ticks: 'outside',
          tick0: 0,
          tickwidth: 4
        }
      }];

      console.log(this.data);

      var layout = {
        title: 'Checkins',
        autosize: false,
        width: 500,
        height: 500,
        margin: {
          l: 65,
          r: 50,
          b: 65,
          t: 90,
        }
      };
      // @ts-ignore
      Plotly.newPlot('myDiv', data, layout);
    });
  }



  render() {
    return <div id={'myDiv'}>hello</div>;
    // return <Plot
    //   data={this.state.data}
    //   layout={this.state.layout}
    //   frames={this.state.frames}
    //   config={this.state.config}
    //   onInitialized={(figure) => this.setState(figure)}
    //   onUpdate={(figure) => this.setState(figure)}
    // />
  }
}
