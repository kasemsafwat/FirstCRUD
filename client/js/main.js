
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
    <button onClick="updateProduct(${products[index].id})" class="btn btn-success">Update</button>
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

function updateProduct(id) {
  ApiCRUD("PUT", `http://localhost:3000/edit/${id}`);
}

/* 
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var maimBtn = document.getElementById("maimBtn");
let products = [];

getData()

maimBtn.onclick = function () {
    getInputValue()
};

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
};




async function getData() {
    await fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(responseData => {
            if (responseData.message === 'success') {
                products = responseData.data
                // console.log(products);
                displayData()
            }
        })
}

var cartoona = ``

function displayData() {
    products.map(product => {
        cartoona += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.description}</td>
                    <td><button type="button" class="btn btn-outline-primary">Update</button></td>
                    <td><button onclick="deleteObject(${product.price})" type="button" class="btn btn-outline-danger">Delete</button></td>
                </tr>
            `
            document.getElementById('tbody').innerHTML = cartoona
    })
}


function getInputValue() {
    let productObject = {
        name: productName.value,
        price: productPrice.value,
        description: productDesc.value,
    }
    ApiCRUD('POST', productObject)
    // console.log(productObject);
}





function ApiCRUD(method, obj) {
    fetch('http://localhost:3000/products', {
        method: method,
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }
    })
    products.push(obj)
    // window.location.reload()
}

function deleteObject(_id) {
    // fetch('http://localhost:3000/products', {
    //     method: DELETE,
    //     body: JSON.stringify({_id}),
    //     headers: { 'Content-Type': 'application/json' }
    // })
    // window.location.reload()
    console.log(_id);
} */
