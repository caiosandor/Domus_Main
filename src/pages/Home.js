import React from "react";
import styled from "styled-components";

// Importando os componentes isolados
import HeaderMain from "../components/HeaderMain";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSectionHome";
import PropertyCard from "../components/PropertyCardHome";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f8f9fa;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 60px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const NeighborhoodTag = styled.div`
  background: #0056b3;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const Home = () => {
  // Mocks de dados (simulando retorno do banco de dados)
  const destaques = [
    { id: 1, tipo: "Casa", preco: "R$ 450.000", endereco: "Rua 35, Itaipuaçu", quartos: 3, banheiros: 2, vaga: 2, area: "120m²", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
    { id: 2, tipo: "Apartamento", preco: "R$ 280.000", endereco: "Centro, Maricá", quartos: 2, banheiros: 1, vaga: 1, area: "65m²", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" },
    { id: 3, tipo: "Terreno", preco: "R$ 150.000", endereco: "Ponta Negra", quartos: "-", banheiros: "-", vaga: "-", area: "360m²", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" },
  ];

  const bairrosPopulares = ["Itaipuaçu", "Centro", "Ponta Negra", "Araçatiba", "Inoã", "Cordeirinho"];

  return (
    <>
      <HeaderMain />
      <Main>
        
        {/* Componente isolado da Busca */}
        <HeroSection />

        <Section>
          <SectionTitle>Imóveis em Destaque</SectionTitle>
          <Grid>
            {/* Renderizando o componente isolado do Card usando .map */}
            {destaques.map((imovel) => (
              <PropertyCard key={imovel.id} imovel={imovel} />
            ))}
          </Grid>
        </Section>

        <Section style={{ backgroundColor: "white", borderRadius: "8px", padding: "40px 20px", marginBottom: "40px" }}>
          <SectionTitle>Busque pelos bairros mais procurados</SectionTitle>
          <Grid style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
            {bairrosPopulares.map((bairro) => (
              <NeighborhoodTag key={bairro}>
                {bairro}
              </NeighborhoodTag>
            ))}
          </Grid>
        </Section>

      </Main>
      <Footer />
    </>
  );
};

export default Home;