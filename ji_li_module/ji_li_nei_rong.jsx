import React from 'react';
import { Tag, Tabs, List } from 'antd';
import commonMethod from './common/commonMethod.jsx';

class MyTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs_list_data: [],
            ban_kuai: this.props.ban_kuai,
            myHTML_tittle: '',
            myHTML_author: '',
            myHTML_time: '',
            myHTML_article: '',
        }
    }

    componentDidMount() {
        let self = this;
        commonMethod.sendData({
            url: 'http://134.64.116.90:8101/ji_li_zhu_shou/',
            code: 'chz566JiLiZhuShouService',
            method: 'rd_xia_zai_tabs_by_ban_kuai',
            isLogin: false,
            message: { ban_kuai: this.state.ban_kuai },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    tabs_list_data: response
                });
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });
    }

    render() {
        const { TabPane } = Tabs;

        function callback(key) {
            console.log(key);
        }


        function getUrlData(url) {
            // url = window.location.href;     //获取当前页面的url
            var enUrl = decodeURI(url); //解码
            var len = enUrl.length;   //获取url的长度值
            var a = enUrl.indexOf("?");   //获取第一次出现？的位置下标
            var b = enUrl.substr(a + 1, len);   //截取问号之后的内容
            var c = b.split("&");   //从指定的地方将字符串分割成字符串数组
            var arr = new Array();  //新建一个数组
            for (var i = 0; i < c.length; i++) {
                var d = c[i].split("=")[1]; //从=处将字符串分割成字符串数组,并选择第2个元素
                arr.push(d);    //将获取的元素存入到数组中
            }

            return arr;
        }


        return (
            <div>
                <Tag color="#2db7f5">{this.props.ban_kuai}</Tag>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    {this.state.tabs_list_data.map((myitem) => {
                        return (
                            <TabPane tab={myitem.table_name} key={myitem.table_key}>
                                <List
                                    bordered
                                    dataSource={myitem.list_data}
                                    renderItem={item => (
                                        <List.Item  >
                                            <button
                                                name={item.url}
                                                onClick={(e) => {
                                                    console.log(e.target.name);
                                                    let arr = getUrlData(e.target.name);
                                                    let ban_kuai = arr[0]
                                                    let lan_mu = arr[1]
                                                    let tittle = arr[2]
                                                    console.log(ban_kuai, lan_mu, tittle);
                                                    let self = this;
                                                    commonMethod.sendData({
                                                        url: 'http://134.64.116.90:8101/ji_li_zhu_shou/',
                                                        code: 'chz566JiLiZhuShouService',
                                                        method: 'myHTML_article_tittle_my_time',
                                                        isLogin: false,
                                                        message: {
                                                            "ban_kuai":ban_kuai,
                                                            "lan_mu": lan_mu,
                                                            "tittle": tittle
                                                        },
                                                        successFunc: function (response) {
                                                            console.log(response);
                                                            self.setState({
                                                                myHTML_article: response.myHTML_article,
                                                                myHTML_tittle: response.myHTML_tittle,
                                                                myHTML_time: response.myHTML_time,
                                                                myHTML_author: response.myHTML_author,
                                                            });

                                                        },
                                                        errorFunc: function (e) {
                                                            console.log(e);
                                                        },
                                                        encode: true
                                                    });
                                                }}
                                            >{item.key} --- {item.key2}</button>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                        )
                    })}

                </Tabs>
                <h1 align={'center'}>{this.state.myHTML_tittle}</h1>
                <h4 align={'center'}>{this.state.myHTML_author}</h4>
                <h4 align={'center'}>{this.state.myHTML_time}</h4>
                <div dangerouslySetInnerHTML={{ __html: this.state.myHTML_article }} />
            </div>
        )
    }
}

export default class JiLiNeiRong extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <MyTabs ban_kuai={'营销活动'}></MyTabs>
            </div>
        )
    }
}