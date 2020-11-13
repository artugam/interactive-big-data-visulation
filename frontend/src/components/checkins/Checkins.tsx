import React from "react";
import axios from 'axios';
import {loadSettings} from "../../config";

export class Checkins extends React.Component {

  async componentDidMount() {
    const settings = await loadSettings();

    const data = await axios.get(settings.apiUrl + '/checkins/chart').then(data => data.data);
    console.log(data);


  }

  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
