
let products = [];

getData();


function ApiCRUD(endPoint, url, body) {
  fetch(url, {
    method: endPoint,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "success") {
        getData();
      }
    });
}

// get data from backend using fetch
function getData() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((resData) => {
      if (resData.message == "success") {
        products = resData.data;
        showData();
      }
      console.log(products);
    });
}

//function to display data in browser
function showData() {
  var cartona = ``;

  for (let index = 0; index < products.length; index++) {
    cartona += ` 
    <tr>
    <td>${products[index].name}</td>
    <td>${products[index].price}</td>
    <td>${products[index].description}</td>
    <td>
    <button onClick="getupdateProduct(${products[index].id})" class="btn btn-success">Update</button>
    </td>
    <td>
    <button onClick="deleteProduct(${products[index].id})" class="btn btn-danger">Delete</button>
    </td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

//get data from frontend inputs by user and add it in database
function getInputValue() {
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productDesc = document.getElementById("productDesc").value;
    let productObj = {
      name: productName,
      price: productPrice,
      description: productDesc,
    };
  console.log(productObj);
  ApiCRUD("POST", "http://localhost:3000/addProduct", productObj);
}


//delete product
function deleteProduct(id) {
  ApiCRUD("DELETE", `http://localhost:3000/delete/${id}`);
}



// get back data from table to input to update it 
let currentUpdateId = null;
function getupdateProduct(id) {
  const product = products.find((item) => item.id === id);
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productDesc").value = product.description;

  currentUpdateId = id;
  document.getElementById("maimBtn").classList.add("d-none");
  document.getElementById("update").classList.remove("d-none");
}


//set new data updated
function setNewUpdateData() {
  if (currentUpdateId === null) {
    alert("Please select a product to update.");
    return;
  }

  let updatedProduct = {
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    description: document.getElementById("productDesc").value,
  };

  ApiCRUD(
    "PUT",
    `http://localhost:3000/edit/${currentUpdateId}`,
    updatedProduct
  );

  currentUpdateId = null;
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDesc").value = "";
  document.getElementById("maimBtn").classList.remove("d-none");
  document.getElementById("update").classList.add("d-none");
};
