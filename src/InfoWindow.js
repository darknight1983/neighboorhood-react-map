import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';


export default class InfoWindow extends Component {
  constructor(props) {
    super(props)

    this.renderInfoWindow = this.renderInfoWindow.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.openWindow = this.openWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.map !== prevProps.map) {
      this.renderInfoWindow()
    }

    if (this.props.children !== prevProps.children) {
      // This function may need to be binded in the constructor
      this.updateContent()
    }

    if ((this.props.visible !== prevProps.visible) ||
        (this.props.marker !== prevProps.marker)) {
      this.props.visible ? this.openWindow() : this.closeWindow();
    }
  }
  openWindow() {
    this.infowindow.open(this.props.map, this.props.marker);
  }
  closeWindow() {
    this.infowindow.close();
  }
  updateContent() {
    const content = this.renderChildren()
    this.infowindow.setContent(content)
  }
  renderChildren() {
    const { children } = this.props;
    return ReactDOMServer.renderToString(children);
  }
  renderInfoWindow() {
    let { map, google, mapCenter } = this.props;

    const iw = this.infowindow = new google.maps.InfoWindow({
      content: ''
    })
  }
  render() {
    return null;
  }
}
