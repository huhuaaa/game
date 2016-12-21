// 公共组建
import  './index.less'
import React from 'react'
import '../bootstrap'
import {Link} from 'react-router'

export default React.createClass({
    getInitialState: function(){
        return {
            isShowList: false
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
    render: function () {
        return (
                <div></div>
        );
    }
})