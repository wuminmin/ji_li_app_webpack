(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{439:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=g(n(178)),o=g(n(426)),r=g(n(427)),i=g(n(428)),s=g(n(432)),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(179),n(429),n(430),n(431),n(433);var c=g(n(0)),d=g(n(8)),u=g(n(446)),f=n(445),p=g(n(447)),h=g(n(448));function g(e){return e&&e.__esModule?e:{default:e}}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function v(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var w=["myCreatorList","myHandlerList","doneList"],I=[new h.default,new h.default,new h.default],b=s.default.Item;function M(e,t,n){arguments.length>3&&void 0!==arguments[3]&&arguments[3];var a=arguments[4],o=I[n];a&&(o.currentIndex=0),u.default.sendData({url:f.workflowUrl,code:"workflow",method:w[n],message:{start:10*o.currentIndex,size:10},successFunc:function(n){var r=n.workflow;a&&o.clear();for(var i=0;i<r.length;i++)o.pushData(r[i].iid,r[i]);e.setState({dataSource:e.state.dataSource.cloneWithRows(o.datas,o.keys),isLoading:!1,height:t})},errorFunc:function(e){},isLogin:!1,encode:!0})}var E=function(e){function t(e){m(this,t);var n=y(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.onEndReached=function(e){if(!n.state.isLoading||n.state.hasMore){n.setState({isLoading:!0});var t=n.props.tabIndex,a=document.documentElement.clientHeight-d.default.findDOMNode(n.lv).parentNode.offsetTop,o=I[t];o.addPageIndex(),setTimeout((function(){M(n,a,t,o.currentIndex,!1)}),500)}};var a=new i.default.DataSource({getRowData:function(e,t,n){return e[n]},rowHasChanged:function(e,t){return e!==t}});return n.state={dataSource:a,isLoading:!0,height:document.documentElement.clientHeight},n}return v(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this,t=document.documentElement.clientHeight-d.default.findDOMNode(this.lv).parentNode.offsetTop,n=this.props.tabIndex;setTimeout((function(){M(e,t,n,0,!0)}),600)}},{key:"render",value:function(){var e=this;return c.default.createElement(i.default,{ref:function(t){return e.lv=t},dataSource:this.state.dataSource,renderFooter:function(){return c.default.createElement("div",{style:{padding:30,textAlign:"center"}},e.state.isLoading?"正在加载":"加载完成")},renderRow:function(t,n,a){var o=I[e.props.tabIndex].getData(a);return o?((new Date).setTime(o.modifytime),c.default.createElement("div",{key:a,style:{padding:"0 15px"},className:"deal"},c.default.createElement("div",{style:{fontSize:16,border:"1px solid #94B5FF",borderRadius:6,marginBottom:12,padding:"12px 16px"},onClick:function(e){e.preventDefault(),WorkHelper.openApp({appCode:"aqyhsb",param:{startType:"4",url:f.workflowUrl+"/manager/_wfpreview.html?instanceId="+o.iid+"&wid="+o.wid},success:function(e){},fail:function(e){alert(e)}})}},c.default.createElement("h1",null,o.title),c.default.createElement("p",null,c.default.createElement("span",{className:"type"},o.name)),c.default.createElement("div",{className:"info"},c.default.createElement("span",{className:"icon iconfont"},""),o.username),c.default.createElement("div",{className:"date"},c.default.createElement("span",{className:"icon iconfont"},""),u.default.formatDateString(o.createtime)),c.default.createElement("div",{className:"clearfix"})))):c.default.createElement("div",null,"error")},style:{height:this.state.height,overflow:"auto"},pageSize:4,scrollRenderAheadDistance:500,onEndReached:this.onEndReached,onEndReachedThreshold:10})}}]),t}(c.default.Component),T=[{title:"我发起"},{title:"我处理"},{title:"已归档"}],x=function(e){function t(e){m(this,t);var n=y(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.saveRefs=function(e,t){n.myTabs[e]=t},n.onSelect=function(e){if(n.setState({visible:!1,selected:e.props.value}),"refresh"==e.props.value){var t=n.myTabs[n.state.currentIndex],a=n.state.currentIndex,o=document.documentElement.clientHeight-d.default.findDOMNode(t.lv).parentNode.offsetTop;setTimeout((function(){M(t,o,a,0,!0)}),600)}},n.handleVisibleChange=function(e){n.setState({visible:e})},n.state={currentIndex:0,height:document.documentElement.clientHeight,visible:!1,selected:""},n.myTabs=[],n}return v(t,e),l(t,[{key:"render",value:function(){var e=this;return c.default.createElement("div",null,c.default.createElement(o.default,{mode:"light",icon:c.default.createElement(r.default,{type:"left"}),onLeftClick:function(){return WorkHelper.closeApp({success:function(e){},fail:function(e){}})},rightContent:c.default.createElement(s.default,{overlayClassName:"fortest",overlayStyle:{color:"currentColor"},visible:this.state.visible,overlay:[c.default.createElement(b,{key:"1",value:"refresh",icon:c.default.createElement("img",{src:p.default,className:"am-icon am-icon-xs",alt:""}),"data-seed":"logId"},"刷新")],align:{overflow:{adjustY:0,adjustX:0},offset:[-10,0]},onVisibleChange:this.handleVisibleChange,onSelect:this.onSelect},c.default.createElement("div",{style:{height:"100%",padding:"0 15px",marginRight:"-15px",display:"flex",alignItems:"center"}},c.default.createElement(r.default,{type:"ellipsis"})))},"查询"),c.default.createElement(a.default,{tabs:T,initialPage:0,onChange:function(t,n){e.setState({currentIndex:n})},onTabClick:function(e,t){}},c.default.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:this.state.height}},c.default.createElement("div",{style:{display:0==this.state.currentIndex?"block":"none",width:"100%",height:this.state.height}},c.default.createElement(E,{tabIndex:"0",owner:this.props.owner,ref:function(t){e.saveRefs(0,t)}}))),c.default.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:this.state.height}},c.default.createElement("div",{style:{display:1==this.state.currentIndex?"block":"none",width:"100%",height:this.state.height}},c.default.createElement(E,{tabIndex:"1",owner:this.props.owner,ref:function(t){e.saveRefs(1,t)}}))),c.default.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:this.state.height}},c.default.createElement("div",{style:{display:2==this.state.currentIndex?"block":"none",width:"100%",height:this.state.height}},c.default.createElement(E,{tabIndex:"2",owner:this.props.owner,ref:function(t){e.saveRefs(2,t)}})))))}}]),t}(c.default.Component);t.default=x},445:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="https://it.jisu8.cn:9999/workflowManager/";t.workflowUrl=a,t.ssoUrl="http://localhost:8101/sso/"},446:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(122),i=(a=r)&&a.__esModule?a:{default:a},s=n(445);i.default.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8";var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,null,[{key:"getNext",value:function(e){var t=this.sequences[e];return null==t?(this.sequences[e]=0,0):(t++,this.sequences[e]=t,t)}},{key:"contextUrl",value:function(){var e=document.location,t=e.pathname;return e.protocol+"//"+e.host+t.substring(0,t.indexOf("/",1))+"/"}},{key:"sendData",value:function(e){try{e||(e={});var t={url:this.contextUrl(),code:!1,method:!1,message:{},successFunc:function(){},errorFunc:function(e){alert(e)},isShowloading:!1,async:!0,isLogin:!1,postType:!1,encode:!1,notShowLogin:!1,notdata:!1},n=(t=Object.assign(t,e)).code,a=t.method,o=t.message,r=t.successFunc,s=t.errorFunc,l=(t.isShowloading,t.async,t.isLogin),c=(t.postType,t.encode),d=t.notShowLogin,u=t.url,f=t.notdata,p=void 0;if(!n)throw"senddata method's code parameter can't be null."+document.location;if(!a)throw"senddata method's method parameter can't be null."+document.location;var h=this.getNext("json");o?(p=JSON.stringify(o),p=c?"data="+encodeURIComponent(p):"data="+p):p="data=",f&&(p=o);var g=l?"get.login?":"get.data?";(0,i.default)({method:"post",url:""+u+g+"s="+h+"&c="+n+"&m="+a,data:p,headers:{"Content-type":"application/x-www-form-urlencoded;charset=UTF-8"},cancelToken:!!e.cancelToken&&e.cancelToken,withCredentials:!0,timeout:6e4}).then((function(e){var t=e.data;if(0==t.r)r(t.m);else if("-999"==t.r&&"login"==t.a){if(d)return void s(null,t.r,"功能异常，请联系系统管理员 "+t.m)}else s(null,t.r,"功能异常，请联系系统管理员 "+t.m)})).catch((function(e){s(e.message)}))}catch(e){alert(e)}}},{key:"getUpdateTime",value:function(e,t,n,a,o){var r=new URLSearchParams;r.append("dateType",e),"contractedAssistant"==t?"month"==e||"day"==e?(r.append("pageType","home"),r.append("deptId",a),r.append("roleCode","yyb_head")):"hour"==e&&(r.append("pageType","home"),r.append("channelCode","home002_2"),r.append("latnId",o),r.append("deptId",a),r.append("roleCode","yyb_head")):"gzzs_bqzhsh"==t&&("month"==e||"day"==e?(r.append("pageType","home"),r.append("deptId",a),r.append("roleCode","gzzs_qdjl")):"hour"==e&&(r.append("pageType","home"),r.append("channelCode","jrfz_city"),r.append("deptId",a),r.append("roleCode","gzzs_qdjl"))),(0,i.default)({method:"post",url:s.baseCbzsUrl+"client/channelAction!getUpdateDateInTheoryFromServer.msp",data:r}).then((function(e){return 1==e.data.retCode&&e.data.retResult})).then((function(e){n(e)})).catch((function(e){alert(e.message)}))}},{key:"jumpToApp",value:function(e,t,n){appService.startApp(e,n,(function(e){}),(function(e){showAlert("失败。"+e)}))}},{key:"checkTicket",value:function(e){var t=this;try{appService.getTicket((function(n){null==n?(alert("票据为空，请重新登录！"),t.closeApp()):e(n)}),(function(e){alert(e)}))}catch(e){alert(e)}}},{key:"closeApp",value:function(){appService.closeApp((function(){}),(function(){}))}},{key:"showMask",value:function(e){alert(e)}},{key:"upLoadFile",value:function(e){var t=e.url,n=e.file,a=e.fileVal,o=e.onBeforeSend,r=e.onProgress,i=e.onError,s=e.onSuccess,l=n.name,c=n.type,d=n.lastModifiedDate,u={name:l,type:c,size:"file"==e.type?n.size:n.base64.length,lastModifiedDate:d},f={};if(!1!==o(n,u,f)){r(n,0);var p=new FormData,h=new XMLHttpRequest;n.xhr=h,Object.keys(u).forEach((function(e){p.append(e,u[e])})),"file"==e.type?p.append(a,n,l):p.append(a,n.base64),h.onreadystatechange=function(){if(4==h.readyState)if(200==h.status)try{var e=JSON.parse(h.responseText);s(n,e)}catch(e){i(n,e)}else i(n,new Error("XMLHttpRequest response status is "+h.status))},h.upload.addEventListener("progress",(function(e){if(0!=e.total){var t=100*Math.ceil(e.loaded/e.total);r(n,t)}}),!1),h.open("POST",t),Object.keys(f).forEach((function(e){h.setRequestHeader(e,f[e])})),h.send(p)}}},{key:"formatDateString",value:function(t){if(t){var n=new Date,a=t.split(" "),o=a[0].split("-");if(n.setYear(o[0]),n.setMonth(o[1]-1),n.setDate(o[2]),a.length>1){var r=a[1].split(":");n.setHours(r[0]),n.setMinutes(r[1]),r.length>2?n.setSeconds(r[2]):n.setSeconds(0)}else n.setHours(0),n.setMinutes(0),n.setSeconds(0);return n.setMilliseconds(0),[e.padding((n.getMonth()+1).toString(),2,"0"),"-",e.padding(n.getDate().toString(),2,"0")," ",e.padding(n.getHours().toString(),2,"0"),":",e.padding(n.getMinutes().toString(),2,"0")]}return""}},{key:"padding",value:function(e,t,n){var a=t-e.length;if(a>0)for(var o=0;o<a;o++)e=n+e;return e}},{key:"urlHashInfo",value:function(){var e=window.location.href,t=e.indexOf("?"),n=e.substr(t,e.length-t),a={};if(n.length>1)for(var o=n.substr(1,n.length).split("&"),r=0;r<o.length;r++){t=o[r].indexOf("=");a[o[r].substr(0,t)]=o[r].substr(t+1,o[r].length-t)}return a}}]),e}();t.default=l,l.sequences=[]},447:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xIiBmaWxsPSIjMDAwMDAwIj4KICA8ZyBpZD0ic3VyZmFjZTkxOTI3MiI+CiAgICA8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gNy4xNjAxNTYgMyBMIDguNzYxNzE5IDUgTCAxOCA1IEMgMTguNTUwNzgxIDUgMTkgNS40NDkyMTkgMTkgNiBMIDE5IDE1IEwgMTYgMTUgTCAyMCAyMCBMIDI0IDE1IEwgMjEgMTUgTCAyMSA2IEMgMjEgNC4zNDc2NTYgMTkuNjUyMzQ0IDMgMTggMyBaIE0gNCA0IEwgMCA5IEwgMyA5IEwgMyAxOCBDIDMgMTkuNjUyMzQ0IDQuMzQ3NjU2IDIxIDYgMjEgTCAxNi44Mzk4NDQgMjEgTCAxNS4yMzgyODEgMTkgTCA2IDE5IEMgNS40NDkyMTkgMTkgNSAxOC41NTA3ODEgNSAxOCBMIDUgOSBMIDggOSBaIE0gNCA0ICIvPgogIDwvZz4KPC9zdmc+Cg=="},448:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return a}));class a{constructor(){this.clear()}clear(){this.datas={},this.keys=[],this.currentIndex=0}pushData(e,t){this.datas[e]=t,this.keys.push(e)}getData(e){return this.datas[e]}addPageIndex(){this.currentIndex++}}}}]);