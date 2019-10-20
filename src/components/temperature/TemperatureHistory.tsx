import React, { Component } from 'react';
import moment from 'moment';

import TemperatureModel from '../../models/TemperatureModel';
import './TemperatureHistory.scss';

export class TemperatureHistory extends Component<any, any> {
  
  private renderTableResults() {
    let temperatues = this.props.temperatures.reverse();

    return (
        temperatues.map((temperature:TemperatureModel, index:number) => (
          <tr key={index}>
            <td className="text-left">{ moment(temperature.date).format('MMM Do YYYY') }</td>
            <td className="text-left">{ temperature.time }</td>
            <td className="text-left">{ temperature.city_name }, { temperature.district }</td>
            <td className="text-left">{ temperature.address }</td>
            <td className="text-left">{ temperature.zipcode }</td>
            <td className="text-right"><b>{temperature.temperature}{temperature.unit}</b></td>
          </tr>
        ))
    )
  }

  private renderEmptyState() {
    return (
      <tr>
        <td colSpan={5} className="emptyStateTable">
          There is no temperature history yet.<br/>
          Please, enter your address on text field and check it now.
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h3 className="text-left">Temperature History</h3>
        <table className="table table-light shadow-sm">
          <thead>
            <tr>
              <th scope="col" className="text-left">Date</th>
              <th scope="col" className="text-left">Time UTC</th>
              <th scope="col" className="text-left">Location</th>
              <th scope="col" className="text-left">Search Address</th>
              <th scope="col" className="text-left">Zipcode</th>
              <th scope="col" className="text-right">Temperature</th>
            </tr>
          </thead>
          <tbody>
            { this.props.temperatures.length ? this.renderTableResults() : this.renderEmptyState() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default TemperatureHistory
