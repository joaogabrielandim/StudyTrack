import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.tituloModal}>Nova Sessão</h2>
          <button onClick={onClose} style={styles.fecharbotao}>&times;</button>
        </div>
        
        <form style={styles.form}>
          <label>Tempo de Estudo</label>
          <input type="text" style={styles.input} />
          
          <label>Matéria</label>
          <select style={styles.input}>
            <option>Selecione uma matéria</option>
            <option>Matemática</option>
            <option>Programação</option>
          </select>

          <label>Nivel de Foco</label>
          <select style={styles.input}>
            <option>Médio</option>
            <option>Alto</option>
            <option>Baixo</option>
          </select>

          <button type="button" style={styles.adicionarbotao}>Adicionar Sessão</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
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

export default Modal;