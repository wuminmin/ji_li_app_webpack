import React, { Component } from 'react';
import ReactDOM,{ render } from 'react-dom';

import { TabBar, ListView,NavBar,Icon } from 'antd-mobile';
import "./css/main.css";
import "./font/iconfont.css";
import commonMethod from './module/common/commonMethod.jsx';
import {workflowUrl} from './module/common/commonUrl.jsx';
import Loadable from 'react-loadable';

let CreateListView=Loadable(
  {
      loader: () => import('./module/create.jsx'),
      loading: Loading
  }
);
let TodoListView=Loadable(
  {
      loader: () => import('./module/todo.jsx'),
      loading: Loading
  }
);
let QueryTabView=Loadable(
  {
      loader: () => import('./module/search.jsx'),
      loading: Loading
  }
);
let LoginView=Loadable(
  {
      loader: () => import('./module/login.jsx'),
      loading: Loading
  }
);

function Loading(){
  return <div style={{height: '100%' ,backgroundColor: '#fff'}}></div>
}

/**
 * 首页面
 */
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'createTab',//选择的标签页
      tabTitle:"关闭",//各标签的标题
      numTODO:0//待办数
    };
    this.contentIFrame=React.createRef();
    
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        {pageText}
      </div>
    );
  }

  render() {
    var self=this;
    return (
      <div>
        <div style={ { position: 'fixed', height: '100%', width: '100%', top: 0 } }>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="激励文件"
              key="create"
              icon={<span className="icon iconfont size21 top2">&#xe618;</span>}
              selectedIcon={<span className="icon iconfont size21 top2">&#xe618;</span>}
              selected={this.state.selectedTab === 'createTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'createTab',
                });
              }}
              data-seed="logId"
            >
              {/* <CreateListView owner={this}/> */}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <span className="icon iconfont size22 top2">&#xe61e;</span>
              }
              selectedIcon={
                <span className="icon iconfont size22 top2">&#xe61e;</span>
              }
              title="确认激励"
              key="todo"
              badge={this.state.numTODO==0?"":this.state.numTODO}
              selected={this.state.selectedTab === 'todoTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'todoTab',
                });
              }}
              data-seed="logId1"
            >
            {/* <TodoListView owner={this}/> */}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <span className="icon iconfont size22 top1">&#xe619;</span>
              }
              selectedIcon={
                <span className="icon iconfont size22 top1">&#xe619;</span>
              }
              title="汇总统计"
              key="search"
              selected={this.state.selectedTab === 'searchTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'searchTab',
                });
              }}
            >
             {/* <QueryTabView owner={this}/> */}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
      
    );
  }
}

window.onload=function(){
  
  WorkHelper.getToken({
    success:function(data){
      if(data.retCode==0){
        checkToken(data.retData.appToken);
      }
      else{
        alert(data.retMsg);
        console.error("应用认证失败" ,data.retMsg);
      ReactDOM.render(<MainPage login="0"/>, document.getElementById('app'));
      }
    },
    fail:function(data){
      alert(data);
      console.error("应用认证失败" ,data);
      let {iid,wid,nid}=commonMethod.urlHashInfo();//流程实例和环节ID
      if(iid){
        if(nid){
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}manager/_wfhandler.html?nid=${nid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
        else{
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}/manager/_wfpreview.html?instanceId=${iid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
      }
      ReactDOM.render(<MainPage login="0"/>, document.getElementById('app'));
    }
  });
}

function checkToken(token){
  commonMethod.sendData({
    url: workflowUrl,
    code: 'ssoService',
    method: 'smartworkLogin',
    message: {appToken:token},
    successFunc: function (data) {
      let {iid,wid,nid}=commonMethod.urlHashInfo();//流程实例和环节ID
      if(iid){
        if(nid){
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}manager/_wfhandler.html?nid=${nid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
        else{
          WorkHelper.openApp(
            {
              appCode:"aqyhsb",
              param:{
                startType:'4',
                url:`${workflowUrl}/manager/_wfpreview.html?instanceId=${iid}&wid=${wid}`
              },
              success:function(data){},
              fail:function(data){alert(data);}
            }
          );
        }
        WorkHelper.closeApp({success:function(e){},fail:function(e){}});
      }
      else{
        ReactDOM.render(<MainPage  login="1"/>, document.getElementById('app'));
      }
    },
    errorFunc: function (e) {
    },
    isLogin: true,
    encode: true
});
}
