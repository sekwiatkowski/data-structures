"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeProperty = safeProperty;
exports.safePropertyOf = safePropertyOf;

var _option = require("./option");

function safeProperty(key) {
  return function (obj) {
    return obj.hasOwnProperty(key) ? (0, _option.some)(obj[key]) : _option.None;
  };
}

function safePropertyOf(obj) {
  return function (key) {
    return safeProperty(key)(obj);
  };
}