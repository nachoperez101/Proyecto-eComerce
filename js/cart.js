document.getElementById('usuario').innerHTML = localStorage.getItem('usuario')
const URL_CART_INFO = `https://japceibal.github.io/emercado-api/user_cart/25801.json`
const inputCantidad = document.getElementById("cantidad")


function showCart() {
    let contentToAppend = '';
    for (let i = 0; i < cart.articles.length; i++) {
        contentToAppend += `
        <tr style="margin-right: 10%;">
          <th scope="row" ><img style="width: 50%;" src="${cart.articles[i].image}"></th>
          <td>${cart.articles[i].name}</td>
          <td>${cart.articles[i].currency} ${cart.articles[i].unitCost}</td>
          <td><input type="number" id="cantidad${i}" value="${cart.articles[i].count}" style="width: 25%;" oninput="updatePrice(${i})" min="0"></td>
          <td id="subT${i}">${cart.articles[i].currency} ${cart.articles[i].count * cart.articles[i].unitCost}</td>
        </tr>`
    }
    document.getElementById("tbody").innerHTML = contentToAppend;
}

function updatePrice(index){
    let i = index.toString()
    let cant = document.getElementById("cantidad" + i).value
    if (cant >= 0) {
        document.getElementById("subT" + i).innerHTML = `${cart.articles[i].currency} ${cant * cart.articles[i].unitCost}`
    } else {
        document.getElementById("subT" + i).innerHTML = `Ingrese cantidad positiva`
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_CART_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cart = resultObj.data;
            showCart();
        }
    });
});