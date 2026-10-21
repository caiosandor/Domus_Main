import React from 'react';

export default function Passo2Detalhes({ avancar, voltar }) {
  return (
    <div>
      <h3>Passo 2: Detalhes estruturais (Quartos, m²)</h3>
      <button onClick={voltar}>Voltar</button>
      <button onClick={avancar}>Avançar</button>
    </div>
  );
}