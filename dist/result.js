"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = success;
exports.failure = failure;
exports.isSuccess = isSuccess;
exports.isFailure = isFailure;
exports.mapResult = mapResult;
exports.chainResult = chainResult;
exports.foldResult = foldResult;
exports.invertResults = invertResults;
exports.ifSucceeded = ifSucceeded;
exports.ifFailed = ifFailed;

var _is_function = require("./is_function");

function success(value) {
  return {
    value: value,
    kind: 'Success'
  };
}

function failure(error) {
  return {
    error: error,
    kind: 'Failure'
  };
}

function isSuccess(_ref) {
  var kind = _ref.kind;
  return kind === 'Success';
}

function isFailure(_ref2) {
  var kind = _ref2.kind;
  return kind === 'Failure';
}

function mapResult(f) {
  return function (result) {
    return isSuccess(result) ? success(f(result.value)) : result;
  };
}

function chainResult(f) {
  return function (result) {
    return isSuccess(result) ? f(result.value) : failure(result.error);
  };
}

function foldResult(ifSuccess) {
  return function (ifFailure) {
    return function (res) {
      return isSuccess(res) ? (0, _is_function.isFunction)(ifSuccess) ? ifSuccess(res.value) : ifSuccess : (0, _is_function.isFunction)(ifFailure) ? ifFailure(res.error) : ifFailure;
    };
  };
}
/*
    [ success(val1), success(val2) ] = success([x, y])
    [ failure(err1), failure(err2) ] = failure(err)
    [ failure(err), success(val) ] = failure(err)
    [ success(val), failure(err) ] = failure(err)
 */


function invertResults(results) {
  return results.reduce(function (acc, result) {
    return chainResult(function (arr) {
      return mapResult(function (value) {
        return arr.concat(value);
      })(result);
    })(acc);
  }, success([]));
}

function ifSucceeded(sideEffect) {
  return function (result) {
    if (isSuccess(result)) {
      sideEffect(result.value);
    }
  };
}

function ifFailed(sideEffect) {
  return function (result) {
    if (isFailure(result)) {
      sideEffect(result.error);
    }
  };
}