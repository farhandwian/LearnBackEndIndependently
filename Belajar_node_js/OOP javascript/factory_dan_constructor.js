// factory function -->fungsi untuk buat object
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log(draw);
    },
  };
}

const circle = createCircle(1);

//constructor function -->fungsi untuk buat object
function createCircle8(radius) {
  (this.radius = radius),
    (this.draw = function () {
      console.log(draw);
    });
}

const circle8 = new createCircle8(1); // const circle8 = createCircle8.call({},1) hasilnya sama

// buat fungsi dari scratch(nunjukin konsep fungsi itu dibentuk menjadi object)
const circle41 = new Function(
  "radius",
  `(this.radius = radius),
(this.draw = function () {
  console.log(draw);
});`
);

const circle413 = new circle41(1);
//ntar jadinya circle413 bakal sama dengan circle8

//**fungsi tuh object jga(punya method ama properti bawaan)

//*******************************************************************************

//**mau factory ato constructor 2 2 nya punya fungsi constructor

// --------------------circle8 fungsi constuctor nya dia sendiri
// circle8.constructor
// ƒ createCircle8(radius) {
//   (this.radius = radius),
//     (this.draw = function () {
//       console.log(draw);
//     });
// }

//---------------------circle fungsi constructornya dibuat secara default oleh javascript
// circle.constructor
// ƒ Object() { [native code] }

//*******************************************************************************

// fungsi juga berupa object berarti punya constructor jga

// createCircle8.constructor
// ƒ Function() { [native code] }
