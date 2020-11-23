import {isFunction} from './is_function'
import {foldOption} from './option'
import {failure, foldResult, success} from './result'

export function transformOptionToResult(mapOrErrorMessage) {
    return isFunction(mapOrErrorMessage)
        ? errorMessage => foldOption(mapOrErrorMessage)(() => failure(errorMessage))
        : foldOption(success)(() => failure(mapOrErrorMessage))
}

export function transformResultToPromise(mapOrResult) {
    return isFunction(mapOrResult)
        ? result => foldResult(mapOrResult)(error => Promise.reject(error))(result)
        : foldResult(value => Promise.resolve(value))(error => Promise.reject(error))(mapOrResult)
}