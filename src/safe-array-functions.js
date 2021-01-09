import {maybeUndefined, None, some} from './option'

export function safeFirst(arr) {
    return arr.length >= 1
        ? some(arr[0])
        : None
}

export function safeSingle(arr) {
    return arr.length === 1
        ? some(arr[0])
        : None
}

export function safeLast(arr) {
    return arr.length >= 1
        ? some(arr[arr.length-1])
        : None
}

export function safeTake(n) {
    return arr => arr.length >= n
        ? some(arr.slice(0, n))
        : None
}

export function safeDrop(n) {
    return arr => arr.length >= n
        ? some(arr.slice(n))
        : None
}

export function safeFind(predicate) {
    return arr => maybeUndefined(arr.find(predicate))
}

export function safeFindIndex(predicate) {
    return arr =>  {
        const result = arr.findIndex(predicate)
        return result !== -1
            ? some(result)
            : None
    }
}