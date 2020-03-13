'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle (resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // http响应状态码分为五类：信息响应(100~199),成功响应(200~299),重定向(300~399),客户端错误(400~499)和服务器错误(500~599)
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};
