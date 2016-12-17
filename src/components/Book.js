import React from 'react';

export const Book = React.createClass({

  render() {
    return (
      <div className="book">
        <div className="book__header">
          Economy
        </div>


        <div className="book__body">
          <div className="rideOptions">
            <div className="ride">
              <div className="ride__image"></div>
              <p className="ride__name">uberPOOL</p>
              <p className="ride__price">106.75</p>
            </div>

            <div className="ride">
              <div className="ride__image"></div>
              <p className="ride__name">uberPOOL</p>
              <p className="ride__price">106.75</p>
            </div>

            <div className="ride">
              <div className="ride__image"></div>
              <p className="ride__name">uberPOOL</p>
              <p className="ride__price">106.75</p>
            </div>
          </div>

          <div className="paymentOptions">
            <div>
              Paytm
            </div>
            <div>1-4</div>
          </div>
        </div>


        <div className="book__footer">
          <button className="fullHeight fullWidth requestBtn">
            Request UberPOOL
          </button>
        </div>
      </div>
    );
  }
});

export default Book;