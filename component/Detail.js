/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    WebView,
    BackAndroid,
    ToastAndroid,
} from 'react-native';
import ActionBar from './ActionBar.js';

export default class Detail extends Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
    }

  componentDidMount() {
    this.setState({
      title:this.props.title,
      url:this.props.url,
    })
  }

  componentWillMount() {
    //BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid.bind(this));
  }

  componentWillUnMount() {
    //BackAndroid.removeEventListener('hardwareBackPress',this.onBackAndroid.bind(this));
  }

  onBackAndroid(){
    this.finish();
    return true;
  }

  finish(){
    const { navigator } = this.props;
    if(navigator){
      navigator.pop();
    }
  }

  render() {
    return (
        <View style={styles.matchParent}>
          <ActionBar leftBtn={() => this.finish()} title={this.state.title} leftText='Back'/>
          <WebView
              source={{uri:this.state.url}}
              startInLoadingState={true}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              ></WebView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  matchParent:{
    flex:1,
  },
});

