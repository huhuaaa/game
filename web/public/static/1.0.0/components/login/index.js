define('components/login/index.jsx', function(require, exports, module) {

  /**
   * 登录组建
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRouter = require('react-router/lib/index');
  
  var _commonHeader = require('components/common/header.jsx');
  
  var _commonHeader2 = _interopRequireDefault(_commonHeader);
  
  var _commonHttp = require('common/http');
  
  var _commonHttp2 = _interopRequireDefault(_commonHttp);
  
  var _md5 = require('md5/md5');
  
  var _md52 = _interopRequireDefault(_md5);
  
  exports['default'] = _react2['default'].createClass({
      displayName: 'index',
  
      getInitialState: function getInitialState() {
          return {
              salt: ''
          };
      },
      onSubmit: function onSubmit() {
          var _this = this;
  
          var username = this.refs.username.value;
          var password = this.refs.password.value;
          _commonHttp2['default'].get('/ajax/login/getSalt?username=' + username).then(function (result) {
              var auth = Date.now();
              var params = new URLSearchParams();
              params.append('username', username);
              params.append('password', (0, _md52['default'])(auth + (0, _md52['default'])(result.data.salt + password + result.data.salt) + auth));
              params.append('auth', auth);
              _commonHttp2['default'].post('/ajax/login', params).then(function (data) {
                  if (data.code == 0) {
                      alert('账号或密码错误！');
                  } else {
                      _this.props.router.replace('/');
                  }
              });
          });
      },
      render: function render() {
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(_commonHeader2['default'], this.props),
              _react2['default'].createElement(
                  'div',
                  { className: 'container login-container' },
                  _react2['default'].createElement(
                      'h1',
                      { className: 'text-center' },
                      '登录'
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
                              _react2['default'].createElement(
                                  'button',
                                  { type: 'submit', className: 'btn btn-primary' },
                                  '登录'
                              )
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'input-group' },
                              _react2['default'].createElement(
                                  _reactRouter.Link,
                                  { className: 'btn btn-success', to: '/register' },
                                  '还没有账号？快速注册'
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
