import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCardHome";

// Importação correta dos estilos profissionais que acabamos de atualizar
import {
  DashboardContainer, Sidebar, SidebarItem, MainContent,
  HeaderArea, Title, StatsGrid, StatCard, SectionTitle, ActionButton
} from "../styles/DashboardStyles";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeMenu, setActiveMenu] = useState("resumo");

  // Lógica de proteção da rota e sessão local
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem('domus_usuarioAtual'));
    
    if (!usuarioLogado) {
      navigate('/login'); 
    } else {
      setUserData(usuarioLogado);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('domus_usuarioAtual');
    navigate('/login');
  };

  // Mocks de dados (Simulação de banco de dados)
  const compradorImoveis = [
    { id: 1, tipo: "Casa", preco: "R$ 450.000", endereco: "Rua 35, Itaipuaçu", quartos: 3, banheiros: 2, vaga: 2, area: "120m²", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
    { id: 2, tipo: "Apartamento", preco: "R$ 280.000", endereco: "Centro, Maricá", quartos: 2, banheiros: 1, vaga: 1, area: "65m²", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" }
  ];

  const meusAnuncios = [
    { id: 3, tipo: "Terreno", preco: "R$ 150.000", endereco: "Ponta Negra", quartos: "-", banheiros: "-", vaga: "-", area: "360m²", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" }
  ];

  if (!userData) return null; 

  // --- RENDERS CONDICIONAIS (Comprador vs Anunciante) ---
  
  const renderCompradorContent = () => (
    <>
      <HeaderArea>
        <Title>Olá, {userData.nome}!</Title>
      </HeaderArea>

      <StatsGrid>
        <StatCard>
          <h4>Imóveis Favoritos</h4>
          <p>12</p>
        </StatCard>
        <StatCard style={{ borderLeftColor: '#ffc107' }}>
          <h4>Visitas Agendadas</h4>
          <p>2</p>
        </StatCard>
        <StatCard style={{ borderLeftColor: '#17a2b8' }}>
          <h4>Propostas Ativas</h4>
          <p>1</p>
        </StatCard>
      </StatsGrid>

      <SectionTitle>Recomendações baseadas nas suas buscas</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {compradorImoveis.map(imovel => (
          <PropertyCard key={imovel.id} imovel={imovel} />
        ))}
      </div>
    </>
  );

  const renderAnuncianteContent = () => (
    <>
      <HeaderArea>
        <Title>Painel do Corretor</Title>
        <ActionButton onClick={() => alert("Abrir formulário de novo anúncio!")}>
          + Novo Anúncio
        </ActionButton>
      </HeaderArea>

      <StatsGrid>
        <StatCard style={{ borderLeftColor: '#28a745' }}>
          <h4>Anúncios Ativos</h4>
          <p>4</p>
        </StatCard>
        <StatCard style={{ borderLeftColor: '#ffc107' }}>
          <h4>Visualizações na Semana</h4>
          <p>342</p>
        </StatCard>
        <StatCard style={{ borderLeftColor: '#17a2b8' }}>
          <h4>Novos Contatos</h4>
          <p>8</p>
        </StatCard>
      </StatsGrid>

      <SectionTitle>Meus Imóveis Publicados</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {meusAnuncios.map(imovel => (
          <PropertyCard key={imovel.id} imovel={imovel} />
        ))}
      </div>
    </>
  );

  return (
    <>
      <HeaderMain />
      {/* Container principal que cria o layout flexbox */}
      <DashboardContainer>
        
        {/* BARRA LATERAL (MENU) */}
        <Sidebar>
          <div style={{ padding: '0 30px 25px', fontSize: '0.8rem', color: '#666', borderBottom: '1px solid #333', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Domus Laguna / Painel
          </div>
          
          <SidebarItem $active={activeMenu === "resumo"} onClick={() => setActiveMenu("resumo")}>
            Resumo Geral
          </SidebarItem>
          
          {userData.tipoUsuario === "comprador" ? (
            <>
              <SidebarItem $active={activeMenu === "favoritos"} onClick={() => setActiveMenu("favoritos")}>Meus Favoritos</SidebarItem>
              <SidebarItem $active={activeMenu === "visitas"} onClick={() => setActiveMenu("visitas")}>Minhas Visitas</SidebarItem>
            </>
          ) : (
            <>
              <SidebarItem $active={activeMenu === "anuncios"} onClick={() => setActiveMenu("anuncios")}>Meus Anúncios</SidebarItem>
              <SidebarItem $active={activeMenu === "leads"} onClick={() => setActiveMenu("leads")}>Mensagens (Leads)</SidebarItem>
            </>
          )}
          
          <SidebarItem $active={activeMenu === "config"} onClick={() => setActiveMenu("config")}>
            Configurações
          </SidebarItem>

          <div style={{ flex: 1 }}></div> {/* Empurra o botão de sair para baixo */}
          
          <SidebarItem onClick={handleLogout} style={{ color: '#ff6b6b', marginTop: 'auto', borderLeftColor: 'transparent' }}>
            Sair da Conta
          </SidebarItem>
        </Sidebar>

        {/* ÁREA PRINCIPAL DE CONTEÚDO */}
        <MainContent>
          {userData.tipoUsuario === "comprador" ? renderCompradorContent() : renderAnuncianteContent()}
        </MainContent>

      </DashboardContainer>
      <Footer />
    </>
  );
};

export default Dashboard;