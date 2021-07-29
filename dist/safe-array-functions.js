"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeFirst = safeFirst;
exports.safeSingle = safeSingle;
exports.safeLast = safeLast;
exports.safeTake = safeTake;
exports.safeDrop = safeDrop;
exports.safeFind = safeFind;
exports.safeFindIndex = safeFindIndex;

var _option = require("./option");

function safeFirst(arr) {
  return arr.length >= 1 ? (0, _option.some)(arr[0]) : _option.None;
}

function safeSingle(arr) {
  return arr.length === 1 ? (0, _option.some)(arr[0]) : _option.None;
}

function safeLast(arr) {
  return arr.length >= 1 ? (0, _option.some)(arr[arr.length - 1]) : _option.None;
}

function safeTake(n) {
  return function (arr) {
    return arr.length >= n ? (0, _option.some)(arr.slice(0, n)) : _option.None;
  };
}

function safeDrop(n) {
  return function (arr) {
    return arr.length >= n ? (0, _option.some)(arr.slice(n)) : _option.None;
  };
}

function safeFind(predicate) {
  return function (arr) {
    return (0, _option.maybeUndefined)(arr.find(predicate));
  };
}

function safeFindIndex(predicate) {
  return function (arr) {
    var result = arr.findIndex(predicate);
    return result !== -1 ? (0, _option.some)(result) : _option.None;
  };
}