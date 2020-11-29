import {isFunction} from './is_function'

export function some(value) {
    return {
        value,
        kind: 'Some'
    }
}

export const None = {
    kind: 'None'
}

export function isSome({ kind }) {
    return kind === 'Some'
}

export function isNone({ kind }) {
    return kind === 'None'
}

export function mapOption(f) {
    return opt => isSome(opt)
        ? some(f(opt.value))
        : None
}

export function chainOption(f) {
    return opt => isSome(opt)
        ? f(opt.value)
        : None
}

export function foldOption(ifSome) {
    return ifNone => opt => isSome(opt)
        ? (isFunction(ifSome) ? ifSome(opt.value) : ifSome)
        : (isFunction(ifNone) ? ifNone() : ifNone)
}

/*
    [ some(x), some(y) ] = some([x, y])
    [ None, None ] = None
    [ None, some(x) ] = None
    [ some(x), None ] = None
 */
export function invertOptions(options) {
    return options.reduce(
        (acc, opt) =>
            chainOption(arr => mapOption(value => [...arr, value]) (opt)) (acc),
        some([])
    )
}

/*
    [ some(x), some(y) ] = [x, y]
    [ None, None ] = []
    [ None, some(x) ] = [x]
    [ some(x), None ] = [x]
 */
export function concatOptions(options) {
    return options.reduce(
        (arr, opt) => foldOption (value => arr.concat([value])) (arr) (opt),
        []
    )
}

export function alternativeOption(functionOrOption) {
    return opt => isSome(opt)
        ? opt
        : (isFunction(functionOrOption) ? functionOrOption() : functionOrOption)
}

export function alternativeValue(functionOrValue) {
    return opt => foldOption(x => x) (isFunction(functionOrValue) ? functionOrValue() : functionOrValue) (opt)
}

export function maybeNull(nullable) {
    return nullable === null ? None : some(nullable)
}

export function maybeUndefined(undefinable) {
    return undefinable === undefined ? None : some(undefinable)
}

export function ifPresent(sideEffect) {
    return opt => {
        if (isSome(opt)) {
            sideEffect(opt.value)
        }
    }
}

export function ifAbsent(sideEffect) {
    return opt => {
        if (isNone(opt)) {
            sideEffect()
        }
    }
}