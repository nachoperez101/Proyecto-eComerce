document.getElementById('usuario').innerHTML = localStorage.getItem('usuario');
const URL_PRODUCT_INFO = PRODUCT_INFO_URL + localStorage.getItem('prodID') + '.json'
const URL_PRODUCT_COMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodID') + '.json'


function showProduct() {

    let contentToAppend = ''
    for (let i = 0; i < product.images.length; i++) {
        contentToAppend += `
        <div class="col">
            <div class="img-thumbnail">
                <img src="${product.images[i]}" style="width:100%">
            </div>
        </div>`
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

    document.getElementById('titulo').innerHTML = product.name;
    document.getElementById('precio').innerHTML = product.currency + product.cost.toString();
    document.getElementById('descripcion').innerHTML = product.description;
    document.getElementById('categoria').innerHTML = product.category;
    document.getElementById('cantidad').innerHTML = product.soldCount.toString();
    document.getElementById('img').innerHTML = contentToAppend;
    document.getElementById('lista_comentarios').innerHTML = commentToAppend;
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








document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            showProduct();
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