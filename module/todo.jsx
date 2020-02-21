import React, { Component } from 'react';
import ReactDOM,{ render } from 'react-dom';
import refreshImg from '../img/refresh.svg'

import { ListView,NavBar,Icon,Popover } from 'antd-mobile';
import commonMethod from './common/commonMethod.jsx';
import {workflowUrl} from './common/commonUrl.jsx';
import MyDataStore from './common/listDataStore.js'
const pageSize=10;//每页记录数
let currentDS = new MyDataStore();//存储缓存的数据


  let parentComponent=null;

  const Item = Popover.Item;
  let listviewRef=null;//指向listview对象

  function genData(owner,hei,pIndex = 0,isRefresh) {
    if(isRefresh){
      currentDS.currentIndex=0;
    }
    commonMethod.sendData({
      url: workflowUrl,
      code: 'workflow',
      method: 'todoList',
      message: {start:currentDS.currentIndex*pageSize,size:pageSize},
      successFunc: function (data) {
        let process=data.process;
        if(isRefresh){
          currentDS.clear();
        }
        for (let i = 0; i < process.length; i++) {
          currentDS.pushData(process[i].id,process[i]);
        }
        owner.setState({
          dataSource: owner.state.dataSource.cloneWithRows(currentDS.datas, currentDS.keys),
          isLoading: false,
          height: hei,
        });
        parentComponent.setState({numTODO:process.length});
      },
      errorFunc: function (e) {
      },
      isLogin: false,
      encode: true
  });
    
  }

  /**
   * 通过定期检查会话Stoarge来判断新开的窗口是否关闭
   */
  function checkWindowIsClosed(){
    WorkHelper.getLocalData({
      appCode:'aqyhsb',
      key:'workflowAction',
      success: function(data) { 
        let action=data.retData;
        if(action){//字符串
          const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(listviewRef.lv).parentNode.offsetTop;
          setTimeout(() => {
            genData(listviewRef,hei,0,true);
          }, 600);
          WorkHelper.saveLocalData({
            appCode:'aqyhsb',
            key:'workflowAction',
            value:"",
            success: function(data) {},
            fail: function(data) {
                alert(JSON.stringify(data));  
            }
            });

        }
        setTimeout(checkWindowIsClosed,500);
      },
      fail: function(data) {  
        alert(JSON.stringify(data));
       }
    });
  
  }

  export default class TodoListView extends React.Component {
    constructor(props) {
      super(props);
      const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
  
      const dataSource = new ListView.DataSource({
        getRowData,
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
  
      this.state = {
        dataSource,
        isLoading: true,
        height: (document.documentElement.clientHeight * 3) / 4,
        visible: false,
        selected: '',
      };
      parentComponent=props.owner;
      listviewRef=this;
    }
  
    componentDidMount() {
      const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      setTimeout(() => {
        genData(this,hei,this.props.tabIndex,true);
      }, 600);
      setTimeout(checkWindowIsClosed,500);//启动定期检查窗口是否关闭
    }
  
    onEndReached = (event) => {
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      this.setState({ isLoading: true });
      const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      currentDS.addPageIndex();
      setTimeout(() => {
        genData(this,hei,currentDS.currentIndex,false);
      }, 500);
    }
  
    onSelect = (opt) => {
      var listItem=this;
      this.setState({
        visible: false,
        selected: opt.props.value,
      });
      if(opt.props.value=="refresh"){
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(listItem.lv).parentNode.offsetTop;
        setTimeout(() => {
          genData(listItem,hei,0,true);
        }, 600);
      }
    };
    handleVisibleChange = (visible) => {
      this.setState({
        visible,
      });
    };

    render() {
      let self=this;
      const row = (rowData, sectionID, rowID) => {
        const obj = currentDS.getData(rowID);
        if(!obj) return(
          <div>error</div>
        );

        return (
          <div key={rowID} style={{ padding: '0 15px'}} className="deal">
            <div style={{
              fontSize: 16,
              border: '1px solid #94B5FF',
              borderRadius: 6,
              marginBottom: 12,
              padding: '12px 16px' }}
                onClick={(e)=>{
                  e.preventDefault();
                  WorkHelper.openApp(
                    {
                      appCode:"aqyhsb",
                      param:{
                        startType:'4',
                        url:`${workflowUrl}manager/_wfhandler.html?nid=${obj.id}&wid=${obj.workflow}`
                      },
                      success:function(data){},
                      fail:function(data){alert(data);}
                    }
                  );
                }}>
              <h1>{obj.title?obj.title:"[草稿]"}</h1>
              <p><span className="type">{obj.workflowName}</span></p>
              <div className="info"><span className="icon iconfont">&#xe616;</span>{obj.username}</div>
              <div className="date"><span className="icon iconfont">&#xe614;</span>{commonMethod.formatDateString(obj.modifytime)}</div>
              <div className="clearfix"></div>
              </div>
          </div>
        );
      };
  
      return (
        <div>
        <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() =>WorkHelper.closeApp({success:function(e){},fail:function(e){}})}
            rightContent={
              <Popover  overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={this.state.visible}
                overlay={[
                  (<Item key="1" value="refresh" icon={<img src={refreshImg} className="am-icon am-icon-xs" alt="" />} data-seed="logId">刷新</Item>),
                ]}
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-10, 0],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
              >
                <div style={{
                  height: '100%',
                  padding: '0 15px',
                  marginRight: '-15px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <Icon type="ellipsis" />
                </div>
              </Popover>
            }
          >待办</NavBar>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? '正在加载' : '加载完成'}
          </div>)}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
        </div>
      );
    }
  }