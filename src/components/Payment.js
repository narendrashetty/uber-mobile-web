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
          <div className="genericView__title">Payment</div>
        </div>

        <div className="genericList">
          <div className="genericList__header">
            Payment Methods
          </div>

          <div className="genericList__item">
            <img className="genericList__item__icon" src={paytmIcon} />
            <div className="genericList__item__name">Paytm</div>
          </div>

          <div className="genericList__item">
            <img className="genericList__item__icon" src={cashIcon} />
            <div className="genericList__item__name">Cash</div>
          </div>

          <div className="genericList__item genericList__item--last">
            <div className="genericList__item__name">Add Payment Method</div>
          </div>
        </div>

        <div className="genericList">
          <div className="genericList__header">
            Promotions
          </div>

          <div className="genericList__item">
            <div className="genericList__item__name">Add Promo/Gift Code</div>
          </div>
        </div>
      </div>
    );
  }
});

export default Payment;