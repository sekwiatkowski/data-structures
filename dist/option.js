"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = some;
exports.isSome = isSome;
exports.isNone = isNone;
exports.mapOption = mapOption;
exports.chainOption = chainOption;
exports.foldOption = foldOption;
exports.invertOptions = invertOptions;
exports.concatOptions = concatOptions;
exports.alternativeOption = alternativeOption;
exports.alternativeValue = alternativeValue;
exports.maybeNull = maybeNull;
exports.maybeUndefined = maybeUndefined;
exports.ifPresent = ifPresent;
exports.ifAbsent = ifAbsent;
exports.None = void 0;

var _is_function = require("./is_function");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function some(value) {
  return {
    value: value,
    kind: 'Some'
  };
}

var None = {
  kind: 'None'
};
exports.None = None;

function isSome(_ref) {
  var kind = _ref.kind;
  return kind === 'Some';
}

function isNone(_ref2) {
  var kind = _ref2.kind;
  return kind === 'None';
}

function mapOption(f) {
  return function (opt) {
    return isSome(opt) ? some(f(opt.value)) : None;
  };
}

function chainOption(f) {
  return function (opt) {
    return isSome(opt) ? f(opt.value) : None;
  };
}

function foldOption(ifSome) {
  return function (ifNone) {
    return function (opt) {
      return isSome(opt) ? (0, _is_function.isFunction)(ifSome) ? ifSome(opt.value) : ifSome : (0, _is_function.isFunction)(ifNone) ? ifNone() : ifNone;
    };
  };
}
/*
    [ some(x), some(y) ] = some([x, y])
    [ None, None ] = None
    [ None, some(x) ] = None
    [ some(x), None ] = None
 */


function invertOptions(options) {
  return options.reduce(function (acc, opt) {
    return chainOption(function (arr) {
      return mapOption(function (value) {
        return [].concat(_toConsumableArray(arr), [value]);
      })(opt);
    })(acc);
  }, some([]));
}
/*
    [ some(x), some(y) ] = [x, y]
    [ None, None ] = []
    [ None, some(x) ] = [x]
    [ some(x), None ] = [x]
 */


function concatOptions(options) {
  return options.reduce(function (arr, opt) {
    return foldOption(function (value) {
      return arr.concat([value]);
    })(arr)(opt);
  }, []);
}

function alternativeOption(functionOrOption) {
  return function (opt) {
    return isSome(opt) ? opt : (0, _is_function.isFunction)(functionOrOption) ? functionOrOption() : functionOrOption;
  };
}

function alternativeValue(functionOrValue) {
  return function (opt) {
    return foldOption(function (x) {
      return x;
    })((0, _is_function.isFunction)(functionOrValue) ? functionOrValue() : functionOrValue)(opt);
  };
}

function maybeNull(nullable) {
  return nullable === null ? None : some(nullable);
}

function maybeUndefined(undefinable) {
  return undefinable === undefined ? None : some(undefinable);
}

function ifPresent(sideEffect) {
  return function (opt) {
    if (isSome(opt)) {
      sideEffect(opt.value);
    }
  };
}

function ifAbsent(sideEffect) {
  return function (opt) {
    if (isNone(opt)) {
      sideEffect();
    }
  };
}