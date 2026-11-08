import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HeaderContainer, LogoArea, NavMenu, NavItem, LoginButton, HamburgerIcon 
} from '../styles/HeaderStyles';

const HeaderMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);
  
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('domus_usuarioAtual');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    } else {
      setUsuario(null);
    }
  }, [location]);

  useEffect(() => {
    setMenuAberto(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('domus_usuarioAtual');
    setUsuario(null);
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LogoArea to="/">
        <img src="/Logo.png" alt="Logo" onError={(e) => e.target.style.display = 'none'} />
        <h1>Domus Laguna</h1>
      </LogoArea>

      <HamburgerIcon onClick={() => setMenuAberto(!menuAberto)}>
        {menuAberto ? '✖' : '☰'}
      </HamburgerIcon>

      {/* mantem o html antigo */}
      <NavMenu isOpen={menuAberto}>
        <NavItem onClick={() => navigate('/')}>Início</NavItem>
        <NavItem onClick={() => navigate('/#alugar')}>Alugar</NavItem>
        <NavItem onClick={() => navigate('/#comprar')}>Comprar</NavItem>
        <NavItem onClick={() => navigate('/#precos')}>Preço</NavItem>
        
        <NavItem onClick={() => navigate('/suporte')}>Ajuda</NavItem>

        <NavItem 
          onClick={() => navigate('/avaliar-imovel')}
          style={{ color: '#ff6b6b', fontWeight: 'bold' }}
        >
          Avaliar Imóvel
        </NavItem>

        {usuario ? (
          <>
            <NavItem onClick={() => navigate('/dashboard')}>
              Olá, {usuario.nome ? usuario.nome.split(' ')[0] : 'Usuário'}
            </NavItem>
            <LoginButton logout onClick={handleLogout}>
              Sair
            </LoginButton>
          </>
        ) : (
          <LoginButton onClick={() => navigate('/login')}>
            Entrar
          </LoginButton>
        )}
      </NavMenu>
    </HeaderContainer>
  );
};

export default HeaderMain;