import {isFunction} from './is_function'

export function success(value) {
    return {
        value,
        kind: 'Success'
    }
}

export function failure(error) {
    return {
        error,
        kind: 'Failure'
    }
}

export function isSuccess({ kind }) {
    return kind === 'Success'
}

export function isFailure({ kind }) {
    return kind === 'Failure'
}

export function mapResult(f) {
    return result => isSuccess(result)
        ? success(f(result.value))
        : result
}

export function chainResult(f) {
    return result => isSuccess(result)
        ? f(result.value)
        : failure(result.error)
}

export function foldResult(ifSuccess) {
    return ifFailure => res => isSuccess(res)
        ? (isFunction(ifSuccess) ? ifSuccess(res.value) : ifSuccess)
        : (isFunction(ifFailure) ? ifFailure(res.error) : ifFailure)
}

/*
    [ success(val1), success(val2) ] = success([x, y])
    [ failure(err1), failure(err2) ] = failure(err)
    [ failure(err), success(val) ] = failure(err)
    [ success(val), failure(err) ] = failure(err)
 */
export function invertResults(results) {
    return results.reduce(
        (acc, result) =>
            chainResult(arr => mapResult(value => arr.concat(value)) (result)) (acc),
        success([])
    )
}

