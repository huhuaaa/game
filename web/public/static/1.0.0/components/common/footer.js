define('components/common/footer.jsx', function(require, exports, module) {

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
  
  exports['default'] = _react2['default'].createClass({
      displayName: 'footer',
  
      render: function render() {
          return _react2['default'].createElement(
              'footer',
              null,
              'Copyright © 缙云游戏'
          );
      }
  });
  module.exports = exports['default'];

});
