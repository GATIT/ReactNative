import React, { Component } from 'react';
import { AppRegistry, Text, View, DeviceEventEmitter } from 'react-native';
import { SensorManager } from 'NativeModules';

class Views extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cx: 0, cy: 0, cz: 0,
      bx: 0, by: 0, bz: 0,
    };
    SensorManager.startAccelerometer(100);
    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      this.setState({
        cx: data.x,
        cy: data.y,
        cz: data.z
      });
      if (this.state.cx > this.state.bx) {
        this.setState({bx: this.state.cx});
      }
      if (this.state.cy > this.state.by) {
        this.setState({by: this.state.cy});
      }
      if (this.state.cz > this.state.bz) {
        this.setState({bz: this.state.cz});
      }
    });
    //SensorManager.stopAccelerometer();
  }
  render() {
    return (
      <View style={{alignItems: "center", marginTop: 30}}>
        <Text>{this.state.cx}</Text>
        <Text>{this.state.cy}</Text>
        <Text>{this.state.cz}</Text>
        <Text>----------------------</Text>
        <Text>{this.state.bx}</Text>
        <Text>{this.state.by}</Text>
        <Text>{this.state.bz}</Text>
      </View>
    );

  }
}

AppRegistry.registerComponent('test_sensor', () => Views);
