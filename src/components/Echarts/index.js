import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import {WebView} from 'react-native-webview';
import renderChart from './renderChart';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }
  

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  setNewOption(option) {
    this.refs.chart.postMessage(JSON.stringify(option));
  }

  render() {
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          scalesPageToFit={Platform.OS !== 'ios'}
          originWhitelist={['*']}
          source={Platform.OS == 'ios' ? require('./tpl.html') : { uri: 'file:///android_asset/echarts/tpl.html' }}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
