document.getElementById('usuario').innerHTML = localStorage.getItem('usuario')

//Coloca los valores en los distintos inputs
function fillBlanks() {
    document.getElementById('eMail').value = localStorage.getItem('usuario')
    document.getElementById('primerNombre').value = localStorage.getItem('primerNombre')
    document.getElementById('segundoNombre').value = localStorage.getItem('segundoNombre')
    document.getElementById('primerApellido').value = localStorage.getItem('primerApellido')
    document.getElementById('segundoApellido').value = localStorage.getItem('segundoApellido')
    document.getElementById('telefonoContacto').value = localStorage.getItem('telefonoContacto')
    /* if (localStorage.getItem('imgPerfil') !== null && localStorage.getItem('imgPerfil') !== '') {
        document.getElementById('imgPerfil').src = URL.createObjectURL(localStorage.getItem('imgPerfil'))
    } */
}


//Guadra en localStorage los valores de los inputs
function completeSubmit() {
    localStorage.setItem('primerNombre', document.getElementById('primerNombre').value)
    localStorage.setItem('segundoNombre', document.getElementById('segundoNombre').value)
    localStorage.setItem('primerApellido', document.getElementById('primerApellido').value)
    localStorage.setItem('segundoApellido', document.getElementById('segundoApellido').value)
    localStorage.setItem('usuario', document.getElementById('eMail').value)
    localStorage.setItem('telefonoContacto', document.getElementById('telefonoContacto').value)
}

function updateImgPerfil() {
    /* const [file] = document.getElementById('inputImgPerfil').files
    if (file) {
        localStorage.setItem('imgPerfil', JSON.stringify([file]))
        document.getElementById('imgPerfil').src = URL.createObjectURL(file)
    } */
}

//Se fija que estes loguedo, y si no lo estas pone una alerta
function logueado() {
    if (localStorage.getItem('usuario') == '') {
        document.getElementById('main-profile').innerHTML = 
        `
          <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">No se encuentra logueado</h4>
          </div>
        `
        return false;
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function(e){
    if (logueado()) {
        fillBlanks();
    }
});