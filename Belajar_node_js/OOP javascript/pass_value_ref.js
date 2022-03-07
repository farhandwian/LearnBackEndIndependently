//------- 2 type pass
//passing by value types --> primitve value(string,number,boolean,undefined,null)
//passing by reference types -->object,function,array

// pass by ref
let x = { value: 10 };
let y = x;

x.value = 20;

//output
// x
// {value: 20}
// y
// {value: 20}

//*****************************************************************

// pass by value
let number = 10;
function increase(num) {
  num++;
}
increase(number);
console.log(number);
