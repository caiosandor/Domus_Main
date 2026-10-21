import React from 'react';

export default function Passo3Diferenciais({ avancar, voltar }) {
  return (
    <div>
      <h3>Passo 3: Diferenciais (Piscina, Condomínio, etc)</h3>
      <button onClick={voltar}>Voltar</button>
      <button onClick={avancar}>Avançar</button>
    </div>
  );
}