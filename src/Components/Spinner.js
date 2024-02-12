import React, { Component } from 'react';
import loading from './spinnerlogo.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div class="text-center">
        <img src={loading} alt="Loading..."  className='my-3'/>
      </div>
    )
  }
}
