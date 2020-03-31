import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
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
                url: `${url}${loginordata}s=${sequence}&c=${code}&m=${method}&v=0&callback=`,
                data:content,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                cancelToken:options.cancelToken?options.cancelToken:false
            }).then(res=>{
                console.log('CommonMethod----------------');
                console.log(res);
                // let data = res.data;
                let str2=  res.data.replace('(','') ;
                let str3=  str2.replace(')','') ;
                let data = JSON.parse (str3) ;
                console.log(data);
                if (data.r == "0") {//success
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
    //弹出提示
    static showMask(msg){
        alert(msg);
    }
}
CommonMethod.sequences=[]
