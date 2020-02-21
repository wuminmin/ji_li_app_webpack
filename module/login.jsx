import React,{Component} from 'react';
import ReactDom,{render} from 'react-dom'
import commonMethod from './common/commonMethod.jsx';
import {ssoUrl} from './common/commonUrl.jsx';
export default class LoginTab extends React.Component{

    constructor(props){
        super(props);
        this.state={
            codeUrl:ssoUrl + "get.login?s=0&v=0&c=codegen&m=get&ts=1564296279052",
            username:"",
            password:"",
            loginNo:"",
            code:""
        }
    }

    /**
     * 登陆测试
     */
    login(e){
        e.preventDefault();
        commonMethod.sendData({
            url: ssoUrl,
            code: 'loginService',
            method: 'loginAll',
            message: {"username":this.state.username,
            "password":this.state.password,"indexCode":this.state.code,"loginNo":this.state.loginNo,
            "authType":"00","loginType":"1","resource":"workflow"},
            successFunc: function (data) {
                
                alert(JSON.stringify(data));
            },
            errorFunc: function (e) {
                alert(e);
            },
            isLogin: true,
            encode: true
        });
    }

    render(){
        return <div>
                <div>
                        <span>用户名：</span>
                        <input type="text" id="username" value={this.state.username} 
                        onChange={e=>this.setState({username:e.target.value})}/>
                </div>
                <div>
                    <span>密码：</span>
                    <input type="password" id="password" value={this.state.password} 
                        onChange={e=>this.setState({password:e.target.value})}/>
                </div>
                <div>
                        <span>实际登陆工号：</span>
                        <input type="text" id="loginNo" value={this.state.loginNo} 
                        onChange={e=>this.setState({loginNo:e.target.value})}/>
                </div>
                <div>
                    <span> 验证码：</span>
                    <input type="text" id="indexCode" value={this.state.code} 
                        onChange={e=>this.setState({code:e.target.value})}/>
                    <img id="imgObj" title="点击换一个验证码" src={this.state.codeUrl}
                    onClick={(e)=>{
                        e.preventDefault();
                        this.setState({codeUrl: ssoUrl + "get.login?s=0&v=0&c=codegen&m=get&ts=" + (new Date()).getTime() });
                    }}/>
                </div>
                <div>
                    <button type="button" onClick={(e)=>{this.login(e);}}> 登录</button>
                        
                </div>
        </div>;
    }

}