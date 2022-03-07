let storeId = document.getElementById("store-id");
let storeAddress = document.getElementById("store-address");
let storeForm = document.getElementById("store-form");

// Send post to API to add store

async function addStore(e) {
  if (storeId.value === "" || storeAddress.value === "") {
    alert("Please fill in fields");
  }

  const data = {
    storeId: storeId.value,
    address: storeAddress.value,
  };

  try {
    axios
      .post("http://localhost:3000/store-locator", data)
      .then((res) => console.log("succes"))
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener("submit", addStore);
