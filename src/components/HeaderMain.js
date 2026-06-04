import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Importação da logo
import logoImg from "../assets/images/Logo.png";

// 1. CRIANDO O BOTÃO DE LOGIN ESTILIZADO
const LoginButton = styled(Link)`
    background-color: #0056b3;
    color: white !important;
    text-decoration: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #004494;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

// 2. COMPONENTE DE ESTILO PRINCIPAL
const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fffde9;
    background-color: #1a1a1a;
    padding: 10px 40px;
    box-shadow: 0px 4px 4px #00000040;

    .navbar-left {
        display: flex;
        align-items: center;
        gap: 15px;

        .logo {
            height: 40px;
        }

        .site-name a {
            color: #fffde9;
            text-decoration: none;
            font-size: 20px;
            font-weight: bold;
        }
    }

    .navbar-right {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .nav-links {
        display: flex;
        gap: 15px;

        a {
            color: #fffde9;
            text-decoration: none;
            transition: color 0.3s;

            &:hover {
                color: #0056b3;
            }
        }
    }

    .menu-toggle {
        cursor: pointer;
        font-size: 24px;
        display: none;
    }

    .mobile-menu {
        display: none;
    }

    @media (max-width: 860px) {
        .nav-links, .login-button-desktop {
            display: none;
        }
        .menu-toggle {
            display: block;
        }
    }
`;

// 3. O COMPONENTE RENDERIZADO
const Header = () => {
    return (
        <StyledHeader>
            <div className="navbar-left">
                <Link to='/home'><img src={logoImg} alt="Logo" className="logo" /></Link>
                <span className="site-name"><Link to='/home'>Domus Laguna</Link></span>
            </div>

            <nav className="navbar-right">
                <div className="nav-links">
                    <a href="#alugar">Alugar</a>
                    <a href="#comprar">Comprar</a>
                    <a href="#anunciar">Anunciar</a>
                    <a href="#preco">Preço</a>
                    <a href="#links">Links úteis</a>
                    <Link to="/favoritos">Favoritos</Link>
                    <a href="#ajuda">Ajuda</a>
                </div>
                
                <LoginButton to='/login' className="login-button-desktop">
                    Entrar
                </LoginButton>

                <div className="menu-toggle" id="menu-toggle">☰</div>
            </nav>

            <div className="mobile-menu" id="mobile-menu">
                <a href="#alugar">Alugar</a>
                <a href="#comprar">Comprar</a>
                <a href="#anunciar">Anunciar</a>
                <a href="#preco">Preço</a>
                <a href="#links">Links úteis</a>
                <Link to="/favoritos">Favoritos</Link>
                <a href="#ajuda">Ajuda</a>
                <div className="login-button"><Link to='/login'>Entrar</Link></div>
            </div>
        </StyledHeader>
    );
};

export default Header;