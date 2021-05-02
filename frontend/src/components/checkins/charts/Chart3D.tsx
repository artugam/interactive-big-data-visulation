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

  async componentDidMount() {
    await this.reload();
  }

  shouldComponentUpdate(nextProps: Readonly<CheckinsChartProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.visible != nextProps.visible || this.props.chart != nextProps.chart;
  }

  async componentDidUpdate(prevProps: Readonly<CheckinsChartProps>, prevState: Readonly<{visible: boolean}>, snapshot?: any) {
    if(this.props.visible != prevProps.visible) {
      Plotly.purge('checkinsChart');
    }
    if(this.props.chart != prevProps.chart) {
      await this.reload();
    }
  }

  async reload(filters?: CheckinsChartFilters) {
    this.setState({visible: true}, () => {
      Plotly.purge('checkinsChart');
      this.load(this.props.chart).then(() => {
        this.setState({visible: false});
      });
    });

    // this.setState({visible: true}, () => {
    //   Plotly.purge('checkinsChart');
    //   this.props.service.loadChartData(filters || this.props.filters).then((chartData: CheckinsChart) => {
    //     this.load(chartData).then(() => {
    //       this.setState({visible: false});
    //     });
    //   });
    // });
  }


  async load(chart?: CheckinsChart) {
    if(!chart) {
      return;
    }
//     const a=[], b=[], c=[];
//     for(let i=0;i<50; i++)
//     {
//       var a_ = Math.random();
//       a.push(a_);
//
//       var b_ = Math.random();
//       b.push(b_);
//
//       var c_ = Math.random();
//       c.push(c_);
//     }
// // Plotting the mesh
//     var outData = [
//       {
//         opacity:0.8,
//         color:'rgb(300,100,200)',
//         type: 'mesh3d',
//         x: a,
//         y: b,
//         z: c,
//       }
//     ];
    // Plotly.newPlot('myDiv', data);

    const intensity = [0, 50, 500, 2000, 5000];
    const colorscale = [
      [0, 'rgb(255, 0, 255)'],
      [500, 'rgb(0, 255, 0)'],
      [5000, 'rgb(0, 0, 255)']
    ];
    // const colorscale = 'YlOrRd';
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
        flatshading: this.props.filters.type !== ChartType.MESH,
        // intensity: this.props.filters.type === ChartType.MESH ? intensity : undefined
      };
      if(this.props.filters.type === ChartType.MESH) {
        // @ts-ignore
        // trace1['colorscale'] = 'Viridis';
        // @ts-ignore
        trace1['intensity'] = z;
        // // @ts-ignore
        // trace1['opacity'] = 0.6;
      }
      outData.push(trace1);
    }

    const axesVisibility = false;
    const layout: Partial<Layout> = {
      height: 600,
      scene: {
        xaxis: {
          visible: axesVisibility,
          // range: [0, 120]
          // range: this.checkinsOutput.settings.range
          range: this.props.filters.type !== ChartType.MESH ? chart.settings.range : undefined
        },
        yaxis: {
          visible: axesVisibility,
          // range: this.checkinsOutput.settings.range,
          range: this.props.filters.type !== ChartType.MESH ? chart.settings.range : undefined,

          // range: [0, 10]
        },
        zaxis: {
          visible: axesVisibility,
          linecolor: outData[0].z,


        },
        camera: {
          eye: {
            x: 1.25,
            y: 1.25,
            z: 1.25
          }
        }
      },
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
      }
    };
    Plotly.plot('checkinsChart', outData, layout);
  }

  render() {
    return (
      <div className={'row'} style={{height: 615, backgroundColor: "white", display:"block", marginTop: 65, paddingLeft: '5%'}}>
        <div id={'checkinsChart'}></div>

        <Loader
          type="MutatingDots"
          visible={this.props.visible}
          color="#00BFFF"
          height={100}
          width={100}
          style={{paddingTop: '20%'}}
        />
      </div>
    );
  }
}


export default Chart3D;
