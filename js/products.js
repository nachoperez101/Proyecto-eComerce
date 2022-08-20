let productsArray = [];
const URL_Products = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

//función que recibe un array con los datos, y los muestra en pantalla
function showProductList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let prod = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + prod.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ prod.name +` - `+ prod.currency +` `+ prod.cost +`</h4> 
                        <p> `+ prod.description +`</p> 
                        </div>
                        <small class="text-muted">` + prod.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_Products).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            showProductList(productsArray);
        }
    });
});