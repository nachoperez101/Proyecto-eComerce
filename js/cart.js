document.getElementById('usuario').innerHTML = localStorage.getItem('usuario')
const URL_CART_INFO = `https://japceibal.github.io/emercado-api/user_cart/25801.json`
const inputCantidad = document.getElementById("cantidad")


function showCart() {
    let cart = JSON.parse(localStorage.getItem('listaCarrito'))
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
    updateTotales();
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
    updateTotales();
}

function updateTotales() {
    let cart = JSON.parse(localStorage.getItem('listaCarrito'))
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].currency == 'USD') {
            subTotal += cart[i].count * cart[i].unitCost;
        } else{
            subTotal += cart[i].count * cart[i].unitCost / 41;
        }
    }
    let btnRadio = document.getElementsByName("tipoEnvio");
    let envio = 0
    for(i = 0; i < btnRadio.length; i++) {
        if(btnRadio[i].checked){
            envio = subTotal / 100 * btnRadio[i].value;
        }
    }

    document.getElementById("subTotal").innerHTML = Math.round(subTotal);
    document.getElementById("envio").innerHTML = Math.round(envio);
    document.getElementById("total").innerHTML = Math.round(subTotal + envio);
    
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