import { useEffect, useState } from "react";

function Homejs() {
  const [dataCompleta, setDataCompleta] = useState("");

  useEffect(() => {
    const agora = new Date();
    const opcoes = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setDataCompleta(agora.toLocaleDateString("pt-BR", opcoes));
  }, []);

  function adicionarSessao() {
  }

  return { dataCompleta, adicionarSessao };
}

export default Homejs