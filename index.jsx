import React from 'react';

import omit from 'lodash/omit';

export default class Canvas extends React.Component {

  static propTypes = {
    draw: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  };

  componentDidMount() {
    this.redraw();
    this.capturedRedraw = () => this.redraw();
    window.addEventListener('resize', this.capturedRedraw);
  }

  componentDidUpdate() {
    this.redraw();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.capturedRedraw);
  }

  redraw() {
    let canvas = this.refs.canvas;
    let pixelRatio = window.devicePixelRatio;
    let width = canvas.width = canvas.clientWidth * (pixelRatio || 1);
    let height = canvas.height = canvas.clientHeight * (pixelRatio || 1);
    let context = canvas.getContext('2d');
    let props = omit(this.props, 'draw');
    this.props.draw({context, width, height, pixelRatio, props, canvas});
  }

  render() {
    return <canvas {...omit(this.props, 'draw')} ref="canvas"></canvas>
  }
}
