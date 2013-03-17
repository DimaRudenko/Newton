Newton.Util = {

    extend: function (obj, source) {
        if (!source) { return obj; }

        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                obj[prop] = source[prop];
            }
        }
        return obj;
    },

    bind: function (fn, obj) { // (Function, Object) -> Function
        var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
        return function () {
            return fn.apply(obj, args || arguments);
        };
    }
};

Newton.extend = Newton.Util.extend;
Newton.bind = Newton.Util.bind;
