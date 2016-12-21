import React from 'react'
import ReactDOM from 'react-dom'
import { Router , Route, hashHistory} from 'react-router'
// import Common from './components/common'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
    </Router>
    ,
    document.getElementById('app')
)