const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_REL = "Cant.";
let productsArray = [];
let currentSortCriteria = undefined;
let minCount = '';
let maxCount = '';
let clave = ''
let catname = ''
const URL_Products = PRODUCTS_URL + localStorage.getItem('catID') + '.json'

// Mostrar usuario en la esquina superior derecha
document.getElementById('usuario').innerHTML = localStorage.getItem('usuario')



// Funcion que ordena el array segun el criterio que haya (ascendente o descendente por precio, o por relevancia)
function sortProducts(criteria, array){
    let result = [];

    switch (criteria) {
        case ORDER_ASC_BY_PRICE:
            result = array.sort(function (a,b) {
                return a.cost - b.cost;
            })
            break;
    
        case ORDER_DESC_BY_PRICE:
            result = array.sort(function (a,b) {
                return b.cost - a.cost;
            })
            break;
        
        case ORDER_BY_REL:
            result = array.sort(function (a,b) {
                return b.soldCount - a.soldCount;
            })
            break
    }
    
    return result;
}



function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}



// Funcion que selecciona y muestra solo aquellos productos del array que contienen la clave y estan dentro de los limites
function showProductList(){
    let htmlContentToAppend = "";

    for(let i = 0; i < CurrentProdArray.length; i++){ 
        let prod = CurrentProdArray[i];

        if (((minCount == '') || (prod.cost >= minCount)) && ((maxCount == '') || (prod.cost <= maxCount)) &&
            ((clave == '') || (prod.name.toLowerCase().includes(clave.toLowerCase())) || 
             (prod.description.toLowerCase().includes(clave.toLowerCase())))) {

            htmlContentToAppend += `
            <div onclick="setProdID(` + prod.id + `)" class="list-group-item list-group-item-action">
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
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    document.getElementById('titulo').innerHTML = catname;
}




// Ordena el array y lo imprime
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        CurrentProdArray = productsArray;
    }

    CurrentProdArray = sortProducts(currentSortCriteria, CurrentProdArray);

    //Muestro las categorías ordenadas
    showProductList();
}





document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_Products).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            CurrentProdArray = resultObj.data.products;
            catname = resultObj.data.catName
            showProductList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){

        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = "";
        maxCount = "";

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if (minCount != ""){
            minCount = parseInt(minCount);
        }
        
        if (maxCount != ""){
            maxCount = parseInt(maxCount);
        }
        
        showProductList();
    });

    document.getElementById('searchbar').addEventListener('input', function () {
        clave = document.getElementById('searchbar').value;
        showProductList();
    })

});



