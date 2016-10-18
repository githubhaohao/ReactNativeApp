/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ViewPagerAndroid,
    TouchableNativeFeedback,
    Navigator,
    View
    } from 'react-native';

var Dimensions = require('Dimensions');
var {width,height,scale} = Dimensions.get('window');

export default class ActionBar extends Component{

  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
    }

  static get defaultProps(){
    return{
      leftText:'',
      title:'',
      rightText:'',
      bgColor:'#353639',
      leftBtn:() => {},
      rightBtn:() => {},
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={[styles.actionBarStyle,{backgroundColor:this.props.bgColor}]}>
          <TouchableNativeFeedback onPress={this.props.leftBtn.bind(this)}
                                   background={TouchableNativeFeedback.SelectableBackground()}
              >
            <View style={[styles.bar,styles.center]}>
              <Text style={styles.barText} numberOfLines={1}>{this.props.leftText}</Text>
            </View>
          </TouchableNativeFeedback>

          <View style={[styles.titleView,styles.center]}>
            <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
          </View>

          <TouchableNativeFeedback onPress={this.props.rightBtn.bind(this)}
                                   background={TouchableNativeFeedback.SelectableBackground()}
              >
            <View style={[styles.bar,styles.center]}>
              <Text style={styles.barText} numberOfLines={1}>{this.props.rightText}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {/*<View style={[styles.content,styles.center]}>
          <Text>屏幕宽度：{width}</Text>
          <Text>屏幕高度：{height}</Text>
          <Text>屏幕分辨率：{scale}</Text>
        </View>*/}
      </View>
      )
  }
}

const styles = StyleSheet.create({

  container: {
    width:width,
  },

  content:{
    flex:1,
  },

  center:{
    justifyContent:'center',
    alignItems:'center',
  },

  bar:{
    width:50,
    height:50,
  },

  barText:{
    color:'#efefef',
    fontSize:18,
    fontWeight:'bold',
  },

  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  },

  titleView:{
    width:width/2,
    height:50,
  },

  actionBarStyle:{
    height:54,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:2,
  },

  image: {
    width: 20,
    height: 20,
    margin:2,
    resizeMode:Image.resizeMode.stretch,
  },
});


//AppRegistry.registerComponent('RNAndroid', () => ActionBar);
