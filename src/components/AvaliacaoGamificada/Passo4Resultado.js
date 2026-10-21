import React, { useState } from 'react';

export default function Passo4Resultado({ dados, voltar }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const enviarParaBackend = async () => {
    if (!aceitouTermos) return;

    const payload = {
      ...dados,
      nome,
      telefone,
      consentimento_termos: true,
      data_consentimento: new Date().toISOString()
    };

    // Aqui você integrará com a sua rota do FastAPI futuramente
    console.log("Dados prontos para envio:", payload);
    alert("Dossiê enviado com sucesso! Verifique seu WhatsApp.");
  };

  return (
    <div className="resultado-container">
      <h2>O valor estimado do seu imóvel é...</h2>
      
      <div style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h1 style={{ filter: 'blur(6px)', margin: 0 }}>R$ 480.000,00</h1>
        <p style={{ fontSize: '14px', color: '#666' }}>Valor oculto para proteção comercial</p>
      </div>

      <p>Para desbloquear o valor exato e receber o dossiê completo de vendas na sua região, preencha abaixo:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Seu Nome" 
          onChange={e => setNome(e.target.value)} 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="tel" 
          placeholder="WhatsApp (DDD + Número)" 
          onChange={e => setTelefone(e.target.value)} 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', marginBottom: '20px' }}>
        <input 
          type="checkbox" 
          checked={aceitouTermos} 
          onChange={e => setAceitouTermos(e.target.checked)} 
          style={{ marginTop: '4px' }}
        />
        <span>
          Concordo em fornecer meu nome e contato para receber a estimativa detalhada e contato de corretores, conforme a <a href="/privacidade" target="_blank" rel="noreferrer">Política de Privacidade</a>.
        </span>
      </label>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={voltar}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Revisar Dados
        </button>
        <button 
          disabled={!aceitouTermos} 
          onClick={enviarParaBackend}
          style={{ 
            padding: '10px 20px', 
            cursor: aceitouTermos ? 'pointer' : 'not-allowed',
            backgroundColor: aceitouTermos ? '#0056b3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Descobrir Valor Exato
        </button>
      </div>
    </div>
  );
}