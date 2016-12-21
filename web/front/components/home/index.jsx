import React from 'react'
import Header from '../common/header'
import Footer from '../common/footer'
export default React.createClass({
    render: function(){
        return  <div>
                    <Header {...this.props} />
                        <div>
                            首页
                        </div>
                    <Footer {...this.props} />
                </div>
    }
})