import React, { Component } from 'react';
import axios from 'axios';

import { BASE_API_URL } from '../../utils/Config';

import TemperatureSearch from './TemperatureSearch';
import TemperatureHistory from './TemperatureHistory';
import TemperatureModel from '../../models/TemperatureModel';

export class Temperature extends Component<any, any> {
  state = { temperatures: [] };

  componentDidMount() {
    axios({
      url: `${BASE_API_URL}/api/v1/temperatures`,
      method: 'get',
      timeout: 5000,
    })
    .then(res => {
      res.data.map((temperature: TemperatureModel) => {
        this.addTemperature(temperature);
      })
    })
    .catch(err => {
      throw err;
    });
  }

  addTemperature = (temperatureModel: TemperatureModel) => {
    let temperatures: TemperatureModel[] = this.state.temperatures;

    temperatures.push(temperatureModel);
    
    this.setState({temperatures: temperatures});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <TemperatureSearch sendAddTemperature={this.addTemperature.bind(this)}/>
          </div>
        </div>

        <div className="row">
          <div className="col mt-4">
            <TemperatureHistory temperatures={this.state.temperatures}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Temperature
