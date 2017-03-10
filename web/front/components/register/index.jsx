import React from 'react'
import {Link} from 'react-router'
import Http from '/common/http'
import Header from '../common/header'
export default React.createClass({
    getInitialState: function(){
        return {
            msg: ''
        }
    },
    onSubmit: function(){
        let username = this.refs.username.value
        let password = this.refs.password.value
        if(username.length < 4){
            this.setState({
                msg: '用户名不能少于4个字符！'
            })
            return
        }
        if(password.length < 6){
            this.setState({
                msg: '密码不少于六位！'
            })
            return
        }
        if(password != this.refs.pwd.value){
            this.setState({
                msg: '两次密码不一致！'
            })
            return
        }
        var params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        Http.post('/ajax/register', params).then((result)=>{
            if(result.code == 1){
                // 跳转去大厅
                this.props.router.go('/hall')
            }else{
                this.setState({
                    msg: result.msg
                })
            }
        })
    },
    render: function(){
        return (
            <div>
                <Header {...this.props} />
                <div className="contianer register-container">
                    <h1 className="text-center">注册</h1>
                    <form className="" onSubmit={this.onSubmit}>
                        <div className="col-xs-12">
                            <div className="input-group">
                                <input type="text" className="form-control" ref="username" placeholder="用户名" />
                            </div>
                            <div className="input-group">
                                <input type="password" className="form-control" ref="password" placeholder="密码" />
                            </div>
                            <div className="input-group">
                                <input type="password" className="form-control" ref="pwd" placeholder="确认密码" />
                            </div>
                            <div className="input-group" style={{display: this.state.msg.length > 0 ? 'block' : 'none'}}>
                                <span className="warning">{ this.state.msg }</span>
                            </div>
                            <div className="input-group">
                                <button type="submit" className="btn btn-primary">注册</button>
                            </div>
                            <div className="input-group">
                                <Link className="btn btn-success" to="/login">已有账号？去登录</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})