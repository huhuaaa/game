/**
 * 登录组建
 */
import React from 'react'
import {Link} from 'react-router'
import Header from '../common/header'
import Http from '/common/http'
import MD5 from 'md5'

export default React.createClass({
    getInitialState: function(){
        return {
            salt: ''
        }
    },
    onSubmit: function(){
        let username = this.refs.username.value
        let password = this.refs.password.value
        Http.get('/ajax/login/getSalt?username=' + username, ).then((result)=>{
            let auth = Date.now()
            let params = new URLSearchParams()
            params.append('username', username)
            params.append('password', MD5(auth + MD5(result.data.salt + password + result.data.salt) + auth))
            params.append('auth', auth)
            Http.post('/ajax/login', params).then((data)=>{
                if(data.code == 0){
                    alert('账号或密码错误！')
                }else{
                    this.props.router.replace('/')
                }
            })
        })
    },
    render: function () {
        return (
            <div>
                <Header {...this.props} />
                <div className="container login-container">
                    <h1 className="text-center">登录</h1>
                    <form className="" onSubmit={this.onSubmit}>
                        <div className="col-xs-12">
                            <div className="input-group">
                                <input type="text" className="form-control" ref="username" placeholder="用户名" />
                            </div>
                            <div className="input-group">
                                <input type="password" className="form-control" ref="password" placeholder="密码" />
                            </div>
                            <div className="input-group">
                                <button type="submit" className="btn btn-primary">登录</button>
                            </div>
                            <div className="input-group">
                                <Link className="btn btn-success" to="/register">还没有账号？快速注册</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})