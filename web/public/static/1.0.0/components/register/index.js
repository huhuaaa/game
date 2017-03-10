define('components/register/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = require('react-router/lib/index');
  
  var _commonHttp = require('common/http');
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _commonHeader = require('components/common/header.jsx');
  
  var _commonHeader2 = _interopRequireDefault(_commonHeader);
  
  exports['default'] = _react2['default'].createClass({
      displayName: 'index',
  
      getInitialState: function getInitialState() {
          return {
              msg: ''
          };
      },
      onSubmit: function onSubmit() {
          var _this = this;
  
          var username = this.refs.username.value;
          var password = this.refs.password.value;
          if (username.length < 4) {
              this.setState({
                  msg: '用户名不能少于4个字符！'
              });
              return;
          }
          if (password.length < 6) {
              this.setState({
                  msg: '密码不少于六位！'
              });
              return;
          }
          if (password != this.refs.pwd.value) {
              this.setState({
                  msg: '两次密码不一致！'
              });
              return;
          }
          var params = new URLSearchParams();
          params.append('username', username);
          params.append('password', password);
          _commonHttp2['default'].post('/ajax/register', params).then(function (result) {
              if (result.code == 1) {
                  // 跳转去大厅
                  _this.props.router.go('/hall');
              } else {
                  _this.setState({
                      msg: result.msg
                  });
              }
          });
      },
      render: function render() {
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(_commonHeader2['default'], this.props),
              _react2['default'].createElement(
                  'div',
                  { className: 'contianer register-container' },
                  _react2['default'].createElement(
                      'h1',
                      { className: 'text-center' },
                      '注册'
                  ),
                  _react2['default'].createElement(
                      'form',
                      { className: '', onSubmit: this.onSubmit },
                      _react2['default'].createElement(
                          'div',
                          { className: 'col-xs-12' },
                          _react2['default'].createElement(
                              'div',
                              { className: 'input-group' },
                              _react2['default'].createElement('input', { type: 'text', className: 'form-control', ref: 'username', placeholder: '用户名' })
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'input-group' },
                              _react2['default'].createElement('input', { type: 'password', className: 'form-control', ref: 'password', placeholder: '密码' })
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'input-group' },
                              _react2['default'].createElement('input', { type: 'password', className: 'form-control', ref: 'pwd', placeholder: '确认密码' })
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'input-group', style: { display: this.state.msg.length > 0 ? 'block' : 'none' } },
                              _react2['default'].createElement(
                                  'span',
                                  { className: 'warning' },
                                  this.state.msg
                              )
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'input-group' },
                              _react2['default'].createElement(
                                  'button',
                                  { type: 'submit', className: 'btn btn-primary' },
                                  '注册'
                              )
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'input-group' },
                              _react2['default'].createElement(
                                  _reactRouter.Link,
                                  { className: 'btn btn-success', to: '/login' },
                                  '已有账号？去登录'
                              )
                          )
                      )
                  )
              )
          );
      }
  });
  module.exports = exports['default'];

});
