let productNameInput = document.getElementById('productNameInput');
let productPriceInput = document.getElementById('productPriceInput');
let productCategoryInput = document.getElementById('productCategoryInput');
let productDescInput = document.getElementById('productDescInput');
let searchInput = document.getElementById('searchInput');
let productNameAlert = document.getElementById("productNameAlert");
let productPriceAlert = document.getElementById("productPriceAlert");
let addBtn = document.getElementById("Btn");
let productsList;
let currentIndex;
if(localStorage.getItem('ourProducts') == null)
{
    productsList = [];
}
else
{
    productsList = JSON.parse(localStorage.getItem("ourProducts"));
    // this to convert the string into array
    displayProducts(productsList);
}
addBtn.onclick = function(){
    if(addBtn.innerHTML == "add product")
    {
        addProduct();
    }
    else if(addBtn.innerHTML == "update Product")
    {
        editProduct();
    }
}
function addProduct(){
    let product = {
        name : productNameInput.value,
        price : productPriceInput.value,
        category : productCategoryInput.value,
        description : productDescInput.value
    };
    productsList.push(product);
    localStorage.setItem("ourProducts" , JSON.stringify(productsList));  // this to convert the array into string
    displayProducts(productsList);
    clearForm();
}
function displayProducts(anyArray){
    let productDetails = '';
    for(let i = 0;i < anyArray.length;i++)
    {
        productDetails += `<tr>
                                <td>${i}</td>
                                <td>${anyArray[i].name}</td>
                                <td>${anyArray[i].price}</td>
                                <td>${anyArray[i].category}</td>
                                <td>${anyArray[i].description}</td>
                                <td>
                                    <button class = 'btn btn-warning text-white' onclick = "getProductData(${i})" >Update</button>
                                </td>
                                <td>
                                    <button onclick = 'deleteProduct(${i})' class = 'btn btn-danger text-white'>Delete</button>
                                </td>
                            </tr>`;
    }
    document.getElementById('tableBody').innerHTML= productDetails;
}
function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
}
function deleteProduct(index){
    productsList.splice(index,1);
    localStorage.setItem("ourProducts" , JSON.stringify(productsList));
    displayProducts(productsList);
}
function searchProduct(){
    let term = searchInput.value;
    let wantedProducts = [];
    for(let i = 0;i < productsList.length;i++)
    {
        if(productsList[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            wantedProducts.push(productsList[i]);
        }
    }
    displayProducts(wantedProducts);
}
function getProductData(index){
    productNameInput.value = productsList[index].name;
    productPriceInput.value = productsList[index].price;
    productCategoryInput.value = productsList[index].category;
    productDescInput.value = productsList[index].description;
    addBtn.innerHTML = "update Product";
    currentIndex = index;
}
function editProduct(){
    let product = {
        name : productNameInput.value,
        price : productPriceInput.value,
        category : productCategoryInput.value,
        description : productDescInput.value
    };
    productsList[currentIndex] = product;
    displayProducts(productsList);
    localStorage.setItem('ourProducts',JSON.stringify(productsList))
    addBtn.innerHTML = "add product";
    clearForm();
}
function validateProductName(productName){
    let regex = /^[A-Z][a-z]{3,6}$/;
    if(regex.test(productName) == true)
    {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        productNameAlert.classList.replace("d-block" , "d-none");
    }
    else
    {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        productNameAlert.classList.replace("d-none" , "d-block");
    }
}
productNameInput.addEventListener("keyup",function(){
    validateProductName(productNameInput.value)
})
function validateProductPrice(productPrice){
    let regex = /^[1-9][0-9]{2,3}$/;
    if(regex.test(productPrice) == true)
    {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        productPriceAlert.classList.replace("d-block" , "d-none");
    }
    else
    {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        productPriceAlert.classList.replace("d-none" , "d-block");
    }
}
productPriceInput.addEventListener("keyup",function(){
    validateProductPrice(productPriceInput.value)
})