import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa';
import './perfil.css';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [menuOpen2, setMenuOpen2] = useState(false);

  const toggleMenu2 = () => {
    setMenuOpen2(!menuOpen2);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://127.0.0.1:5000/perfil', {
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao localizar perfil');
        return res.json();
      })
      .then(resultado => setUsuario(resultado))
      .catch(() => {
        // Remove token inválido e limpa usuário
        localStorage.removeItem('token');
        setUsuario(null);
        
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Saindo...');
    setUsuario(null);
    setMenuOpen2(false);
  };

  return (
    <div id='perfil'>
      {usuario ? (
        <div className="conteiner">
          {/* Ícone do usuário que abre/fecha o menu */}
          <button className="menu-toggle2" onClick={toggleMenu2}>
            {menuOpen2 ? <FaTimes size={24} /> : <FaUserCircle size={24} />}
          </button>

          {/* Menu com dados do usuário */}
          {menuOpen2 && (
            <div id='card' className="menu2">
              <h3>Perfil</h3>
              <table id='table'>
                <tr>
                  <th>Nome</th>
                  <td>{usuario.nome}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{usuario.email}</td>
                </tr>
              </table>

              <div id='logout'>
                <button onClick={handleLogout} className='autenticar'>
                <a href='/login'>Sair</a>
              </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Quando não está logado, mostra login/cadastro
        <div className='autenticar'>
          <a href="/login">Login</a> / <a href="/cadastro">Cadastro</a>
        </div>
      )}
    </div>
  );
}