// abstraction teh pokoknya buat object/class sesimple mungkin,jadi ada kek private dan publicnya(hide the detail,show the essential)
// buat public nya jdi simpel

// contoh yang tidak menggunakan prinsip abstraction

// function circle(radius) {
//   this.radius = radius;

//   this.defaultLocation = { x: 0, y: 0 };

//   this.computeMinimumLocation = function () {
//     // ...
//   };

//   this.draw = function () {
//     this.computeMinimumLocation();
//     console.log("draw");
//   };
// }

// const circle = new circle(1);

// menggunakan prinsip abstraction
function circle(radius) {
  this.radius = radius;

  //  ini tuh ngebuat si property jdi private
  let defaultLocation = { x: 0, y: 0 };

  let computeMinimumLocation = function (factor) {
    // ...
  };

  this.draw = function () {
    computeMinimumLocation(0.1);
    console.log("draw");
  };
}

const circle = new circle(1);

// getter and setter
function circle(radius) {
  this.radius = radius;

  //  ini tuh ngebuat si property jdi private
  let defaultLocation = { x: 0, y: 0 };

  let computeMinimumLocation = function (factor) {
    // ...
  };

  this.draw = function () {
    computeMinimumLocation(0.1);
    console.log("draw");
  };

  Object.defineProperties(this, "defaultLocation", {
    get: function () {
      return defaultLocation;
    },
    set: function (value) {
      defaultLocation = value;
    },
  });
}

const circle = new circle(1);
