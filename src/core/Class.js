/*
 * Thanks to Vladimir Agafonkin for Leaflet library!
 * https://github.com/Leaflet/Leaflet
 */

Newton.Class = function () {};

Newton.Class.extend = function (props) {

    // extended class with the new prototype
    var Class = function () {

        // call the constructor
        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }

        // call all constructor hooks
        if (this._initHooks) {
            this.callInitHooks();
        }
    };

    // instantiate class without calling constructor
    var F = function () {};
    F.prototype = this.prototype;

    var proto = new F();
    proto.constructor = Class;

    Class.prototype = proto;

    //inherit parent's statics
    for (var i in this) {
        if (this.hasOwnProperty(i) && i !== 'prototype') {
            Class[i] = this[i];
        }
    }

    // mix static properties into the class
    if (props.statics) {
        Newton.extend(Class, props.statics);
        delete props.statics;
    }

    // mix includes into the prototype
    if (props.includes) {
        Newton.UtiNewton.extend.apply(null, [proto].concat(props.includes));
        delete props.includes;
    }

    // merge options
    if (props.options && proto.options) {
        props.options = Newton.extend({}, proto.options, props.options);
    }

    // mix given properties into the prototype
    Newton.extend(proto, props);

    proto._initHooks = [];

    var parent = this;
    Class.__super__ = parent.prototype;
    // add method for calling all hooks
    proto.callInitHooks = function () {

        if (this._initHooksCalled) { return; }

        if (parent.prototype.callInitHooks) {
            parent.prototype.callInitHooks.call(this);
        }

        this._initHooksCalled = true;

        for (var i = 0, len = proto._initHooks.length; i < len; i++) {
            proto._initHooks[i].call(this);
        }
    };

    return Class;
};


// method for adding properties to prototype
Newton.Class.include = function (props) {
    Newton.extend(this.prototype, props);
};

// merge new default options to the Class
Newton.Class.mergeOptions = function (options) {
    Newton.extend(this.prototype.options, options);
};

// add a constructor hook
Newton.Class.addInitHook = function (fn) { // (Function) || (String, args...)
    var args = Array.prototype.slice.call(arguments, 1);

    var init = typeof fn === 'function' ? fn : function () {
        this[fn].apply(this, args);
    };

    this.prototype._initHooks = this.prototype._initHooks || [];
    this.prototype._initHooks.push(init);
};
