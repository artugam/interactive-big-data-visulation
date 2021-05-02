import React, {Component} from 'react';
import {ChartType, CheckinsChart, PointsRange} from "../types";
// @ts-ignore
import * as Plotly from 'plotly.js/dist/plotly';
import {Layout, PlotData, PlotRelayoutEvent} from 'plotly.js';
import {CheckinsChartProps} from "./types";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



class Heatmap extends Component<CheckinsChartProps> {

  state = {
    visible: false
  }

  /**
   *
   * @param {Readonly<CheckinsChartProps>} nextProps
   * @param {Readonly<{visible: boolean}>} nextState
   * @param nextContext
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps: Readonly<CheckinsChartProps>, nextState: Readonly<{visible: boolean}>, nextContext: any): boolean {
    return nextProps.filters.spaceLayer !== this.props.filters.spaceLayer || this.state.visible !== nextState.visible;
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await this.reloadChart();
  }

  /**
   *
   * @param {Readonly<CheckinsChartProps>} prevProps
   * @param {Readonly<{}>} prevState
   * @param snapshot
   * @returns {Promise<void>}
   */
  async componentDidUpdate(prevProps: Readonly<CheckinsChartProps>, prevState: Readonly<{}>, snapshot?: any) {
    if(prevProps.filters.spaceLayer != this.props.filters.spaceLayer) {
      await this.reloadChart();
    }
  }

  async reloadChart ()  {
    this.setState({visible: true}, () => {
      Plotly.purge('heatMap');
      this.props.service?.loadChartData({
        ...this.props.filters,
        type: ChartType.HEATMAP
      }).then((chartData: CheckinsChart) => {
        this.load(chartData).then(() => {
          this.setState({visible: false})
        })
      });
    });
  }


  async load (chart: CheckinsChart)  {
    const outHeatMap = [];
    for (const {x, y, z} of chart.data) {
      const trace1: Partial<PlotData> = {
        hoverinfo: 'skip',
        x,
        y,
        z,
        type: 'heatmap',
        showscale: false,
        showlegend: false,
        "marker.showscale": false,
        colorscale: [[0, 'rgb(0,0,255)']]
      };
      outHeatMap.push(trace1);
    }


    const heatMapLayout: Partial<Layout> = {
      showlegend: false,
      // width: 700,

      autosize: true,
      // scene: {
        xaxis: {
          // range: [0, 1.6],

          showgrid: false,
          zeroline: false,
          showticklabels: false,
          linecolor: 'white',
          ticks: ''
        },
        yaxis: {
          showgrid: false,
          zeroline: false,
          showticklabels: false,
          linecolor: '#ffffff',
          ticks: ''
        }
      // }
    };

    const plot = await Plotly.plot('heatMap', outHeatMap, heatMapLayout);

    plot.on('plotly_relayout', (event: PlotRelayoutEvent) => {
      let points: PointsRange | undefined = undefined;
      if(event['xaxis.range[0]'] && event['yaxis.range[1]'] && event['xaxis.range[1]'] && event['yaxis.range[0]']) {
        points = {
          leftTop: {
            x: event['xaxis.range[0]'] as number,
            y: event['yaxis.range[1]'] as number
          },
          rightBottom: {
            x: event['xaxis.range[1]'] as number,
            y: event['yaxis.range[0]'] as number
          }
        }
      }
      if(this.props.onSettingChange) {
        this.props.onSettingChange('points', points, this.props.onClickSave);
      }

    });
  }

  render() {
    return (
      <div className={"bg-white p-4 text-dark rounded-lg opacity"} style={{height: 600, backgroundColor: "white", display:"block"}}>
        <div className={"row"} style={{display: "inline-flex"}}>
          {/*<div className={'col-md-4'}></div>*/}
          <div id={'heatMap'}></div>
          {/*<div id={'heatMap'} className={'col-xs-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4'}></div>*/}
          <Loader
            type="Oval"
            visible={this.state.visible}
            color="#00BFFF"
            height={100}
            width={100}
            style={{paddingTop: '40%'}}
          />
        </div>
      </div>
    );
  }
}


export default Heatmap;
