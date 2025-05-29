import React, { useState, useEffect } from 'react';
import './produto.css';

export default function Produto() {
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const url = new URL('http://127.0.0.1:5000/produto');
    if (busca.trim() !== '') {
      url.searchParams.append('busca', busca);
    }

    setCarregando(true);

    fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        if (!res.ok) {
          console.error("Erro ao buscar produtos");
          return [];
        }
        return res.json();
      })
      .then(resultado => {
        setProduto(resultado);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error('Erro ao conectar com o servidor', erro);
        setCarregando(false);
      });
  }, [busca]);

  return (
    <div className="container">
      <h1>Lista de Produtos</h1>

      <input
        type="text"
        placeholder="Buscar produto por nome, descrição, data..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="input-busca"
      />
      <div id='tabela'>
      {carregando ? (
        <p>Carregando produtos...</p>
      ) : produto.length > 0 ? (
        produto.map((p, index) => (
          <table key={index}>
            <tbody>
              <tr>
                <th>Nome</th>
                <td>{p.nome_produto}</td>
              </tr>
              <tr>
                <th>Descrição</th>
                <td>{p.descricao}</td>
              </tr>
              <tr>
                <th>Validade</th>
                <td>{p.dt_validade}</td>
              </tr>
              <tr>
                <th>Data Adicionado</th>
                <td>{p.dt_adicionado}</td>
              </tr>
              <tr>
                <th>Quantidade</th>
                <td>{p.quantidade}</td>
              </tr>
            </tbody>
          </table>
        ))
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
      </div>
    </div>
  );
}