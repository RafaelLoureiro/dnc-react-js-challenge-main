import React, { useState } from 'react';
import "./index.scss";
import deleteItem from "../../assets/ic_round-delete.svg";
import editeItem from "../../assets/material-symbols_edit.svg";
import { Modal } from 'react-bootstrap';

const Tabella = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalExclusaoVisivel, setIsModalExclusaoVisivel] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [formularioEdicao, setFormularioEdicao] = useState({
    id: null,
    description: "",
    completed: false,
  });

  const [tarefasLista, setTarefasLista] = useState([
    {
      id: 1,
      title: "Exercicios",
      description: "Ir para academia fazer exercicios",
      completed: true,
    },
    {
      id: 2,
      title: "Limpar o carro",
      description: "Limpar o carro inteiro, de dentro pra fora",
      completed: false,
    },
    {
      id: 3,
      title: "Banho e tosa",
      description: "Levar o cachorro ao pet shop",
      completed: true,
    },
  ]);

  const [novaTarefaDescricao, setNovaTarefaDescricao] = useState("");
  const [exibindoInputNovaTarefa, setExibindoInputNovaTarefa] = useState(false);

  const handleEditarTarefa = (tarefa) => {
    setTarefaEditando(tarefa);
    setFormularioEdicao({
      id: tarefa.id,
      description: tarefa.description,
      completed: tarefa.completed,
    });
    setIsModalVisible(true);
  };
  const handleExcluirTarefaMoodal = (tarefaId) => {
    setTarefaEditando(tarefaId);
    setIsModalExclusaoVisivel(true);
  };


  const handleExcluirTarefa = (tarefaId) => {
    setTarefasLista((prevTarefas) =>
      prevTarefas.filter((tarefa) => tarefa.id !== tarefaId)
    );
    setIsModalExclusaoVisivel(false);
    setTarefaEditando(null);
  };


  const handleCancelarEdicaoTarefa = () => {
    setTarefaEditando(null);
    setIsModalVisible(false);
    setIsModalExclusaoVisivel(false);
  };
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormularioEdicao((prevFormulario) => ({
      ...prevFormulario,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const novaLista = tarefasLista.map((tarefa) => {
      if (tarefa.id === formularioEdicao.id) {
        return {
          ...tarefa,
          description: formularioEdicao.description,
          completed: formularioEdicao.completed,
        };
      }
      return tarefa;
    });
    setTarefasLista(novaLista);
    setTarefaEditando(null);
    setFormularioEdicao({
      id: null,
      description: "",
      completed: false,
    });
  };

  const handleNovaTarefaDescricaoChange = (event) => {
    setNovaTarefaDescricao(event.target.value);
  };

  const handleExibirInputNovaTarefa = () => {
    setExibindoInputNovaTarefa(true);
  };

  const handleAdicionarTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      title: "",
      description: novaTarefaDescricao,
      completed: false,
    };
    setTarefasLista((prevTarefas) => [...prevTarefas, novaTarefa]);
    setNovaTarefaDescricao("");
    setExibindoInputNovaTarefa(false);
  };

  const handleModalCancelar = () => {
    setIsModalVisible(false);
  };

  const handleModalSim = () => {
    handleFormSubmit();
    handleEditarTarefa(tarefaEditando);
    setIsModalVisible(false);
  };

  return (
    <div className='conteudoTotal'>
      <Modal className='box-Modal-1' show={isModalVisible} onHide={handleModalCancelar}>
        <Modal.Body>
          <h2>Deseja editar a tarefa?</h2>
          <p>Colocar as descrições das tarefas aqui.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='bt-Sim' onClick={handleCancelarEdicaoTarefa}>Cancelar</button>
          <button className='bt-Sim' onClick={handleModalCancelar}>Sim</button>
        </Modal.Footer>
      </Modal>
      <Modal className='box-Modal-1' show={isModalExclusaoVisivel} onHide={handleCancelarEdicaoTarefa}>
        <Modal.Body>
          <h2>Deseja realmente excluir a tarefa?</h2>
          <p>Colocar as descrições das tarefas aqui.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='bt-Sim' onClick={handleCancelarEdicaoTarefa}>Cancelar</button>
          <button className='bt-Sim' onClick={() => handleExcluirTarefa(tarefaEditando)}>Sim</button>
        </Modal.Footer>
      </Modal>


      <div>

        <table className="table-list-up">
          <thead className="table-list">
            <tr>
              <th>Tarefas</th>
              <th>Status</th>
              <th>Opções</th>
            </tr>

          </thead>

          <tbody className="table-list">
            {tarefasLista.map((tarefa) => (
              <tr key={tarefa.id} className="table-list">

                <td>
                  {tarefaEditando === tarefa ? (
                    <input
                      type="text"
                      name="description"
                      value={formularioEdicao.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tarefa.description
                  )}
                </td>
                <td>
                  {tarefaEditando === tarefa ? (
                    <input
                      type="checkbox"
                      name="completed"
                      checked={formularioEdicao.completed}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input type="checkbox" checked={tarefa.completed} readOnly />
                  )}
                </td>
                <td>
                  {tarefaEditando === tarefa ? (
                    <>
                      <button id='saveEdit' className='bt-Sim' onClick={handleFormSubmit}>Salvar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditarTarefa(tarefa)}>
                        <img src={editeItem} alt="editar" />
                      </button>
                      <button onClick={() => handleExcluirTarefaMoodal(tarefa.id)}>
                        <img src={deleteItem} alt="excluir" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {exibindoInputNovaTarefa ? (
              <tr>
                <td>
                  <input
                    type="text"
                    value={novaTarefaDescricao}
                    onChange={handleNovaTarefaDescricaoChange}
                  />
                </td>

                <td>
                  <button onClick={handleAdicionarTarefa}>+</button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="3" className="adicionar-tarefa">
                  <td>Adicionar nova tarefa...</td>

                  <td>
                    <button onClick={handleExibirInputNovaTarefa}>
                      +
                    </button>
                  </td>
                </td>
              </tr>
            )}
          </tbody>


        </table>
      </div>
    </div>
  );
};



export default Tabella;
