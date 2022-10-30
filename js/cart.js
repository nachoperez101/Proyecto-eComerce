document.getElementById('usuario').innerHTML = localStorage.getItem('usuario')
const URL_CART_INFO = `https://japceibal.github.io/emercado-api/user_cart/25801.json`
const inputCantidad = document.getElementById("cantidad")
let TiempoReal = false


function showCart() {
    let cart = JSON.parse(localStorage.getItem('listaCarrito'))
    let contentToAppend = '';
    for (let i = 0; i < cart.length; i++) {
        contentToAppend += `
        <tr style="margin-right: 10%;">
          <th scope="row" ><img style="width: 70%;" src="${cart[i].image}"></th>
          <td>${cart[i].name}</td>
          <td>${cart[i].currency} ${cart[i].unitCost}</td>
          <td><input type="number" id="cantidad${i}" value="${cart[i].count}" style="width: 25%;" oninput="updatePrice(${i})" min="1"></td>
          <td><b id="subT${i}">${cart[i].currency} ${cart[i].count * cart[i].unitCost}</b></td>
          <td><button class="btn btn-sm btn-outline-danger rounded-1" type="button" title="Delete" onclick="eliminarElem(${i})"><i class="fa fa-trash-alt"></i></button></td>
        </tr>`
    }
    document.getElementById("tbody").innerHTML = contentToAppend;
    updateTotales();
}

function updatePrice(index){
    let i = index.toString()
    let cart = JSON.parse(localStorage.getItem('listaCarrito'))
    let cant = document.getElementById("cantidad" + i).value
    if (cant >= 1) {
        document.getElementById("subT" + i).innerHTML = `${cart[i].currency} ${cant * cart[i].unitCost}`
        cart[i].count = cant;
        localStorage.setItem('listaCarrito', JSON.stringify(cart))
    } else {
        cart[i].count = 1;
        localStorage.setItem('listaCarrito', JSON.stringify(cart))
        document.getElementById("subT" + i).innerHTML = `Ingrese cantidad mayor o igual a 1`
    }
    updateTotales();
}

function eliminarElem(i) {
    let cart = JSON.parse(localStorage.getItem('listaCarrito'));
    cart.splice(i, 1);
    localStorage.setItem('listaCarrito', JSON.stringify(cart));
    showCart();
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

function desactivarFormaPago() {
    document.getElementById("linkFormaPago").innerHTML = 'Modificar'
    if (document.getElementById('tarjeta').checked) {
        document.getElementById('numTarjeta').disabled = false;
        document.getElementById('codigoSeg').disabled = false;
        document.getElementById('vencimiento').disabled = false;
        document.getElementById('numCuenta').disabled = true;
        document.getElementById("txtFormaPago").innerHTML = 'Tarjeta de crédito.'
    } else {
        document.getElementById('numTarjeta').disabled = true;
        document.getElementById('codigoSeg').disabled = true;
        document.getElementById('vencimiento').disabled = true;
        document.getElementById('numCuenta').disabled = false;
        document.getElementById("txtFormaPago").innerHTML = 'Transferencia bancaria.'
    }
}

function validarForm() {
    document.getElementById('formEnvio').classList.add('was-validated')
    if (!(document.getElementById('tarjeta').checkValidity() &&
          document.getElementById('numTarjeta').checkValidity() &&
          document.getElementById('codigoSeg').checkValidity() &&
          document.getElementById('vencimiento').checkValidity() &&
          document.getElementById('numCuenta').checkValidity())) {
        document.getElementById('msjErrorFormaPago').innerHTML = 'Ingrese forma de pago'
    } else {
        document.getElementById('msjErrorFormaPago').innerHTML = ''
    }
    TiempoReal = true
}

function completeSubmit() {
    alert('¡Has comprado con éxito!'); 
    localStorage.setItem('listaCarrito', ''); 
    window.location.href = 'main-page.html';
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