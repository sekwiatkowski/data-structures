"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _option = require("./option");

Object.keys(_option).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _option[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _option[key];
    }
  });
});

var _safeArrayFunctions = require("./safe-array-functions");

Object.keys(_safeArrayFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _safeArrayFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _safeArrayFunctions[key];
    }
  });
});

var _safeObjectFunctions = require("./safe-object-functions");

Object.keys(_safeObjectFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _safeObjectFunctions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _safeObjectFunctions[key];
    }
  });
});

var _result = require("./result");

Object.keys(_result).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _result[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _result[key];
    }
  });
});

var _transformation = require("./transformation");

Object.keys(_transformation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transformation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transformation[key];
    }
  });
});