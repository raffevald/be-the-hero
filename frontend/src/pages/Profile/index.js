import React, {useEffect, useState} from 'react';
import logonimg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile(){
  const ongName = localStorage.getItem('ongName');
  const ongID = localStorage.getItem('ongId');
  const [insidents, setInsidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongID,
      }}).then(response => {
        setInsidents(response.data)
      })
  }, [ongID])

  async function handleDeleteInsidents(id){
    try { 
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongID, }
      });

      setInsidents(insidents.filter(insident => insident.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogaut(){
    localStorage.clear();

    history.push('/')
  }


  return (
    <div className="profile-container">
      <header>
        <img src={logonimg} alt="The be Hero"/>
        <span>Bem vida, {ongName}</span>
        <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link>
        <button onClick={handleLogaut} type="button">
          <FiPower size={18} color="#E02041"/> 
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {insidents.map(insident => (
          <li key={insident.id}>
          <strong>CASO:</strong>
          <p>{insident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{insident.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(insident.value)}</p>

          <button onClick={() => handleDeleteInsidents(insident.id)} type="button" size={20}>
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
