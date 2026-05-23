import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ── IMPORTANTE: onAdicionarSessao agora recebe a sessão salva e dispara
// o recarregarStats no componente pai (App ou index), que é passado para
// o hook Homejs, fazendo os gráficos atualizarem automaticamente.

const Modal = ({ isOpen, onClose, onAdicionarSessao }) => {
  const [tempoEstudo, setTempoEstudo] = useState('');
  const [materia, setMateria] = useState('Selecione uma matéria');
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [salvando, setSalvando] = useState(false);

  if (!isOpen) return null;

  const handleAdicionar = async () => {
    if (!tempoEstudo.trim() || materia === 'Selecione uma matéria') return;

    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.error('Usuário não autenticado');
      return;
    }

    setSalvando(true);

    const novaSessao = {
      tempoEstudo,
      materia,
      horas: Number(horas),
      minutos: Number(minutos),
      criadoEm: Timestamp.now(),
      uid, // ← campo necessário para filtrar por usuário nos gráficos
    };

    try {
      const docRef = await addDoc(collection(db, 'sessoes'), novaSessao);
      // Passa a sessão completa com id para o pai atualizar a lista e os gráficos
      onAdicionarSessao({ id: docRef.id, ...novaSessao });
    } catch (err) {
      console.error('Erro ao salvar sessão:', err);
    } finally {
      setSalvando(false);
    }

    setTempoEstudo('');
    setMateria('Selecione uma matéria');
    setHoras(0);
    setMinutos(0);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.tituloModal}>Nova Sessão</h2>
          <button onClick={onClose} style={styles.fecharbotao}>&times;</button>
        </div>

        <div style={styles.form}>
          <label>Tempo de Estudo</label>
          <input
            type="text"
            style={styles.input}
            value={tempoEstudo}
            onChange={(e) => setTempoEstudo(e.target.value)}
            placeholder="Ex: Revisão de cálculo"
          />

          <label>Matéria</label>
          <select
            style={styles.input}
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
          >
            <option>Selecione uma matéria</option>
            <option>Matemática</option>
            <option>Programação</option>
            <option>Física</option>
            <option>Química</option>
            <option>Português</option>
            <option>História</option>
            <option>Geografia</option>
            <option>Inglês</option>
            <option>Outra</option>
          </select>

          <label>Duração da Sessão</label>
          <div style={styles.containerTempo}>
            <div style={styles.campoTempo}>
              <input
                type="number"
                placeholder="0"
                min="0"
                style={styles.inputTempo}
                value={horas}
                onChange={(e) => setHoras(e.target.value)}
              />
              <span style={styles.labelTempo}>horas</span>
            </div>
            <div style={styles.campoTempo}>
              <input
                type="number"
                placeholder="0"
                min="0"
                max="59"
                style={styles.inputTempo}
                value={minutos}
                onChange={(e) => setMinutos(e.target.value)}
              />
              <span style={styles.labelTempo}>min</span>
            </div>
          </div>

          <button
            type="button"
            style={{ ...styles.adicionarbotao, opacity: salvando ? 0.6 : 1 }}
            onClick={handleAdicionar}
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Adicionar Sessão'}
          </button>
        </div>
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
  labelTempo: {
    fontSize: '14px',
    color: '#6b7280',
    whiteSpace: 'nowrap',
  },
  adicionarbotao: {
    backgroundColor: '#000',
    color: 'white',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  fecharbotao: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  tituloModal: {
    color: 'black',
    margin: 0,
    fontWeight: 'bold',
  },
};

export default Modal;