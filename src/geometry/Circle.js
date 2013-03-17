Newton.Circle = function (x, y, radius) {

    Newton.Geometry.call(this);

    this.speed = Newton.point((Math.random() * 3) + 2, (Math.random() * 3) + 2);
    this.x = x;
    this.y = y;
    this.radius = radius || 10;

};

Newton.Circle.prototype = Object.create(Newton.Geometry.prototype);

Newton.Circle.prototype.update = function () {
    var x = this.x,
        y = this.y,
        speed = this.speed,
        ballRadius = this.radius;
    this.x += speed.x;
    this.y += speed.y;
    if (x >= 300 - ballRadius && speed.x > 0) speed.x = -speed.x;
    if (x <= ballRadius && speed.x < 0) speed.x = -speed.x;
    if (y >= 200 - ballRadius && speed.y > 0) speed.y = -speed.y;
    if (y <= ballRadius && speed.y < 0) speed.y = -speed.y;
};

Newton.Circle.prototype.draw = function (context) {
    var x = this.x,
        y = this.y,
        radius = this.radius;

    context.fillStyle = 'rgb(245,0,0)';

    context.save();
    context.translate(x, y);
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    context.restore();
};

Newton.circle = function (x, y, radius) {
    return new Newton.Circle(x, y, radius);
};
