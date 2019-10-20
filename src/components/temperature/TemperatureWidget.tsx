import React, { Component } from 'react';

import './TemperatureWidget.scss';

export class TemperatureWidget extends Component<any, any> {
  render() {
    if(this.props.visible === false) {
      return null;
    }

    return (
      <div className="col-md-6">
        <div className="card mr-0">
          <div className="card-header">
            {this.props.cityName}, {this.props.district}
          </div>
          <div className="card-body">
            <h1>{this.props.value}{this.props.unit}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default TemperatureWidget
