import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
import {baseCbzsUrl} from './commonUrl.jsx';
export default class CommonMethod {
    constructor(){
    }
     static getNext (name) {
        let sequence = this.sequences[name];
        if (sequence == undefined) {
            this.sequences[name] = 0;
            return 0;
        }
        else {
            sequence++;
            this.sequences[name] = sequence;
            return sequence;
        }
    };
    static contextUrl () {
        let currentLocation = document.location;
        let pathName = currentLocation.pathname;
        return currentLocation.protocol + "//" + currentLocation.host + pathName.substring(0, pathName.indexOf("/", 1)) + "/";
    };
    static sendData(options){
        try{
            let self=this;
            if(!options){
                options={};
            }
            var defaultOptions={
                url:self.contextUrl(),
                code:false,
                method:false,
                message:{},
                successFunc:function(){},
                errorFunc:function(e){alert(e)},
                isShowloading:false,
                async:true,
                isLogin:false,
                postType:false,
                encode:false,
                notShowLogin:false,
                notdata:false
            };
            defaultOptions=Object.assign(defaultOptions,options);
            let code=defaultOptions.code;
            let method=defaultOptions.method;
            let message=defaultOptions.message;
            let successFunc=defaultOptions.successFunc;
            let errorFunc=defaultOptions.errorFunc;
            let isShowloading=defaultOptions.isShowloading;
            let async=defaultOptions.async;
            let isLogin=defaultOptions.isLogin;
            let postType=defaultOptions.postType;
            let encode=defaultOptions.encode;
            let notShowLogin=defaultOptions.notShowLogin;
            let url=defaultOptions.url;
            let notdata=defaultOptions.notdata;
            let content;
            if(!code){
                throw "senddata method's code parameter can't be null." + document.location;
            }
            if(!method){
                throw "senddata method's method parameter can't be null." + document.location;
            }
            var sequence = this.getNext("json");
            if(message){
                content=JSON.stringify(message);
                if(encode){
                    content="data=" +encodeURIComponent(content);
                }
                else{
                    content="data=" + content;
                }
            }
            else{
                content="data=";
            }
            if(notdata){
                content=message
            }
            let loginordata=isLogin?"get.login?":"get.data?";
            axios({
                method: 'post',
                url: `${url}${loginordata}s=${sequence}&c=${code}&m=${method}`,
                data:content,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                cancelToken:options.cancelToken?options.cancelToken:false,
                withCredentials: true,
                timeout:60000
            }).then(res=>{
                let data=res.data;
                if (data.r == 0) {//success
                    successFunc(data.m);
                } else if(data.r=="-999"&&data.a=="login"){
                    if(notShowLogin){
                        errorFunc(null, data.r,"功能异常，请联系系统管理员 "+ data.m);
                        return;
                    }
                }else{
                    errorFunc(null, data.r,"功能异常，请联系系统管理员 "+ data.m);
                }
            }).catch(error=>{
                errorFunc(error.message);
            });
        }catch(e){
            alert(e);
        }
       
    }
    //获取时间 （ 根据 日 月 实时 区分）
    static getUpdateTime(type,role,callback,id,latnId){
        let params= new URLSearchParams();
        params.append('dateType',type);
        if(role=='contractedAssistant'){
            if(type=='month'||type=='day'){
                params.append('pageType','home');
                params.append('deptId',id);
                params.append('roleCode','yyb_head');
            }else if(type=='hour'){
                params.append('pageType','home');
                params.append('channelCode','home002_2');
                params.append('latnId',latnId);
                params.append('deptId',id);
                params.append('roleCode','yyb_head');
            }
        }else if(role=='gzzs_bqzhsh'){
            if(type=='month'||type=='day'){
                params.append('pageType','home');
                params.append('deptId',id);
                params.append('roleCode','gzzs_qdjl');
            }else if(type=='hour'){
                params.append('pageType','home');
                params.append('channelCode','jrfz_city');
                params.append('deptId',id);
                params.append('roleCode','gzzs_qdjl');
            }
        }
        axios({
           method: 'post',
           url: baseCbzsUrl+"client/channelAction!getUpdateDateInTheoryFromServer.msp",
           data:params
           }).then(res=>{
                if (res.data.retCode == 1) {
                    return res.data.retResult
                }else{
                    return false
                }
           }).then(data=>{
               callback(data);
           }).catch(error=>{
             alert(error.message);
           });
    }
    //应用跳转方法
    static jumpToApp(code,count,number){
        appService.startApp(code,number,function(ticket){   
        },function(msg){   
            showAlert("失败。"+msg);   
        });   
    }
    //票据认证（天翼助手托盘）
    static checkTicket(callback){
        let self=this;
        try{
            appService.getTicket(function(ticket){
                if(ticket==null){
                    alert("票据为空，请重新登录！");
                    self.closeApp();
                }else{
                    callback(ticket);
                }
            },function(msg){
                alert(msg);
            });
            // WorkHelper.getToken({
            //     success:function(data){
            //         callback(data);
            //     },
            //     fail:function(){
            //         alert('获取token失败')
            //     }
            // })
        }catch(msg){
            alert(msg);
        }
       
    }
    //关闭应用
    static closeApp(){
        // WorkHelper.closeApp({
        //     success: function(data) {},
        //     fail: function(data) { }
        // });
        appService.closeApp(function(){          
            },function(){
        });
    }
    //弹出提示
    static showMask(msg){
        alert(msg);
    }
    //上传文件
    static upLoadFile(options){
        let url = options.url,
            file = options.file,
            fileVal = options.fileVal,
            onBeforeSend = options.onBeforeSend,
            onProgress = options.onProgress,
            onError = options.onError,
            onSuccess = options.onSuccess;
        let name = file.name,
            type = file.type,
            lastModifiedDate = file.lastModifiedDate;

        let data = {
            name: name,
            type: type,
            size: options.type == 'file' ? file.size : file.base64.length,
            lastModifiedDate: lastModifiedDate
        };
        let headers = {};

        if (onBeforeSend(file, data, headers) === false) return;

        onProgress(file, 0);

        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        file.xhr = xhr;

        // 设置参数
        Object.keys(data).forEach(function (key) {
            formData.append(key, data[key]);
        });
        if (options.type == 'file') {
            formData.append(fileVal, file, name);
        } else {
            formData.append(fileVal, file.base64);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    try {
                        // 只支持json
                        var ret = JSON.parse(xhr.responseText);
                        onSuccess(file, ret);
                    } catch (err) {
                        onError(file, err);
                    }
                } else {
                    onError(file, new Error('XMLHttpRequest response status is ' + xhr.status));
                }
            }
        };
        xhr.upload.addEventListener('progress', function (evt) {
            if (evt.total == 0) return;

            var percent = Math.ceil(evt.loaded / evt.total) * 100;

            onProgress(file, percent);
        }, false);

        xhr.open('POST', url);

        // 设置头部信息
        Object.keys(headers).forEach(function (key) {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.send(formData);
    }



    /**
     * 格式化日期
     *  @parma strDate 2000-1-1 09:12:12.0格式的数据
     */
    static formatDateString(strDate){
        if(!strDate){
            return "";
        }
        else{
            var newDate = new Date();
            var arrDateTime = strDate.split(" ");
            var arrDate = arrDateTime[0].split("-");
            newDate.setYear(arrDate[0]);
            newDate.setMonth(arrDate[1] - 1);
            newDate.setDate(arrDate[2]);
            if (arrDateTime.length > 1) {
                var arrTime = arrDateTime[1].split(":");
                newDate.setHours(arrTime[0]);
                newDate.setMinutes(arrTime[1]);
                if (arrTime.length > 2) {
                    newDate.setSeconds(arrTime[2]);
                }
                else {
                    newDate.setSeconds(0);
                }
            }
            else{
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
            }
            newDate.setMilliseconds(0);
            return [ CommonMethod.padding((newDate.getMonth()+1).toString(), 2, "0") ,"-",
            CommonMethod.padding((newDate.getDate()).toString(), 2, "0")," ",
            CommonMethod.padding((newDate.getHours()).toString(), 2, "0"),":",
            CommonMethod.padding((newDate.getMinutes()).toString(), 2, "0")];
        }
    }

    /**
       padding special char to source and make the source length equal to assigned length
    */
    static padding(strData, len, padChar) {
        var paddingCount = len - strData.length;
        if (paddingCount > 0) {
            for (var i = 0; i < paddingCount; i++) {
                strData = padChar + strData;
            }
        }
        return strData;
    };

    /**
       parse url parameters
       @return {hashKey:hashValue}
    */
   static urlHashInfo() {
        var href = window.location.href;
        var index = href.indexOf("?");
        var hashValue = href.substr(index, href.length - index);
        var result={};
        if (hashValue.length > 1) {
            var hashKeys = hashValue.substr(1, hashValue.length).split("&");
            for (var i = 0; i < hashKeys.length; i++) {
                var index = hashKeys[i].indexOf("=");
                result[hashKeys[i].substr(0, index)]=hashKeys[i].substr(index + 1, hashKeys[i].length - index);
            }
        }
        return result;
    }; 

}
CommonMethod.sequences=[]