define('components/home/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = require('react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonHeader = require('components/common/header.jsx');
  
  var _commonHeader2 = _interopRequireDefault(_commonHeader);
  
  var _commonFooter = require('components/common/footer.jsx');
  
  var _commonFooter2 = _interopRequireDefault(_commonFooter);
  
  exports['default'] = _react2['default'].createClass({
      displayName: 'index',
  
      render: function render() {
          return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(_commonHeader2['default'], this.props),
              _react2['default'].createElement(
                  'div',
                  null,
                  '首页'
              ),
              _react2['default'].createElement(_commonFooter2['default'], this.props)
          );
      }
  });
  module.exports = exports['default'];

});
