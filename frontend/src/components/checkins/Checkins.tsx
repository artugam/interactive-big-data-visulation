import React from "react";
import axios from 'axios';
import {loadSettings} from "../../config";

// @ts-ignore
import * as Plotly from 'plotly.js/dist/plotly';
import Settings from "./Settings";
import {
  Layout,
  PlotData,
  PlotRelayoutEvent,
  PlotRestyleEvent,
  PlotSelectionEvent
} from 'plotly.js';
import {ChartType, CheckinsChart, CheckinsChartGlobalSettings, CheckinsFilters} from "./types";


const globalData = {
  settings: {
    spaceLayer: {
      min: 0,
      max: 7
    },
    timeLayer: {
      min: 0,
      max: 9
    },
    time: {
      min: 0,
      max: 123456
    }
  }
};

const DEFAULT_SPACE_LAYER = 4;
const DEFAULT_TIME_LAYER = 6;
const DEFAULT_TYPE = ChartType.BOXES;
// const DEFAULT_TYPE = ChartType.TILES;
const DEFAULT_TIME = [0,123456];
const DEFAULT_STRUCTURE = 'boxes';

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
    time: DEFAULT_TIME,
    axes: true,
    perspective: false,
    light: true,
    structure: DEFAULT_STRUCTURE,
    type: DEFAULT_TYPE,
  };


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
    // if(params.points) {
    //   await this.load3d();
    // } else {
      await this.loadHeatMap();
    // }
  }

  onInputValueChange = (name: string, value: boolean): void => {
    this.setState({[name]: value});
    // this.loadData(this.state)
  };

  onSliderChange = (name: string, value: number | number[]): void => {
    this.setState({[name]: value});
  };

  onRadioValueChange = (id: string, name: string): void => {
    this.setState({[name]: id});
  };

  async load3d(params: CheckinsFilters) {
    const settings = await loadSettings();

    const output = await axios.get(settings.apiUrl + '/checkins/chart', {params})
      .then(data => {
        console.log(data);
        return data.data;
      }) as CheckinsChart;

    // this.checkinsOutput = output;

    const
      i = [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2] as unknown as Int8Array,
      j = [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3] as unknown as Int8Array,
      k = [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6] as unknown as Int8Array;
    const outData = [];

    // for (const {x, y, z} of this.checkinsOutput.data) {
    for (const {x, y, z} of output.data) {
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
      scene: {
        xaxis: {
          // visible: false,
          // range: [0, 120]
          // range: this.checkinsOutput.settings.range
          range: output.settings.range
        },
        yaxis: {
          // visible: false,
          // range: this.checkinsOutput.settings.range,
          range: output.settings.range,

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

  async loadHeatMap ()  {
    const outHeatMap = [];
    for (const {x, y, z} of this.checkinsOutput.data) {
      // const trace1: Partial<PlotData> = {
      const trace1: Partial<PlotData> = {
        // hoverinfo: 'skip',
        x,
        y,
        z,
        // i: this.state.type === ChartType.BOXES ? i : undefined,
        // j: this.state.type === ChartType.BOXES ? j : undefined,
        // k: this.state.type === ChartType.BOXES ? k : undefined,
        type: 'heatmap',
        showscale: false,
        colorscale: [[0, 'rgb(0,0,255)']]
      };
      outHeatMap.push(trace1);
    }

    const heatMapLayout: Partial<Layout> = {
      showlegend: false,
      scene: {
        xaxis: {
          visible: false
        },
        yaxis: {
          visible: false
        },
        zaxis: {
          // visible: false
        }
      }
    };
    const test: Partial<PlotData>[] = [
      {
        z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
        type: 'heatmap',
        colorscale: [[0, 'rgb(0,0,255)']],
        showscale: false
      }
    ];

    // const plot = await Plotly.newPlot('heatMap', test, heatMapLayout);
    const plot = await Plotly.newPlot('heatMap', this.checkinsOutput.data, heatMapLayout);

    plot.on('plotly_relayout', (event: PlotRelayoutEvent) => {
      console.log('plotly_relayout');
      console.log(event);

      let points = undefined;
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
      const options = {...this.state}
      options.points = points;
      // this.load3d(options);
    });
  }

  render() {
    return (
      <>
        <div className={"col-md-12 mx-0  p-5 row"}>

          <Settings
              globalData={globalData}
              checkinsFilters={this.state}
              onInputValueChange={this.onInputValueChange}
              onSliderChange={this.onSliderChange}
              onRadioValueChange={this.onRadioValueChange}/>


          <div className={"col-md-6 offset-1"}>
            <div id={'checkinsChart'}></div>
            <div id={'heatMap'}></div>
          </div>
        </div>
      </>
  )};
}
