define('components/common/index.jsx', function(require, exports, module) {

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
  
  exports['default'] = _react2['default'].createClass({
      displayName: 'index',
  
      getInitialState: function getInitialState() {
          return {
              isShowList: false
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
      render: function render() {
          return _react2['default'].createElement('div', null);
      }
  });
  module.exports = exports['default'];

});
