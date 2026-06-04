import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Importado para linkar o botão de anunciar

// --- ESTILOS ---

const HeroContainer = styled.section`
  width: 100%;
  height: 60vh;
  min-height: 450px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80') center/cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

// Container principal da área de interação
const InteractiveArea = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

// Área das Abas
const TabsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  /* Se a aba estiver ativa, fica branca. Se não, fica translúcida */
  background-color: ${(props) => (props.active ? "white" : "rgba(0, 0, 0, 0.6)")};
  color: ${(props) => (props.active ? "#333" : "white")};
  border: none;
  border-radius: 8px 8px 0 0; /* Arredonda só em cima */
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "white" : "rgba(0, 0, 0, 0.8)")};
  }
`;

// Caixa Branca que muda de conteúdo
const ContentBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 0 8px 8px 8px; /* Arredonda todos os cantos menos o topo esquerdo */
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  display: flex;
  gap: 15px;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 8px; /* No celular fica melhor todo arredondado */
  }
`;

// Elementos do Formulário de Busca
const Select = styled.select`
  flex: 1;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  width: 100%;
`;

const Input = styled.input`
  flex: 2;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0056b3;
  }
`;

const Button = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: #004494;
  }
`;

// Estilos específicos para a aba de anunciar
const AnnounceMessage = styled.div`
  flex: 2;
  text-align: left;
  color: #333;

  h3 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

// --- COMPONENTE ---

const HeroSection = () => {
  // Estado que controla qual aba está aberta ('comprar', 'alugar' ou 'anunciar')
  const [activeTab, setActiveTab] = useState("comprar");
  
  // Estados da busca
  const [propertyType, setPropertyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Buscando por:", { 
      transacao: activeTab, // Usa a aba ativa como tipo de transação!
      tipo: propertyType, 
      busca: searchQuery 
    });
  };

  return (
    <HeroContainer>
      <HeroTitle>Encontre o imóvel dos seus sonhos</HeroTitle>
      <HeroSubtitle>As melhores oportunidades em Maricá e região</HeroSubtitle>
      
      <InteractiveArea>
        {/* ABAS */}
        <TabsContainer>
          <Tab 
            active={activeTab === "comprar"} 
            onClick={() => setActiveTab("comprar")}
          >
            Comprar
          </Tab>
          <Tab 
            active={activeTab === "alugar"} 
            onClick={() => setActiveTab("alugar")}
          >
            Alugar
          </Tab>
          <Tab 
            active={activeTab === "anunciar"} 
            onClick={() => setActiveTab("anunciar")}
          >
            Anunciar
          </Tab>
        </TabsContainer>

        {/* CAIXA DE CONTEÚDO DINÂMICA */}
        <ContentBox>
          {/* Se a aba for Comprar OU Alugar, mostra os filtros de busca */}
          {(activeTab === "comprar" || activeTab === "alugar") && (
            <>
              <Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Tipo de Imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
                <option value="comercial">Comercial</option>
              </Select>
              <Input 
                type="text" 
                placeholder="Digite o bairro (ex: Itaipuaçu, Centro...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>Buscar</Button>
            </>
          )}

          {/* Se a aba for Anunciar, muda toda a caixa branca */}
          {activeTab === "anunciar" && (
            <>
              <AnnounceMessage>
                <h3>Quer vender ou alugar rápido?</h3>
                <p>Anuncie seu imóvel no Domus Laguna e alcance milhares de interessados na região de Maricá.</p>
              </AnnounceMessage>
              <Link to="/register" style={{ textDecoration: 'none', width: '100%', maxWidth: '200px' }}>
                <Button fullWidth style={{ backgroundColor: "#28a745" }}>
                  Começar agora
                </Button>
              </Link>
            </>
          )}
        </ContentBox>
      </InteractiveArea>
    </HeroContainer>
  );
};

export default HeroSection;