document.getElementById('usuario').innerHTML = localStorage.getItem('usuario');
const URL_PRODUCT_INFO = PRODUCT_INFO_URL + localStorage.getItem('prodID') + '.json'


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

    document.getElementById('titulo').innerHTML = product.name;
    document.getElementById('precio').innerHTML = product.currency + product.cost.toString();
    document.getElementById('descripcion').innerHTML = product.description;
    document.getElementById('categoria').innerHTML = product.category;
    document.getElementById('cantidad').innerHTML = product.soldCount.toString();
    document.getElementById('img').innerHTML = contentToAppend;
}










document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            showProduct();
        }
    });
});