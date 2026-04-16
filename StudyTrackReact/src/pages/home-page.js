import { useEffect, useState } from "react";

function Homejs() {
  const [dataCompleta, setDataCompleta] = useState("");

  useEffect(() => {
    const agora = new Date();
    const opcoes = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setDataCompleta(agora.toLocaleDateString("pt-BR", opcoes));
  }, []);

function adicionarSessao() {
const nova_sessao = document.createElement("div");
nova_sessao.classList.add("estudos");

document.getElementById("sessao-estudos").appendChild(nova_sessao)
}

  return { dataCompleta, adicionarSessao };
}

export default Homejs