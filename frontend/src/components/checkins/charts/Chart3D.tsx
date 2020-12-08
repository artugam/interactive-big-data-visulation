import React, {Component} from 'react';
import {ChartType, CheckinsChart, CheckinsChartFilters} from "../types";
import {loadSettings} from "../../../config";
import axios from "axios";
import {Layout} from "plotly.js";
// @ts-ignore
import * as Plotly from 'plotly.js/dist/plotly';
import {CheckinsChartProps} from "./types";
import Loader from 'react-loader-spinner'


class Chart3D extends Component<CheckinsChartProps> {

  state = {
    visible: false
  }


  async componentDidMount() {
    await this.reload();
  }

  async reload() {
    this.setState({visible: true});
    this.props.service.loadChartData(this.props.filters).then((chartData: CheckinsChart) => {
      this.load(chartData).then(() => {

        this.setState({visible: false});
      });
    });
  }


  async load(chart: CheckinsChart) {
    const
      i = [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2] as unknown as Int8Array,
      j = [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3] as unknown as Int8Array,
      k = [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6] as unknown as Int8Array;
    const outData = [];
    for (const {x, y, z} of chart.data) {
      const trace1 = {
        x,
        y,
        z,
        i: this.props.filters.type === ChartType.BOXES ? i : undefined,
        j: this.props.filters.type === ChartType.BOXES ? j : undefined,
        k: this.props.filters.type === ChartType.BOXES ? k : undefined,
        type: 'mesh3d',
        flatshading: true
      };
      outData.push(trace1);
    }
    console.log(outData);

    const layout: Partial<Layout> = {
      scene: {
        xaxis: {
          // visible: false,
          // range: [0, 120]
          // range: this.checkinsOutput.settings.range
          range: chart.settings.range
        },
        yaxis: {
          // visible: false,
          // range: this.checkinsOutput.settings.range,
          range: chart.settings.range,

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
      <div className={'row'} style={{height: 600, width: 600, backgroundColor: "white", display:"block"}}>
        <div id={'checkinsChart'}></div>

        <Loader
          type="Oval"
          visible={this.state.visible}
          color="#00BFFF"
          height={100}
          width={100}
          style={{paddingTop: '40%'}}
        />
      </div>
    );
  }
}


export default Chart3D;
