import {None, some} from './option'

export function safeProperty(key) {
    return obj => obj.hasOwnProperty(key) ? some(obj[key]): None
}

export function safePropertyOf(obj) {
    return key => safeProperty(key) (obj)
}