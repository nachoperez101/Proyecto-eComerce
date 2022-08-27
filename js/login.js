function iniciar() {
    window.location.href = "main-page.html"
}

function CargarNombre() {
    let nombre = document.getElementById('floatingInput').value
    localStorage.setItem('usuario', nombre);    
}