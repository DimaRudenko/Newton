Newton.Geometry = function () {
    this.id = Newton.GeometryIdCount++;
};

Newton.prototype = {
    constructor: Newton.Geometry
};

Newton.GeometryIdCount = 0;