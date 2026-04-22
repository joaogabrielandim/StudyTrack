function Trocar(id) {
    let cadastro = document.getElementById("cadastro-login");
    let cadastro2 = document.getElementById("cadastro2-login");

    cadastro.style.display = "none"
    cadastro2.style.display = "none"

    document.getElementById(id).style.display = "flex"
}

export default Trocar