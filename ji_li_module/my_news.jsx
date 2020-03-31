import { Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown, Button, Tag, PageHeader } from 'antd';
import React from 'react';
import Qs from 'qs';
import axios from 'axios';
import 'antd/dist/antd.css';
// import './index.css';
// import MyHeader from './MyHeader';
// import MyFooter from './MyFooter';
// import AppGlobal from './AppGlobal';
// import CommonMethod from './commonMethod';
import CommonMethod from './common/commonMethod.jsx';
const { SubMenu } = Menu;

class MyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            菜单列表: [],
            lan_mu: this.props.lan_mu,
            ban_kuai: this.props.ban_kuai,
            my_tittle: this.props.my_tittle,
            myHTML_tittle: '',
            myHTML_article: '',
            myHTML_time: '',
            myHTML_author:'',
        }
    }

    componentDidMount() {
        let self = this;
        CommonMethod.sendData({
            url: 'http://134.64.116.90:8101/ji_li_zhu_shou/',
            code: 'chz566JiLiZhuShouService',
            method: 'rd_xia_zai_by_lan_mu',
            isLogin: false,
            message: { "ban_kuai":this.props.ban_kuai ,"lan_mu": this.props.lan_mu ,"my_tittle":this.props.my_tittle },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    菜单列表: response
                });
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });

        CommonMethod.sendData({
            url: 'http://134.64.116.90:8101/ji_li_zhu_shou/',
            code: 'chz566JiLiZhuShouService',
            method: 'myHTML_article_tittle_my_time',
            isLogin: false,
            message: {
                "ban_kuai": this.props.ban_kuai,
                "lan_mu": this.props.lan_mu,
                "tittle": this.props.my_tittle
            },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    myHTML_article: response.myHTML_article,
                    myHTML_tittle: response.myHTML_tittle,
                    myHTML_time: response.myHTML_time,
                    myHTML_author:response.myHTML_author,
                });
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });
    }

    handleClick = e => {
        console.log('click ', e.key);
        let self = this;
        CommonMethod.sendData({
            url: 'http://134.64.116.90:8101/ji_li_zhu_shou/',
            code: 'chz566JiLiZhuShouService',
            method: 'myHTML_article_tittle_my_time',
            isLogin: false,
            message: {
                "ban_kuai": this.props.ban_kuai,
                "lan_mu": this.props.lan_mu,
                "tittle": e.key
            },
            successFunc: function (response) {
                console.log(response);
                self.setState({
                    myHTML_article: response.myHTML_article,
                    myHTML_tittle: response.myHTML_tittle,
                    myHTML_time: response.myHTML_time,
                    myHTML_author:response.myHTML_author,
                });
              
            },
            errorFunc: function (e) {
                console.log(e);
            },
            encode: true
        });
    };

    render() {
        return (
            <Row>
                <Col span={4}>
                    <PageHeader
                        style={{
                            border: '1px solid rgb(235, 237, 240)',
                        }}
                        onBack={() => { window.location = '/' }}
                        title={this.state.ban_kuai}
                        subTitle={this.state.lan_mu}
                    />,
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        {
                            this.state.菜单列表.map((item) => {
                                return (
                                    <SubMenu item={item} key={item.月份} title={
                                        <span>
                                            <Icon type="setting" />
                                            <span>{item.月份}</span>
                                        </span>
                                    } >
                                        {
                                            item.新闻标题列表.map((item2) => {
                                                return (
                                                    <Menu.Item key={item2.标题}>{item2.标题}</Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </Col>
                <Col span={2}></Col>
                <Col span={18}>
                    <h1 align={'center'}>{this.state.myHTML_tittle}</h1>
                    <h4 align={'center'}>{this.state.myHTML_author}</h4>
                    <h4 align={'center'}>{this.state.myHTML_time}</h4>
                    <div dangerouslySetInnerHTML={{ __html: this.state.myHTML_article }} />
                </Col>
            </Row>

        )
    }
}

export default class MyNews extends React.Component {
    state = {
        collapsed: false,
        myHTML: '',
        ban_kuai: '',
        lan_mu: '',
        my_tittle: '',
    };

    componentDidMount() {
        console.log(this.props)
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        console.log(params.get('ban_kuai'))
        console.log(params.get('lan_mu'))
        this.setState({
            ban_kuai: params.get('ban_kuai'),
            lan_mu: params.get('lan_mu'),
            my_tittle: params.get('tittle'),
        });
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);

        return (
            <div>
                {/* <MyHeader usertoken={new URLSearchParams(this.props.location.search).get('usertoken')}></MyHeader> */}
                <MyMenu ban_kuai={params.get('ban_kuai')} lan_mu={params.get('lan_mu')} my_tittle={params.get('tittle')}></MyMenu>
                {/* <MyFooter></MyFooter> */}
            </div>
        );
    }
}