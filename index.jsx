import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { TabBar, ListView,NavBar,Icon } from 'antd-mobile';
import { Route, HashRouter } from 'react-router-dom';
import "./css/main.css";
import "./font/iconfont.css";
import CommonMethod from './ji_li_module/common/commonMethod.jsx';
import JiLiNeiRong from './ji_li_module/ji_li_nei_rong.jsx';
import MyNews from './ji_li_module/my_news.jsx';
import Loadable from 'react-loadable';

// const routing = (
//   <HashRouter>
//     <div>
//       <Route exact path="/" component={JiLiNeiRong} />
//       <Route exact path="/mynews" component={MyNews} />
//     </div>
//   </HashRouter>
// )


let CreateListView=Loadable(
  {
      loader: () => import('./module/create.jsx'),
      loading: Loading
  }
);
let CreateJiLiNeiRongView=Loadable(
  {
      loader: () => import('./ji_li_module/ji_li_nei_rong.jsx'),
      loading: Loading
  }
);
let CreateJiLiQueRenView=Loadable(
  {
      loader: () => import('./ji_li_module/ji_li_que_ren.jsx'),
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
              <CreateJiLiNeiRongView owner={this}/>
            </TabBar.Item>
            <TabBar.Item
              icon={
                <span className="icon iconfont size22 top2">&#xe61e;</span>
              }
              selectedIcon={
                <span className="icon iconfont size22 top2">&#xe61e;</span>
              }
              title="我的激励"
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
            <CreateJiLiQueRenView owner={this}/>
            </TabBar.Item>
            {/* <TabBar.Item
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
             <QueryTabView owner={this}/>
            </TabBar.Item> */}
          </TabBar>
        </div>
      </div>
      
    );
  }
}

window.onload = function () {
  WorkHelper.getToken({
    success: function (data) {
      if (data.retCode == 0) {
        console.log("应用认证成功", data.retMsg);
        checkToken(data.retData.appToken);
      }
      else {
        console.log("应用认证失败", data.retMsg);
        ReactDOM.render(<MainPage  login="1"/>, document.getElementById('app'));
      }
    },
    fail: function (data) {
      console.log("应用认证失败", data);
      ReactDOM.render(<MainPage  login="1"/>, document.getElementById('app'));
    }
  });
}

function checkToken(token) {
  CommonMethod.sendData({
    url: 'http://134.64.116.90:8101/ji_li_zhu_shou/',
    code: 'ssoService',
    method: 'smartworkLogin',
    message: { appToken: token },
    successFunc: function (data) {
      console.log(data);
      ReactDOM.render(<MainPage  login="1"/>, document.getElementById('app'));
    },
    errorFunc: function (e) {
      console.log(e);
    },
    isLogin: true,
    encode: true
  });
}
