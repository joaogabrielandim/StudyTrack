import React, { useState } from 'react'; // useState faltava
import api from "../services/api";

const Modal2 = ({ isOpen2, onClose2 }) => {
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [prioridade, setPrioridade] = useState("Média"); // valor inicial

  if (!isOpen2) return null; // deve vir DEPOIS dos hooks

  const handleSubmit = async () => {
    try {
      await api.post("/salvar", {
        titulo,
        materia,
        prioridade,
      });

      // Limpar campos e fechar modal após salvar
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
          <label>Titulo da Tarefa</label>
          <input 
            type="text" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)} // onChange faltava
            style={styles2.input} 
          />
          
          <label>Matéria</label>
          <input 
            type="text"
            value={materia}
            onChange={(e) => setMateria(e.target.value)} // onChange faltava
            style={styles2.input} 
          />

          <label>Nivel de Prioridade</label>
          <select 
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)} // onChange faltava
            style={styles2.input}
          >
            <option>Média</option>
            <option>Alta</option>
            <option>Baixa</option>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  modal: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    width: '450px',
    boxShadow: '0 4px 15px',
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
    gap: '10px',
  },

  input: {
    width: '90%',
    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid',
    marginBottom: '15px',
  },

  adicionarbotao: {
    backgroundColor: '#000',
    color: 'white',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },

  fecharbotao: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
  },

  tituloModal: {
  color: 'black',
  margin: 0,
  } 
};

export default Modal2;