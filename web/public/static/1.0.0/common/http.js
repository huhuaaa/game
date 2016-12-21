define('common/http', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _axios = require('axios/index');
  
  var _axios2 = _interopRequireDefault(_axios);
  
  _axios2['default'].defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  
  exports['default'] = {
      get: function get(url, data, config) {
          return _axios2['default'].get(url, data, config).then(function (response) {
              if (response.status == 200) {
                  return response.data;
              }
          })['catch'](function () {
              console.log('fail');
          });
      },
      post: function post(url, data, config) {
          return _axios2['default'].post(url, data, config).then(function (response) {
              if (response.status == 200) {
                  return response.data;
              }
          })['catch'](function () {
              console.log('fail');
          });
      }
  };
  module.exports = exports['default'];

});
