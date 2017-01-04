import React from 'react';
import classNames from 'classnames';
import { hashHistory } from 'react-router';

import paytmIcon from '../images/paytm.jpg';
import cashIcon from '../images/cash.jpg';

export const Payment = React.createClass({

  gotoHome() {
    hashHistory.push('/home');
  },

  render() {
    return (
      <div className="genericView">
        <div className="genericView__header">
          <div className="genericView__close" onClick={this.gotoHome}>
          </div>
          <div className="genericView__title">Settings</div>
        </div>

        <div className="genericList">
          <div className="genericList__item genericList__item--profile">
            <span className="genericList__item__icon"></span>
            <div className="genericList__item__name">
              <span>Narendra N Shetty</span>
              <span>070454 82538</span>
              <span>mailnarendra15@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="genericList">
          <div className="genericList__header">
            Favorities
          </div>

          <div className="genericList__item">
            <span className="genericList__item__icon"></span>
            <div className="genericList__item__name">Add Home</div>
          </div>

          <div className="genericList__item">
            <span className="genericList__item__icon"></span>
            <div className="genericList__item__name">Add Work</div>
          </div>

        </div>

        <div className="genericList">
          <div className="genericList__header">
            Profiles
          </div>

          <div className="genericList__item genericList__item--link">
            <div className="genericList__item__name">Add Business Profile</div>
          </div>

          <div className="genericList__item genericList__item--link">
            <div className="genericList__item__name">Add Family Profile</div>
          </div>
        </div>


        <div className="genericList genericList">
          <div className="genericList__item genericList__item--signout">
            <div className="genericList__item__name">Sign Out</div>
          </div>
        </div>
      </div>
    );
  }
});

export default Payment;