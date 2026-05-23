import React, { useState } from 'react';
import api from "../services/api";

const Modal2 = ({ isOpen2, onClose2, onAdicionar }) => {
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [prioridade, setPrioridade] = useState("Média");

  if (!isOpen2) return null;

  const handleSubmit = async () => {
    if (!titulo || !materia) {
        alert("Preencha todos os campos");
        return;
    }

    try {
      const novaTarefa = { titulo, materia, prioridade };
      
      
      await api.post("/salvar", novaTarefa);

      
      onAdicionar(novaTarefa);

      
      setTitulo("");
      setMateria("");
      setPrioridade("Média");
      onClose2();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };

  return (
    <div style={styles2.overlay}>
      <div style={styles2.modal}>
        <div style={styles2.header}>
          <h2 style={styles2.tituloModal}>Nova Tarefa</h2>
          <button onClick={onClose2} style={styles2.fecharbotao}>&times;</button>
        </div>
        <div style={styles2.form}>
          <label style={{fontWeight: '500'}}>Titulo da Tarefa</label>
          <input 
            type="text" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={styles2.input} 
          />
          <label style={{fontWeight: '500'}}>Matéria</label>
          <input 
            type="text"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            style={styles2.input} 
          />
          <label style={{fontWeight: '500'}}>Nivel de Prioridade</label>
          <select 
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            style={styles2.input}
          >
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
            <option value="Baixa">Baixa</option>
          </select>
          <button type="button" onClick={handleSubmit} style={styles2.adicionarbotao}>
            Adicionar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
};

const styles2 = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    width: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    fontSize: '14px'
  },
  adicionarbotao: {
    backgroundColor: '#000',
    color: 'white',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  fecharbotao: {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer'
  },
  tituloModal: {
    color: 'black',
    margin: 0,
    fontSize: '22px'
  } 
};

export default Modal2;