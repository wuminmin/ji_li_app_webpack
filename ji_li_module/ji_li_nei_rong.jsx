import React from 'react';
import { Tag, Tabs, List } from 'antd';
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
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>11111</h1>
                <MyTabs ban_kuai={'营销活动'}></MyTabs>
            </div>
        )
    }
}