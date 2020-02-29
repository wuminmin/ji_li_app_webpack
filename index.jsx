import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import "./css/main.css";
import "./font/iconfont.css";
import CommonMethod from './ji_li_module/common/commonMethod.jsx';
import JiLiNeiRong from './ji_li_module/ji_li_nei_rong.jsx'
const routing = (
  <HashRouter>
    <div>
      <Route exact path="/" component={JiLiNeiRong} />
    </div>
  </HashRouter>
)

window.onload = function () {
  WorkHelper.getToken({
    success: function (data) {
      if (data.retCode == 0) {
        console.log("应用认证成功", data.retMsg);
        checkToken(data.retData.appToken);
      }
      else {
        console.log("应用认证失败", data.retMsg);
        ReactDOM.render(routing, document.getElementById('app'));
      }
    },
    fail: function (data) {
      console.log("应用认证失败", data);
      ReactDOM.render(routing, document.getElementById('app'));
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
      ReactDOM.render(routing, document.getElementById('app'));
    },
    errorFunc: function (e) {
      console.log(e);
    },
    isLogin: true,
    encode: true
  });
}
