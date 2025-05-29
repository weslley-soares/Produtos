import React, {useState} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './nav.css';


export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

  return (
    <div>
        <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
            <a href='/'>Home</a>
            <a href="/produto">Produtos</a>
            <a href="/cad">Cadastrar Produto</a>
        </nav>
    </div>
  );
}