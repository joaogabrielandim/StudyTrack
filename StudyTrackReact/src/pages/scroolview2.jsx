import React from 'react';

const Modal2 = ({ isOpen2, onClose2 }) => {
  if (!isOpen2) return null; 

  return (
    <div style={styles2.overlay}>
      <div style={styles2.modal}>
        <div style={styles2.header}>
          <h2 style={styles2.tituloModal}>Nova Tarefa</h2>
          <button onClick={onClose2} style={styles2.fecharbotao}>&times;</button>
        </div>
        
        <form style={styles2.form}>
          <label>Titulo da Tarefa</label>
          <input type="text" style={styles2.input} />
          
          <label>Matéria</label>
          <select style={styles2.input}>
            <option>Selecione uma matéria</option>
            <option>Matemática</option>
            <option>Programação</option>
          </select>

          <label>Nivel de Prioridade</label>
          <select style={styles2.input}>
            <option>Média</option>
            <option>Alta</option>
            <option>Baixa</option>
          </select>

          <button type="button" style={styles2.adicionarbotao}>Adicionar Tarefa</button>
        </form>
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