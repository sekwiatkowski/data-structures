"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformOptionToResult = transformOptionToResult;
exports.transformResultToPromise = transformResultToPromise;

var _is_function = require("./is_function");

var _option = require("./option");

var _result = require("./result");

function transformOptionToResult(mapOrErrorMessage) {
  return (0, _is_function.isFunction)(mapOrErrorMessage) ? function (errorMessage) {
    return (0, _option.foldOption)(mapOrErrorMessage)(function () {
      return (0, _result.failure)(errorMessage);
    });
  } : (0, _option.foldOption)(_result.success)(function () {
    return (0, _result.failure)(mapOrErrorMessage);
  });
}

function transformResultToPromise(mapOrResult) {
  return (0, _is_function.isFunction)(mapOrResult) ? (0, _result.foldResult)(mapOrResult)(function (error) {
    return Promise.reject(error);
  }) : (0, _result.foldResult)(function (value) {
    return Promise.resolve(value);
  })(function (error) {
    return Promise.reject(error);
  })(mapOrResult);
}