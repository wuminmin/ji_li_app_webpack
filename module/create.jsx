import React, { Component } from 'react';
import ReactDOM,{ render } from 'react-dom';
import { ListView,Icon,NavBar } from 'antd-mobile';
import commonMethod from './common/commonMethod.jsx';
import {workflowUrl} from './common/commonUrl.jsx';

  const dataBlobs = {};
  let rowIDs = [];
  function genData(owner,hei,pIndex = 0) {
    commonMethod.sendData({
      url: workflowUrl,
      code: 'workflow',
      method: 'list',
      message: null,
      successFunc: function (data) {
        let workflows=data.workflow;
        for (let jj = 0; jj < workflows.length; jj++) {
          const rowName = `T${pIndex} - R${jj}`;
          rowIDs.push(rowName);
          dataBlobs[rowName] = workflows[jj];
        }
        owner.setState({
          dataSource: owner.state.dataSource.cloneWithRows(dataBlobs, rowIDs),
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

  
  /**
   * 创建流程列表视图
   */
  export default class CreateListView extends React.Component {
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
      };
    }
  
    componentDidMount() {
      const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      setTimeout(() => {
        genData(this,hei,this.props.tabIndex);
      }, 600);
    }
  
    render() {
      const separator = (sectionID, rowID) => (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
          }}
        />
      );
      let self=this;
      const row = (rowData, sectionID, rowID) => {
        const obj = dataBlobs[rowID];
        return (
          <div key={rowID} style={{ padding: '0 15px' }}>
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
                      url:`${workflowUrl}manager/_wfstart.html?id=${obj.id}`
                    },
                    success:function(data){},
                    fail:function(data){alert(data);}
                  }
                );
              }}
            >{obj.name}
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
          >发起流程
          </NavBar>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={row}
          renderSeparator={separator}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={4}
          onEndReachedThreshold={10}
        />
      </div>
      );
    }
  }