import React, { useState } from 'react';
import './Cad_Produto.css';

export default function Cad_Produto() {
  const [formData, setFormData] = useState({
    nome: '',
    quantidade:'',
    descricao: '',
    validade: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:5000/cadProduto', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Sucesso ao cadastrar");
      } else {
        alert(data.message || "Erro ao cadastrar");
      }

    } catch (error) {
      console.error("Erro ao cadastrar", error);
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div className="container">
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <input 
        type='number' 
        placeholder='Quantidade' 
        name='quantidade' 
        value={formData.quantidade} 
        onChange={handleChange}/>

        <textarea name='descricao' placeholder='Descrição' value={formData.descricao} onChange={handleChange} size='6'/>

        <input
          type="Date"
          name="validade"
          placeholder="Validade"
          value={formData.validade}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
