import React, { Component } from 'react';
import ReactDOM,{ render } from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';

import { TabBar, ListView,NavBar,Icon } from 'antd-mobile';
import "./css/main.css";
import "./font/iconfont.css";
import commonMethod from './module/common/commonMethod.jsx';
import {workflowUrl} from './module/common/commonUrl.jsx';

import JiLiNeiRong from './ji_li_module/ji_li_nei_rong.jsx'
const routing = (
  <HashRouter>
    <div>
      <Route exact path="/" component={JiLiNeiRong} />
      {/* <Route exact path="/login" component={MyLogin} />
      <Route exact path="/wenzhang" component={WenZhang} />
      <Route exact path="/mynews" component={MyNews} />
      <Route exact path="/duixian" component={DuiXian} />
      <Route exact path="/queren" component={QueRen} /> */}
    </div>
  </HashRouter>
)

window.onload=function(){
  
  WorkHelper.getToken({
    success:function(data){
      if(data.retCode==0){
        checkToken(data.retData.appToken);
      }
      else{
        alert(data.retMsg);
        console.error("应用认证失败" ,data.retMsg);
      ReactDOM.render(routing, document.getElementById('app'));
      
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
      ReactDOM.render(routing, document.getElementById('app'));
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
        ReactDOM.render(routing, document.getElementById('app'));
      }
    },
    errorFunc: function (e) {
    },
    isLogin: true,
    encode: true
});
}
