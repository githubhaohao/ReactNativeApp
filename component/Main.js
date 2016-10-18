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
    ListView,
    Image,
    StatusBar,
    ActivityIndicator,
    Navigator,
    TouchableOpacity,
    TouchableNativeFeedback,
    ToastAndroid,
    BackAndroid
} from 'react-native';
import ActionBar from './ActionBar.js';
import Detail from './Detail.js';
var dataList = [];
const BASE_URL = 'http://apis.baidu.com/txapi/mvtp/meinv';
const API_KEY = '862d6c6e8b5cd73763cd2db4f8335513';

var GiftedListView = require('react-native-gifted-listview');
//var RefreshableListView = require('react-native-refreshable-listview');
//import PTRView from 'react-native-pull-to-refresh';
var num = 10;

class ListViewPage extends Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      let dataSource = new ListView.DataSource({rowHasChanged(r1,r2){(r1,r2) => r1 !== r2}});
      this.state = {
          dataSource:dataSource.cloneWithRows(dataList),
          isLoaded:false,
      };
    }

  componentDidMount() {
    this.initDataList(10);
  }

  render() {
    if(this.state.isLoaded){
      return (
          <View style={styles.matchParent}>
            <ActionBar title='ReactNativeMM' />
              {/*
               <ListView
               dataSource={this.state.dataSource}
               renderRow={(rowData) => this.renderRow(rowData)}
               enableEmptySections={true}
               showsVerticalScrollIndicator={false}
               ></ListView>*/}


             <GiftedListView
                  rowView={(rowData) => this.renderRow(rowData)}
                  onFetch={this.onFetch.bind(this)}
                  firstLoader={true} // display a loader for the first fetching
                  pagination={true} // enable infinite scrolling using touch to load more
                  refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                  withSections={false} // enable sections
                  enableEmptySections={true}
                  showsVerticalScrollIndicator={false}
                  customStyles={{
                  paginationView: {
                    backgroundColor: '#eee',
                  },
                }}
                  refreshableTintColor="blue"
                  />
              {/*
               <RefreshableListView
               dataSource={this.state.dataSource}
               renderRow={(rowData) => this.renderRow(rowData)}
               loadData={this.reloadData.bind(this)}
               refreshDescription="Refreshing news"
               />*/}

          </View>
      );
    } else {
      return (
          <View style={styles.matchParent}>
            <ActionBar title='RNMM'/>
            <View style={[styles.matchParent,styles.center]}>
              <ActivityIndicator
                  size='large'
                  color='orange'/>
            </View>
          </View>
      );
    }
  }

  renderRow(rowData){
    return (
        <TouchableNativeFeedback onPress={this.startNewView.bind(this,rowData)}
                                 background={TouchableNativeFeedback.Ripple('orange',false)}
            >
          <View style={styles.listItemView}>
            <View style={styles.iconView}>
              <Image style={styles.icon} source={{uri:rowData.picUrl}}></Image>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.titleText} numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
    )
  }

  startNewView(rowData){
    const {navigator} = this.props;
    if(navigator){
      navigator.push({
        name:'detail',
        component: Detail,
        params:{
          url:rowData.url,
          title:rowData.title,
        }
      })
    }
  }

  initDataList(num){
      return this.fetchData(num).then((jsonData) => {
          if(jsonData.code == 200) {
              this.setState({
                  dataSource:this.state.dataSource.cloneWithRows(jsonData.newslist),
                  isLoaded:true,
              })
          } else {
              ToastAndroid.show("数据加载异常",ToastAndroid.SHORT);
          }

      })
  }

  onFetch(page = 1, callback, options) {
      if(page == 1) {
          num = 10;
          return this.fetchData(num).then((jsonData) => {
              console.log(page,jsonData);
              if(jsonData.code == 200) {
                  callback(jsonData.newslist);
              } else {
                  ToastAndroid.show("数据加载异常",ToastAndroid.SHORT);
              }

          })

      } else {
          num += 10;
          return this.fetchData(num).then((jsonData) => {
              console.log(page,jsonData);
              if(jsonData.code == 200) {
                  callback(jsonData.newslist);
              } else {
                  ToastAndroid.show("数据加载异常",ToastAndroid.SHORT);
              }

          })
      }

    }

  fetchData(page){
      return fetch(`${BASE_URL}?num=${page}`,{method:'GET',headers:{
          'Content-Type': 'application/json',
          'apikey':API_KEY,
      }}).then((response) => response.json());
  }
}

var lastBackPressed = 0;

export default class Main extends Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }

    componentWillUnMount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }

    onBackAndroid = () => {
        let nav = this.refs.navigator;
        let routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        } else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            return false;
        } else {
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            return true;//返回true表示不调用
        }

    };

  render(){
    let name = 'ListViewPage';let component = ListViewPage;
    return(
        <View style={styles.matchParent}>
          <StatusBar
              backgroundColor="#303135"
              barStyle="light-content"
              />
          <Navigator
              ref='navigator'
              initialRoute={{
              name:name,component:component,
            }}
              configureScene={
                    (route) =>{
                        return Navigator.SceneConfigs.PushFromRight;
                        //HorizontalSwipeJump,FadeAndroid,FloatFromBottomAndroid,FloatFromBottom,PushFromRight,FloatFromRight,
                        //FloatFromLeft
                    }
                }
              renderScene = {
                    (route,navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator}/>
                    }
                }
              style={{flex:1}}
              ></Navigator>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  matchParent:{
    flex:1,
  },
  listItemView:{
    padding:8,
    height:80,
    flexDirection:'row',
    margin:4,
    backgroundColor:'#dfdfdf',
    borderRadius:3,
  },
  iconView:{
    width:64,
    height:64,
  },
  icon:{
    width:64,
    height:64,
    borderRadius:32,
  },
  titleView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft:8,
  },
  titleText:{
    fontSize:15,
    fontWeight:'bold',
    color:'orange',
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});

