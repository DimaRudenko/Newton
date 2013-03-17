Newton.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
    this.x = (round ? Math.round(x) : x);
    this.y = (round ? Math.round(y) : y);
};

Newton.Point.prototype = {
    add: function () {

    }

};

Newton.point = function (x, y, round) {
    return new Newton.Point(x, y, round);
};