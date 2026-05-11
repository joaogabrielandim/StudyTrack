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

          <label>Duração da Sessão</label>
          <div style={styles.containerTempo}>
            <div style={styles.campoTempo}>
              <input type="number" placeholder="0" min="0" style={styles.inputTempo} />
              <span style={styles.labelTempo}>horas</span>
            </div>
            <div style={styles.campoTempo}>
              <input type="number" placeholder="0" min="0" max="59" style={styles.inputTempo} />
              <span style={styles.labelTempo}>min</span>
            </div>
          </div>

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
    zIndex: 1000,
  },
  
  modal: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    width: '450px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
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
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '15px',
  },

  containerTempo: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },

  campoTempo: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: '8px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '5px 10px',
  },

  inputTempo: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    textAlign: 'right',
  },

  

  adicionarbotao: {
    backgroundColor: '#000',
    color: 'white',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: 'bold',
  },

  fecharbotao: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
  },

  tituloModal: {
    color: 'black',
    margin: 0,
    fontWeight: 'bold',
  } 
};

export default Modal;