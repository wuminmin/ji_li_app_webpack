import React from 'react';
import { Tag, Tabs, List } from 'antd';
import { ListView, Icon, NavBar } from 'antd-mobile';
import commonMethod from './common/commonMethod.jsx';

class MyTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs_list_data: [],
            ban_kuai: this.props.ban_kuai,
        }
    }

    handleClick = e => {
        console.log(e)
    }

    componentDidMount() {
        let self = this;
        commonMethod.sendData({
            url: '/ji_li_zhu_shou/',
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
                                            <a href={item.url} align={'right'}> {item.key} --- {item.key2}</a>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                        )
                    })}

                </Tabs>
            </div>
        )
    }
}

export default class JiLiNeiRong extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usertoken: '',
            username: '',
            userphone: '',
            userrole: '',
            mainid: '',
            type1: '',
            type2: '',
            type3: '',
            ban_kuai1: '营销活动',
            ban_kuai2: '新闻中心',
            ban_kuai3: '依法履职',
            ban_kuai4: '营销活动',
        }
    }

    componentDidMount() {
        let self = this;
        commonMethod.sendData({
            url: '/ji_li_zhu_shou/',
            code: 'chz566JiLiZhuShouService',
            method: 'xia_zai_yong_hu_xin_xi',
            isLogin: false,
            message: {},
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    username: response.username,
                    userphone: response.userphone,
                    userrole: response.userrole,
                    mainid: response.mainid,
                    type1: response.type1,
                    type2: response.type2,
                    type3: response.type3,
                })
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });
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
        let self = this;
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
                        onClick={(e) => {
                            e.preventDefault();
                            WorkHelper.openApp(
                                {
                                    appCode: "aqyhsb",
                                    param: {
                                        startType: '4',
                                        url: `${workflowUrl}manager/_wfstart.html?id=${obj.id}`
                                    },
                                    success: function (data) { },
                                    fail: function (data) { alert(data); }
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
                <h1>11111</h1>
                <MyTabs></MyTabs>
            </div>
        )
    }
}