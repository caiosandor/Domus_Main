import React, { useState, useEffect } from "react";

// Importando os componentes isolados
import HeaderMain from "../components/HeaderMain";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSectionHome";
import PropertyCard from "../components/PropertyCardHome";

// Importando os estilos
import { 
  Main, Section, FilterSection, SectionTitle, Grid, 
  TagsGrid, NeighborhoodTag, EmptyMessage 
} from "../styles/HomeStyles";

const Home = () => {
  // Estados para gerenciar a lista de imóveis e o filtro atual
  const [todosImoveis, setTodosImoveis] = useState([]);
  const [filtroBairro, setFiltroBairro] = useState("Todos");

  // Mock de dados original (usado como fallback se não houver nada no localStorage)
  const destaquesMock = [
    { id: 1, tipo: "Casa", preco: "R$ 450.000", endereco: "Rua 35, Itaipuaçu", quartos: 3, banheiros: 2, vaga: 2, area: "120m²", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" },
    { id: 2, tipo: "Apartamento", preco: "R$ 280.000", endereco: "Centro, Maricá", quartos: 2, banheiros: 1, vaga: 1, area: "65m²", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80" },
    { id: 3, tipo: "Terreno", preco: "R$ 150.000", endereco: "Ponta Negra", quartos: "-", banheiros: "-", vaga: "-", area: "360m²", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" },
  ];

  // Assim que a Home carrega, ela busca os imóveis criados pelo anunciante
  useEffect(() => {
    const imoveisSalvos = JSON.parse(localStorage.getItem('domus_imoveis'));
    if (imoveisSalvos && imoveisSalvos.length > 0) {
      setTodosImoveis(imoveisSalvos);
    } else {
      setTodosImoveis(destaquesMock);
    }
  }, []);

  // Lógica de filtragem: Se "Todos" estiver marcado, mostra tudo. Senão, filtra pelo endereço.
  const imoveisFiltrados = filtroBairro === "Todos" 
    ? todosImoveis 
    : todosImoveis.filter(imovel => imovel.endereco.includes(filtroBairro));

  const bairrosPopulares = ["Itaipuaçu", "Centro", "Ponta Negra", "Araçatiba", "Inoã", "Cordeirinho", "Itapeba"];

  return (
    <>
      <HeaderMain />
      <Main>
        
        <HeroSection />

        <Section>
          <SectionTitle>Imóveis em Destaque</SectionTitle>
          
          {imoveisFiltrados.length === 0 ? (
            <EmptyMessage>Nenhum imóvel encontrado nesta região.</EmptyMessage>
          ) : (
            <Grid>
              {imoveisFiltrados.map((imovel) => (
                <PropertyCard key={imovel.id} imovel={imovel} />
              ))}
            </Grid>
          )}
        </Section>

        <FilterSection>
          <SectionTitle>Busque pelos bairros mais procurados</SectionTitle>
          <TagsGrid>
            
            {/* Botão para limpar o filtro */}
            <NeighborhoodTag 
              $active={filtroBairro === "Todos"} 
              onClick={() => setFiltroBairro("Todos")}
            >
              Todos
            </NeighborhoodTag>

            {/* Renderização dos botões de bairro com clique funcionando */}
            {bairrosPopulares.map((bairro) => (
              <NeighborhoodTag 
                key={bairro}
                $active={filtroBairro === bairro}
                onClick={() => setFiltroBairro(bairro)}
              >
                {bairro}
              </NeighborhoodTag>
            ))}
          </TagsGrid>
        </FilterSection>

      </Main>
      <Footer />
    </>
  );
};

export default Home;