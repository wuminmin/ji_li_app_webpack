import React, { Component } from 'react';
import ReactDOM,{ render } from 'react-dom';
import { ListView,NavBar,Icon,Tabs,Popover} from 'antd-mobile';
import commonMethod from './common/commonMethod.jsx';
import {workflowUrl} from './common/commonUrl.jsx';
import refreshImg from '../img/refresh.svg'
import MyDataStore from './common/listDataStore.js'

const methodList=["myCreatorList","myHandlerList","doneList"];



let dataStores = [new MyDataStore(),new MyDataStore(),new MyDataStore()];//存储缓存的数据
const Item = Popover.Item;
const pageSize=10;//每页记录数

/**
 * 
 * @param {*} owner listview对象
 * @param {*} hei  高度
 * @param {*} tabIndex 需要刷新Tab序号
 * @param {*} pageIndex 需要获取的页面序号
 * @param {*} isRefresh 是否为重新刷新
 */
function genData(owner,hei,tabIndex,pageIndex = 0,isRefresh) {
  let currentDS=dataStores[tabIndex];
  if(isRefresh){
    currentDS.currentIndex=0;
  }
  commonMethod.sendData({
    url: workflowUrl,
    code: 'workflow',
    method: methodList[tabIndex],
    message: {start:currentDS.currentIndex*pageSize,size:pageSize},
    successFunc: function (data) {
      let workflow=data.workflow;
      if(isRefresh){
        currentDS.clear();
      }
      for (let i = 0; i < workflow.length; i++) {
        currentDS.pushData(workflow[i].iid,workflow[i]);
      }
      owner.setState({
        dataSource: owner.state.dataSource.cloneWithRows(currentDS.datas, currentDS.keys),
        isLoading: false,
        height: hei,
      });
    },
    errorFunc: function (e) {
    },
    isLogin: false,
    encode: true
});
  
}
  
  class InstanceListView extends React.Component {
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
        height: document.documentElement.clientHeight,
      };
    }
  
    componentDidMount() {
      const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      let tabIndex=this.props.tabIndex;
      setTimeout(() => {
        genData(this,hei,tabIndex,0,true);
      }, 600);
    }
  
    onEndReached = (event) => {
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      this.setState({ isLoading: true });
      let tabIndex=this.props.tabIndex;
      const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      let currentDS=dataStores[tabIndex];
      currentDS.addPageIndex();
      setTimeout(() => {
        genData(this,hei,tabIndex,currentDS.currentIndex,false);
      }, 500);
    }
  
    render() {
      let self=this;
      const row = (rowData, sectionID, rowID) => {
        const obj = dataStores[this.props.tabIndex].getData(rowID);
        if(!obj) return(
          <div>error</div>
        );
        let formatDate=new Date();
        formatDate.setTime(obj.modifytime);
        return (
          <div key={rowID} style={{ padding: '0 15px' }} className="deal">
            <div
              style={{
                fontSize: 16,
                border: '1px solid #94B5FF',
                borderRadius: 6,
                marginBottom: 12,
                padding: '12px 16px'
  
              }}
              onClick={(e)=>{
                e.preventDefault();
                WorkHelper.openApp(
                  {
                    appCode:"aqyhsb",
                    param:{
                      startType:'4',
                      url:`${workflowUrl}/manager/_wfpreview.html?instanceId=${obj.iid}&wid=${obj.wid}`
                    },
                    success:function(data){},
                    fail:function(data){alert(data);}
                  }
                );
              }}
            >
                    <h1>{obj.title}</h1>
                    <p><span className="type">{obj.name}</span></p>
                    <div className="info"><span className="icon iconfont">&#xe616;</span>{obj.username}</div>
                    <div className="date"><span className="icon iconfont">&#xe614;</span>{commonMethod.formatDateString(obj.createtime)}</div>
                    <div className="clearfix"></div>
           </div>
          </div>
        );
      };
  
      return (
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
      );
    }
  }

  const tabs = [
    { title: "我发起" },
    { title: "我处理" },
    { title: "已归档" },
  ];

  export default class QueryTabView extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        currentIndex:0,
        height:document.documentElement.clientHeight,
        visible: false,
        selected: '',
      };
      this.myTabs=[];
    }

    saveRefs=(index,refObj)=>{
      this.myTabs[index]=refObj;
    }

    onSelect = (opt) => {
      this.setState({
        visible: false,
        selected: opt.props.value
      });
      if(opt.props.value=="refresh"){
        var listItem=this.myTabs[this.state.currentIndex];
        var tabIndex=this.state.currentIndex;
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(listItem.lv).parentNode.offsetTop;
        setTimeout(() => {
          genData(listItem,hei,tabIndex,0,true);
        }, 600);

        
      }
    };
    handleVisibleChange = (visible) => {
      this.setState({
        visible,
      });
    };

    render() {
      return <div>
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
          >查询</NavBar>
      <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => { this.setState({currentIndex:index}); }}
        onTabClick={(tab, index) => { }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: this.state.height }}>
          <div style={{display: this.state.currentIndex==0?"block":"none",width:"100%",height:  this.state.height }}>
            <InstanceListView tabIndex="0" owner={this.props.owner} ref={e=>{this.saveRefs(0,e)}}/>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',height:  this.state.height }}>
        <div style={{display: this.state.currentIndex==1?"block":"none",width:"100%",height:  this.state.height}}>
            <InstanceListView tabIndex="1" owner={this.props.owner} ref={e=>{this.saveRefs(1,e)}}/>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:  this.state.height }}>
        <div style={{display: this.state.currentIndex==2?"block":"none",width:"100%",height:  this.state.height}}>
            <InstanceListView tabIndex="2" owner={this.props.owner} ref={e=>{this.saveRefs(2,e)}}/>
          </div>
        </div>
      </Tabs>
    </div>;
    }
  }