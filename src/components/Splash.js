import React from 'react';
import classNames from 'classnames';

export const Splash = React.createClass({

  getInitialState() {
    return {
      'ready': false
    };
  },

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        'ready': true
      });
    }, 2000);
  },

  render() {
    return (
      <div className={classNames('fullHeight', 'fullWidth', 'splashScreen', {
          'splashScreen__disappear': this.props.move && this.state.ready
        })}>
        <div className={classNames('splashScreen__logo', {
          'splashScreen__logo__disappear': this.props.move && this.state.ready
        })}></div>
        <div className={classNames('splashScreen__logoInner', {
          'splashScreen__logoInner__disappear': this.props.move && this.state.ready
        })}></div>
        <div className={classNames('splashScreen__logoConnector', {
          'splashScreen__logoConnector__disappear': this.props.move && this.state.ready
        })}></div>        
      </div>
    );
  }
});

export default Splash;