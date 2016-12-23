import React from 'react';
import classNames from 'classnames';

export const Splash = React.createClass({

  render() {
    return (
      <div className={classNames('fullHeight', 'fullWidth', 'splashScreen', {
          'splashScreen__disappear': this.props.move
        })}>
        <div className={classNames('splashScreen__logo', {
          'splashScreen__logo__disappear': this.props.move
        })}></div>
        <div className={classNames('splashScreen__logoInner', {
          'splashScreen__logoInner__disappear': this.props.move
        })}></div>
        <div className={classNames('splashScreen__logoConnector', {
          'splashScreen__logoConnector__disappear': this.props.move
        })}></div>        
      </div>
    );
  }
});

export default Splash;