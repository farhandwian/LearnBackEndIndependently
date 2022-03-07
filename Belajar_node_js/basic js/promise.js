console.log("tes");
let p = new Promise((resolve, reject) => {
  let a = 1 + 3;
  if (a == 4) {
    resolve("succes");
  } else {
    reject("fail");
  }
});

p.then((message) => {
  console.log("resolve " + message);
}).catch((message) => {
  console.log("reject " + message);
});

////////////////////////////////

//Without Promise
const u1 = false;
const u2 = false;

function visualizationCallback(callback, errorCallback) {
  if (u1) {
    errorCallback({
      name: "u1",
      message: "ini catch",
    });
  } else if (u2) {
    errorCallback({
      name: "u2",
      message: "ini catch",
    });
  } else {
    callback("ini resolve");
  }
}

visualizationCallback(
  (message) => {
    console.log("succes+ " + message);
  },
  (error) => {
    console.log(error.name + " " + error.message);
  }
);

function visualizationPromise() {
  return new Promise((resolve, reject) => {
    if (u1) {
      reject({
        name: "u1",
        message: "ini catch",
      });
    } else if (u2) {
      reject({
        name: "u2",
        message: "ini catch",
      });
    } else {
      resolve("ini resolve");
    }
  });
}

visualizationPromise()
  .then((message) => {
    console.log("Succes: " + message);
  })
  .catch((error) => {
    console.log(error.name + " " + error.message);
  });
