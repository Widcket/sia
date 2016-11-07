const slice = Array.prototype.slice;

export default function (fn, ...args) {
    const partialArgs = slice.call(args, 1);
    return function () {
        return fn.apply(this, partialArgs.concat(slice.call(args)));
    };
}
