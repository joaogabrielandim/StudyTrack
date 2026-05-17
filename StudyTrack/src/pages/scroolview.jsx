import React, { useState } from 'react';
import { adicionarSessao } from "../services/firestore";

const Modal = ({ isOpen, onClose }) => {
  const [materia,    setMateria]    = useState("");
  const [horas,      setHoras]      = useState("");
  const [minutos,    setMinutos]    = useState("");
  const [carregando, setCarregando] = useState(false);

  if (!isOpen) return null;

  const handleAdicionar = async () => {
    if (!materia.trim()) { alert("Selecione uma matéria"); return; }
    if (!horas && !minutos) { alert("Informe a duração da sessão"); return; }

    setCarregando(true);
    try {
      await adicionarSessao({ materia, horas: horas || 0, minutos: minutos || 0 });
      setMateria("");
      setHoras("");
      setMinutos("");
      onClose();
    } catch (err) {
      console.error("Erro ao salvar sessão:", err);
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.tituloModal}>Nova Sessão</h2>
          <button onClick={onClose} style={styles.fecharbotao}>&times;</button>
        </div>
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label>Matéria</label>
          <select style={styles.input} value={materia} onChange={(e) => setMateria(e.target.value)}>
            <option value="">Selecione uma matéria</option>
            <option>Matemática</option>
            <option>Programação</option>
            <option>Física</option>
            <option>Química</option>
            <option>Português</option>
            <option>História</option>
            <option>Inglês</option>
            <option>Outra</option>
          </select>

          <label>Duração da Sessão</label>
          <div style={styles.containerTempo}>
            <div style={styles.campoTempo}>
              <input
                type="number" placeholder="0" min="0"
                style={styles.inputTempo}
                value={horas}
                onChange={(e) => setHoras(e.target.value)}
              />
              <span style={styles.labelTempo}>horas</span>
            </div>
            <div style={styles.campoTempo}>
              <input
                type="number" placeholder="0" min="0" max="59"
                style={styles.inputTempo}
                value={minutos}
                onChange={(e) => setMinutos(e.target.value)}
              />
              <span style={styles.labelTempo}>min</span>
            </div>
          </div>

          <button
            type="button"
            style={{ ...styles.adicionarbotao, opacity: carregando ? 0.6 : 1 }}
            onClick={handleAdicionar}
            disabled={carregando}
          >
            {carregando ? "Salvando..." : "Adicionar Sessão"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay:       { position:'fixed', top:0, left:0, right:0, bottom:0, backgroundColor:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 },
  modal:         { backgroundColor:'white', padding:'24px', borderRadius:'12px', width:'450px', boxShadow:'0 4px 15px rgba(0,0,0,0.2)' },
  header:        { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' },
  form:          { display:'flex', flexDirection:'column', gap:'10px' },
  input:         { width:'100%', boxSizing:'border-box', padding:'10px', borderRadius:'6px', border:'1px solid #ccc', marginBottom:'15px' },
  containerTempo:{ display:'flex', gap:'15px', marginBottom:'20px' },
  campoTempo:    { display:'flex', alignItems:'center', flex:1, gap:'8px', border:'1px solid #ccc', borderRadius:'6px', padding:'5px 10px' },
  inputTempo:    { width:'100%', border:'none', outline:'none', fontSize:'16px', textAlign:'right' },
  labelTempo:    { fontSize:'14px', color:'#555', whiteSpace:'nowrap' },
  adicionarbotao:{ backgroundColor:'#318e6f', color:'white', padding:'12px', borderRadius:'6px', border:'none', fontWeight:'bold', cursor:'pointer', width:'100%' },
  fecharbotao:   { background:'none', border:'none', fontSize:'24px', cursor:'pointer' },
  tituloModal:   { color:'black', margin:0, fontWeight:'bold' },
};

export default Modal;
