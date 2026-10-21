import React from 'react';

export default function Passo1Local({ avancar }) {
  return (
    <div>
      <h3>Passo 1: Onde fica o imóvel?</h3>
      <button onClick={avancar}>Avançar</button>
    </div>
  );
}