import React, { Component } from 'react';
import axios from 'axios';

import { BASE_API_URL } from '../../utils/Config';

import { TemperatureWidget } from './TemperatureWidget';
import TemperatureModel from '../../models/TemperatureModel';

import './TemperatureSearch.scss';

export class TemperatureSearch extends Component<any, any> {
  constructor(props:any) {
    super(props);

    this.state = {
      loading: false,
      hasResult: false,
      address: '',
      errorMessage: '',

      temperatureValue: 0,
      temperatureUnit: '',
      cityName: '',
      districtName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeAddress = this.handleOnChangeAddress.bind(this);
  }

  private handleOnChangeAddress(event:any) {
    this.setState({
      address: event.target.value,
      hasResult: false,
      errorMessage: ''
    });
  }

  private handleSubmit(event:any) {
    event.preventDefault();

    this.setState({loading: true, hasResult: false});
    
    axios({
      url: `${BASE_API_URL}/api/v1/geocode/searchByAddress?q=${this.state.address}`,
      method: 'get',
      timeout: 5000,
    })
    .then(res => res.data)
    .then(geodata => {
      if(geodata.status !== "ok") {
        throw new Error(geodata.error_message)
      }

      if(!geodata.zipcode) {
        throw new Error("We was not able to find the zip code for this address. Please, fill a full address")
      }

      axios({
        url: `${BASE_API_URL}/api/v1/temperatures/search?zipcode=${geodata.zipcode}&country_code=${geodata.country_code}`,
        method: 'get',
        timeout: 5000,
      })
      .then(res => {
        let data = res.data;

        if(data.status !== "ok") {
          throw new Error(data.error_message)
        }

        return {
          zipcode: parseInt(geodata.zipcode),
          country_code: geodata.country_code,
          city_name: geodata.city_name,
          district: geodata.district,
          address: geodata.address,
          temperature: data.weather.current,
          unit: data.weather.unit
        }
      })
      .then(payload => {
        this.setState({
          temperatureValue: parseFloat(payload.temperature).toFixed(0),
          temperatureUnit: payload.unit,
          cityName: payload.city_name,
          district: payload.district,
        })

        this.postTemperature(payload);
      })
      .catch(err => {
        this.setState({
          loading: false,
          hasResult: false,
          errorMessage: err.message
        })
      })
    })
    .catch(err => {
      this.setState({
        loading: false,
        hasResult: false,
        errorMessage: err.message
      })
    });
  }

  private addTemperature = (temperatureModel: TemperatureModel) => {
    this.props.sendAddTemperature(temperatureModel);
  }

  private postTemperature(payload: any) {
    axios({
      url: `${BASE_API_URL}/api/v1/temperatures`,
      method: 'post',
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: payload
    })
    .then(res => res.data)
    .then(temperatureCreated => {
      this.addTemperature(temperatureCreated as TemperatureModel)

      this.setState({
        loading: false,
        hasResult: true
      })

      return temperatureCreated;
    })
  }

  render() {
    return (
      <div className="temperature-search">
        <div className="row">
          <div className="col-md-6">
            <form className="form" onSubmit={this.handleSubmit}>
              <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Enter an address (e.g. Franklin St, New York, NY)" required onChange={this.handleOnChangeAddress}/>

              <div className={this.state.errorMessage ? 'd-block' : 'd-none'}>
                <div className='alert alert-danger'>
                  { this.state.errorMessage }
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-block mb-2" disabled={this.state.loading}>
                { this.state.loading ? 'Searching...Please wait a moment' : 'Show me the current temperature' }
              </button>
            </form>
          </div>

          <TemperatureWidget 
            visible={this.state.hasResult} 
            value={this.state.temperatureValue}
            unit={this.state.temperatureUnit}
            cityName={this.state.cityName}
            district={this.state.district}
          />
        </div>
      </div>
    )
  }
}

export default TemperatureSearch
