define('index.jsx', function(require, exports, module) {

  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = require('react-dom/index');
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _reactRouter = require('react-router/lib/index');
  
  // import Common from './components/common'
  
  var _componentsHome = require('components/home/index.jsx');
  
  var _componentsHome2 = _interopRequireDefault(_componentsHome);
  
  var _componentsLogin = require('components/login/index.jsx');
  
  var _componentsLogin2 = _interopRequireDefault(_componentsLogin);
  
  var _componentsRegister = require('components/register/index.jsx');
  
  var _componentsRegister2 = _interopRequireDefault(_componentsRegister);
  
  _reactDom2['default'].render(_react2['default'].createElement(
      _reactRouter.Router,
      { history: _reactRouter.hashHistory },
      _react2['default'].createElement(_reactRouter.Route, { path: '/', component: _componentsHome2['default'] }),
      _react2['default'].createElement(_reactRouter.Route, { path: '/login', component: _componentsLogin2['default'] }),
      _react2['default'].createElement(_reactRouter.Route, { path: '/register', component: _componentsRegister2['default'] })
  ), document.getElementById('app'));

});
