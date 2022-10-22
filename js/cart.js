document.getElementById('usuario').innerHTML = localStorage.getItem('usuario')
const URL_CART_INFO = `https://japceibal.github.io/emercado-api/user_cart/25801.json`
const inputCantidad = document.getElementById("cantidad")


function showCart() {
    let cart = JSON.parse(localStorage.getItem('listaCarrito'))
    console.log(cart);
    let contentToAppend = '';
    for (let i = 0; i < cart.length; i++) {
        contentToAppend += `
        <tr style="margin-right: 10%;">
          <th scope="row" ><img style="width: 70%;" src="${cart[i].image}"></th>
          <td>${cart[i].name}</td>
          <td>${cart[i].currency} ${cart[i].unitCost}</td>
          <td><input type="number" id="cantidad${i}" value="${cart[i].count}" style="width: 25%;" oninput="updatePrice(${i})" min="0"></td>
          <td id="subT${i}">${cart[i].currency} ${cart[i].count * cart[i].unitCost}</td>
        </tr>`
    }
    document.getElementById("tbody").innerHTML = contentToAppend;
}

function updatePrice(index){
    let i = index.toString()
    let cart = JSON.parse(localStorage.getItem('listaCarrito'))
    let cant = document.getElementById("cantidad" + i).value
    if (cant >= 0) {
        document.getElementById("subT" + i).innerHTML = `${cart[i].currency} ${cant * cart[i].unitCost}`
        cart[i].count = cant;
        localStorage.setItem('listaCarrito', JSON.stringify(cart))
    } else {
        cart[i].count = 0;
        localStorage.setItem('listaCarrito', JSON.stringify(cart))
        document.getElementById("subT" + i).innerHTML = `Ingrese cantidad positiva`
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_CART_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            carrito = resultObj.data;
            if (localStorage.getItem('listaCarrito') == null) {
                localStorage.setItem('listaCarrito', JSON.stringify([carrito.articles[0]]))
            }
            showCart();
        }
    });
});