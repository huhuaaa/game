define('components/common/header.jsx', function(require, exports, module) {

  // 公共组建
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  '';
  
  var _react = require('react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  require('components/bootstrap/index');
  
  var _reactRouter = require('react-router/lib/index');
  
  var _commonHttp = require('common/http');
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  exports['default'] = _react2['default'].createClass({
      displayName: 'header',
  
      getInitialState: function getInitialState() {
          var _this = this;
  
          _commonHttp2['default'].get('/ajax/login').then(function (result) {
              if (result.code == 1) {
                  _this.setState({
                      loginUser: result.data
                  });
              }
          });
          return {
              isShowList: false,
              loginUser: null
          };
      },
      showList: function showList() {
          this.setState({
              isShowList: !this.state.isShowList
          });
      },
      goBack: function goBack() {
          this.props.router.goBack();
      },
      loginOut: function loginOut() {
          var _this2 = this;
  
          _commonHttp2['default'].get('/ajax/login/out').then(function (result) {
              if (result.code == 1) {
                  // this.setState({
                  //     loginUser: null
                  // })
                  _this2.props.router.go('/');
              } else {
                  alert('操作失败，请重试！');
              }
          });
      },
      render: function render() {
          return _react2['default'].createElement(
              'header',
              { className: this.state.isShowList ? 'show' : '' },
              _react2['default'].createElement(
                  'div',
                  { className: '' },
                  _react2['default'].createElement(
                      'a',
                      { className: 'back-btn', onClick: this.goBack },
                      _react2['default'].createElement('span', { className: 'glyphicon glyphicon-chevron-left' }),
                      _react2['default'].createElement(
                          'span',
                          null,
                          '返回'
                      )
                  ),
                  _react2['default'].createElement('a', { className: 'glyphicon glyphicon-th-list menu-list-btn pull-right', onClick: this.showList })
              ),
              _react2['default'].createElement(
                  'div',
                  { className: 'container' },
                  _react2['default'].createElement(
                      'ul',
                      { className: 'nav nav-stacked', role: 'tablist' },
                      _react2['default'].createElement(
                          'li',
                          { className: this.props.router.getCurrentLocation().pathname == '/' ? 'nav-current' : '', role: 'presentation' },
                          _react2['default'].createElement(
                              _reactRouter.Link,
                              { to: '/', onClick: this.showList },
                              '首页'
                          )
                      ),
                      _react2['default'].createElement(
                          'li',
                          { style: { display: this.state.loginUser ? 'none' : 'block' }, className: this.props.router.getCurrentLocation().pathname == '/login' ? 'nav-current' : '', role: 'presentation' },
                          _react2['default'].createElement(
                              _reactRouter.Link,
                              { to: '/login', onClick: this.showList },
                              '登录'
                          )
                      ),
                      _react2['default'].createElement(
                          'li',
                          { style: { display: this.state.loginUser ? 'none' : 'block' }, className: this.props.router.getCurrentLocation().pathname == '/register' ? 'nav-current' : '', role: 'presentation' },
                          _react2['default'].createElement(
                              _reactRouter.Link,
                              { to: '/register', onClick: this.showList },
                              '注册'
                          )
                      ),
                      _react2['default'].createElement(
                          'li',
                          { style: { display: this.state.loginUser ? 'block' : 'none' }, className: this.props.router.getCurrentLocation().pathname == '/hall' ? 'nav-current' : '', role: 'presentation' },
                          _react2['default'].createElement(
                              _reactRouter.Link,
                              { to: '/hall', onClick: this.showList },
                              '大厅'
                          )
                      ),
                      _react2['default'].createElement(
                          'li',
                          { style: { display: this.state.loginUser ? 'block' : 'none' }, className: '', role: 'presentation' },
                          _react2['default'].createElement(
                              'a',
                              { onClick: this.loginOut },
                              '退出'
                          )
                      )
                  )
              )
          );
      }
  });
  module.exports = exports['default'];

});
