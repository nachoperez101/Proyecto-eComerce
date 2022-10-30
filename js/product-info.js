document.getElementById('usuario').innerHTML = localStorage.getItem('usuario');
const URL_PRODUCT_INFO = PRODUCT_INFO_URL + localStorage.getItem('prodID') + '.json'
const URL_PRODUCT_COMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodID') + '.json'


function showProduct() {

    let contentToAppend = ''
    for (let i = 0; i < product.images.length; i++) {
        if (i == 0) {
            contentToAppend += `
            <div class="carousel-item active">
                    <img src="${product.images[i]}" class="d-block w-100">
            </div>`
        }
        else {
            contentToAppend += `
            <div class="carousel-item">
                    <img src="${product.images[i]}" class="d-block w-100">
            </div>`
        }
    }



    let commentToAppend = '';
    for (let j = 0; j < comments.length; j++) {

        let stars = '';
        for (let k = 0; k < comments[j].score; k++) {
            stars += `<span class="fa fa-star checked"></span>
            `
        }
        for (let k = 0; k < 5-comments[j].score; k++) {
            stars += `<span class="far fa-star"></span>
            `
        }
        commentToAppend += `
        <li class="list-group-item" style="margin-bottom: 1px;">
            <p style="margin: -1px">
                <span class="fw-bold">${comments[j].user}</span> - ${comments[j].dateTime} - ${stars}
            </p>
            <p style="margin: -1px">
                ${comments[j].description}
            </p>
        </li>`
        
    }

    let relacionados = ''
    for (let i = 0; i < product.relatedProducts.length; i++) {
        relacionados += `
        <div class="card" style="width: 18rem;" onclick="changeProd(${product.relatedProducts[i].id})">
            <img class="card-img-top" src="${product.relatedProducts[i].image}">
            <div class="card-body">
                <h5 class="card-title">${product.relatedProducts[i].name}</h5>
            </div>
        </div>
        `
    }

    document.getElementById('titulo').innerHTML = product.name;
    document.getElementById('precio').innerHTML = product.currency + product.cost.toString();
    document.getElementById('descripcion').innerHTML = product.description;
    document.getElementById('categoria').innerHTML = product.category;
    document.getElementById('cantidad').innerHTML = product.soldCount.toString();
    document.getElementById('carousel').innerHTML = contentToAppend;
    document.getElementById('lista_comentarios').innerHTML = commentToAppend;
    document.getElementById('rel').innerHTML = relacionados;
}

function addComment() {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    let comentario = {
        product: parseInt(localStorage.getItem('prodID')),
        score: parseInt(document.getElementById('puntos').value),
        description: document.getElementById('opinion').value,
        user: localStorage.getItem('usuario'),
        dateTime: dateTime
    }
    comments.push(comentario);
    showProduct();
}

function changeProd(id) {
    localStorage.setItem('prodID', id);
    window.location = "product-info.html";
}

async function agregarAlCarrito() {

    let elemento = {
        count: 1,
        currency: product.currency,
        id: product.id,
        image: product.images[0],
        name: product.name,
        unitCost: product.cost
    }
    if (localStorage.getItem('listaCarrito') == null || localStorage.getItem('listaCarrito') == '') {
        localStorage.setItem('listaCarrito', JSON.stringify([elemento]));
    }
    else {
        let array = JSON.parse(localStorage.getItem('listaCarrito'));
        let index;
        for (index = 0; index < array.length; index++) {
            if (array[index].id == product.id) {
                break
            }
        }
        if (index == array.length) {
            array.push(elemento);
        } else {
            array[index].count++
        }
        localStorage.setItem('listaCarrito', JSON.stringify(array))
    }
    window.location = "cart.html"
}




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
        }
    });

    getJSONData(URL_PRODUCT_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            showProduct();
        }
    });
});