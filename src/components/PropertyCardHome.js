import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // 1. Importamos o Link do React Router

// --- ESTILOS ---
// 2. Mudamos de styled.div para styled(Link). 
// Isso transforma o card inteiro em um link clicável sem quebrar o visual.
const Card = styled(Link)`
  display: block; /* Mantém o comportamento de bloco que a div tinha */
  text-decoration: none; /* Remove aquele sublinhado azul padrão de links */
  color: inherit; /* Garante que os textos não fiquem azuis de link */
  
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const Price = styled.h3`
  font-size: 1.5rem;
  color: #0056b3;
  margin: 0 0 10px 0;
`;

const PropertyType = styled.span`
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #555;
  font-weight: bold;
`;

const Address = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 10px 0;
`;

const Features = styled.div`
  display: flex;
  gap: 15px;
  color: #555;
  font-size: 0.9rem;
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
`;

// --- COMPONENTE ---
const PropertyCard = (props) => {
  // A MÁGICA AQUI: Ele aceita os dados chegando como 'imovel' (novo) ou 'property' (antigo)
  const dados = props.imovel || props.property || props.data;

  // Trava de segurança: se não vier nada, ele esconde o card em vez de quebrar o site
  if (!dados) return null;

  // Pegamos o ID do imóvel vindo dos dados. Se não tiver ID ainda, usamos '1' como fallback para testes
  const idDoImovel = dados.id || 1;

  return (
    // 3. Adicionamos a propriedade "to", que aponta para a rota que criamos no App.js
    <Card to={`/imovel/${idDoImovel}`}>
      {/* Busca "img" ou "image" para nunca dar erro de undefined */}
      <CardImage src={dados.img || dados.image} alt={dados.tipo || "Imóvel"} />
      
      <CardContent>
        <PropertyType>{dados.tipo || dados.type}</PropertyType>
        <Price>{dados.preco || dados.price}</Price>
        <Address>{dados.endereco || dados.address}</Address>
        
        <Features>
          <span>🛏️ {dados.quartos || dados.bedrooms || 0} qts</span>
          <span>🚿 {dados.banheiros || dados.bathrooms || 0} banh</span>
          <span>🚗 {dados.vaga || dados.parking || 0} vagas</span>
          <span>📐 {dados.area}</span>
        </Features>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;