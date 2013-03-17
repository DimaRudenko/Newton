/**
 * @autor Dima Rudenko
 */

Newton.Vector2d = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Newton.Vector2d.prototype = {

    constructor: Newton.Vector2d,

    set:function (x, y) {

        this.x = x;
        this.y = y;
        return this;
    },

    set x(x) {

        this.x = x;

        return this;
    },

    set y(y) {

        this.y = y;

        return this;
    },

    // sum vector
    add:function (a, b) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;

    },


    addScalar:function (s) {

        this.x += s;
        this.y += s;

        return this;

    },

    multiplyScalar:function (s) {

        this.x *= s;
        this.y *= s;

        return this;

    }


};

