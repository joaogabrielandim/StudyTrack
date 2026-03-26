function trocar(id) {
    let cadastro = document.getElementById("cadastro");
    let cadastro2 = document.getElementById("cadastro2");

    cadastro.style.display = "none"
    cadastro2.style.display = "none"

    document.getElementById(id).style.display = "flex"
}