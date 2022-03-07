function createCircle(radius) {
  (this.radius = radius),
    (this.draw = function () {
      console.log(draw);
    });
}

const circle = new createCircle(1);

for (let key in circle) {
  if (typeof circle[key] !== "function") console.log(key, circle[key]);
}

// untuk ngambil key nya
const keys = Object.keys(circle);
console.log(keys);
