// 公共组建
import  './index.less'
import React from 'react'
import '../bootstrap'
import {Link} from 'react-router'
import Http from 'common/http'

export default React.createClass({
    getInitialState: function(){
        Http.get('/ajax/login').then((result)=>{
            if(result.code == 1){
                this.setState({
                    loginUser: result.data
                })
            }
        })
        return {
            isShowList: false,
            loginUser: null
        }
    },
    showList: function(){
        this.setState({
            isShowList: !this.state.isShowList
        })
    },
    goBack: function(){
        this.props.router.goBack()
    },
    loginOut: function(){
        Http.get('/ajax/login/out').then((result)=>{
            if(result.code == 1){
                // this.setState({
                //     loginUser: null
                // })
                this.props.router.go('/')
            }else{
                alert('操作失败，请重试！')
            }
        })
    },
    render: function () {
        return (
            <header className={this.state.isShowList ? 'show' : ''}>
                <div className="">
                    <a className="back-btn" onClick={this.goBack}><span className="glyphicon glyphicon-chevron-left"></span><span>返回</span></a>
                    <a className="glyphicon glyphicon-th-list menu-list-btn pull-right" onClick={this.showList}></a>
                </div>
                <div className="container">
                    <ul className="nav nav-stacked" role="tablist">
                        <li className={ this.props.router.getCurrentLocation().pathname == '/' ? 'nav-current' : ''} role="presentation"><Link to="/" onClick={this.showList}>首页</Link></li>
                        <li style={{display: this.state.loginUser ? 'none' : 'block'}} className={ this.props.router.getCurrentLocation().pathname == '/login' ? 'nav-current' : ''} role="presentation"><Link to="/login" onClick={this.showList}>登录</Link></li>
                        <li style={{display: this.state.loginUser ? 'none' : 'block'}} className={ this.props.router.getCurrentLocation().pathname == '/register' ? 'nav-current' : ''} role="presentation"><Link to="/register" onClick={this.showList}>注册</Link></li>
                        <li style={{display: this.state.loginUser ? 'block' : 'none'}} className={ this.props.router.getCurrentLocation().pathname == '/hall' ? 'nav-current' : ''} role="presentation"><Link to="/hall" onClick={this.showList}>大厅</Link></li>
                        <li style={{display: this.state.loginUser ? 'block' : 'none'}} className={ ''} role="presentation"><a onClick={this.loginOut}>退出</a></li>
                    </ul>
                </div>
            </header>
        );
    }
})