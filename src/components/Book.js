import React from 'react';
import Hammer from 'react-hammerjs';

import cabImg from '../images/cab.jpg';

export const Book = React.createClass({

  getInitialState() {
    return {
      'currentState': 0
    };
  },

  render() {
    return (
      <Hammer
        direction="DIRECTION_HORIZONTAL"
        onSwipe={(event) => {
          const direction = event.direction;

          if ([4,1].indexOf(direction) > -1 && this.state.currentState > 0) {
            this.setState({
              'currentState': --this.state.currentState
            });
          } else if ([2, 16].indexOf(direction) > -1 && this.state.currentState < 1) {
            this.setState({
              'currentState': ++this.state.currentState
            });
          }
        }}
      >
        <div className="book" data-rideid={this.state.currentState}>
          <div className="book__header">
            <div className="book__header__name" data-id="0">
              Economy
            </div>
            <div className="book__header__name" data-id="1">
              Extra Seats
            </div>
          </div>


          <div className="book__body">
            <div className="rideOptions">

              <div className="rideGroup fullHeight fullWidth" data-id="0">
                <div className="ride ride--active">
                  <div className="ride__image" style={{
                    'backgroundImage': `url(${cabImg})`
                  }}></div>
                  <p className="ride__name">uberPOOL</p>
                  <p className="ride__price">106.75</p>
                </div>

                <div className="ride">
                  <div className="ride__image" style={{
                    'backgroundImage': `url(${cabImg})`
                  }}></div>
                  <p className="ride__name">uberGO</p>
                  <p className="ride__price">106.75</p>
                </div>

                <div className="ride">
                  <div className="ride__image" style={{
                    'backgroundImage': `url(${cabImg})`
                  }}></div>
                  <p className="ride__name">uberX</p>
                  <p className="ride__price">106.75</p>
                </div>
              </div>

              <div className="rideGroup fullHeight fullWidth" data-id="1">
                <div className="ride">
                  <div className="ride__image" style={{
                    'backgroundImage': `url(${cabImg})`
                  }}></div>
                  <p className="ride__name">uberXL</p>
                  <p className="ride__price">106.75</p>
                </div>
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
      </Hammer>
    );
  }
});

export default Book;