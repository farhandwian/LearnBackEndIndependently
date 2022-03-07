function Particle() {
  this.x = 100;
  this.y = 200;
}

function Confetti() {
  Particle.call(this);
}

Particle.prototype.show = function () {
  point(this.x, this.y);
};

var p;
var c;

function setup() {
  p = new Particle();
  c = new Confetti();
}
