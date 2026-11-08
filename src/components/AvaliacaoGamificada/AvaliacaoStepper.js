import React, { useState, useEffect } from 'react';

// --- DADOS MOCKADOS (Com imagens mais coerentes e dados específicos) ---
const imoveisMock = [
  { id: 1, bairro: 'Ponta Negra', tipo: 'Casa de Luxo', quartos: 5, piscina: true, area: 350, imagem: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', valorReal: 1100000, opcoes: [950000, 1100000, 1250000, 1500000], destaques: ['Vista para o Mar 🌊', 'Acabamento Premium', 'Energia Solar ⚡'] },
  { id: 2, bairro: 'Itaipuaçu', tipo: 'Casa', quartos: 3, piscina: true, area: 180, imagem: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', valorReal: 650000, opcoes: [550000, 650000, 750000, 850000], destaques: ['Área Gourmet', 'Aceita Pet 🐕', 'Terreno 480m²'] },
  { id: 3, bairro: 'Centro', tipo: 'Apartamento', quartos: 2, piscina: false, area: 75, imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', valorReal: 320000, opcoes: [250000, 280000, 320000, 380000], destaques: ['Varanda Envidraçada', 'Vaga Coberta 🚗', 'Proibido som alto 🔇'] },
  { id: 4, bairro: 'Inoã', tipo: 'Duplex', quartos: 3, piscina: false, area: 130, imagem: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', valorReal: 480000, opcoes: [400000, 480000, 520000, 600000], destaques: ['Condomínio Fechado', 'Segurança 24h 🛡️', 'Parquinho'] },
  { id: 5, bairro: 'Cordeirinho', tipo: 'Casa', quartos: 2, piscina: true, area: 110, imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', valorReal: 420000, opcoes: [350000, 420000, 480000, 550000], destaques: ['Cozinha Americana', 'Aceita Financiamento 🏦'] },
  { id: 6, bairro: 'Itaipuaçu', tipo: 'Duplex', quartos: 4, piscina: true, area: 160, imagem: 'https://images.unsplash.com/photo-1605276374104-162f1f13ce3a?auto=format&fit=crop&w=800&q=80', valorReal: 720000, opcoes: [620000, 720000, 820000, 900000], destaques: ['Espaço Gourmet', 'Fino Acabamento ✨', 'Rua Asfaltada'] },
  { id: 7, bairro: 'Centro', tipo: 'Apartamento', quartos: 3, piscina: true, area: 95, imagem: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', valorReal: 450000, opcoes: [380000, 450000, 520000, 600000], destaques: ['Condomínio Clube 🎾', 'Andar Alto', 'Sol da Manhã ☀️'] },
  { id: 8, bairro: 'São José', tipo: 'Casa', quartos: 2, piscina: false, area: 85, imagem: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80', valorReal: 350000, opcoes: [280000, 350000, 410000, 480000], destaques: ['Ideal para Casal 👩‍❤️‍👨', 'Comércio Próximo', 'Aceita Pet 🐈'] }
];

export default function AvaliacaoStepper() {
  const [passo, setPasso] = useState(0); 
  const [nickname, setNickname] = useState('');
  const [estatisticasGlobais, setEstatisticasGlobais] = useState({ partidasJogadas: 0, acertosTotais: 0 });
  const [filtros, setFiltros] = useState({ bairro: '', tipo: '' });
  
  const [imoveisPartida, setImoveisPartida] = useState([]);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [acertosPartida, setAcertosPartida] = useState(0);
  
  // Novo estado para guardar o histórico de chutes da partida atual
  const [historicoPartida, setHistoricoPartida] = useState([]);
  
  // Estados de UI
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [jogoAvaliado, setJogoAvaliado] = useState(false);

  useEffect(() => {
    const nickSalvo = localStorage.getItem('domus_game_nick');
    const statsSalvas = localStorage.getItem('domus_game_stats');
    if (nickSalvo) {
      setNickname(nickSalvo);
      setPasso(1);
    }
    if (statsSalvas) setEstatisticasGlobais(JSON.parse(statsSalvas));
  }, []);

  const registrarNickname = () => {
    if (nickname.trim().length < 3) return alert("Seu nickname precisa ter pelo menos 3 letras.");
    localStorage.setItem('domus_game_nick', nickname);
    setPasso(1);
  };

  const iniciarJogo = () => {
    let preferenciais = imoveisMock.filter(i => (filtros.bairro ? i.bairro === filtros.bairro : true));
    if (filtros.tipo) preferenciais = preferenciais.filter(i => i.tipo.includes(filtros.tipo));
    
    preferenciais = preferenciais.sort(() => Math.random() - 0.5);
    let selecionados = [...preferenciais];
    
    if (selecionados.length < 5) {
      const idsJa = selecionados.map(p => p.id);
      const restantes = imoveisMock.filter(i => !idsJa.includes(i.id)).sort(() => Math.random() - 0.5);
      selecionados = [...selecionados, ...restantes].slice(0, 5);
    } else {
      selecionados = selecionados.slice(0, 5);
    }

    selecionados = selecionados.map(imovel => ({
      ...imovel,
      opcoes: [...imovel.opcoes].sort(() => Math.random() - 0.5)
    }));

    setImoveisPartida(selecionados);
    setHistoricoPartida([]);
    setRodadaAtual(1);
    setAcertosPartida(0);
    setJogoAvaliado(false);
    setRating(0);
    setPasso(2);
  };

  // Função modificada: Registra o chute e já pula para a próxima rodada
  const adivinharValor = (chute) => {
    const imovel = imoveisPartida[rodadaAtual - 1];
    const acertou = chute === imovel.valorReal;
    
    // Salva o resultado desta rodada para a tabela final
    setHistoricoPartida(prev => [...prev, { imovel, chute, valorReal: imovel.valorReal, acertou }]);
    
    if (acertou) setAcertosPartida(prev => prev + 1);

    if (rodadaAtual < 5) {
      setRodadaAtual(prev => prev + 1);
    } else {
      // Finaliza o jogo
      const novasStats = {
        partidasJogadas: estatisticasGlobais.partidasJogadas + 1,
        acertosTotais: estatisticasGlobais.acertosTotais + (acertou ? acertosPartida + 1 : acertosPartida)
      };
      setEstatisticasGlobais(novasStats);
      localStorage.setItem('domus_game_stats', JSON.stringify(novasStats));
      setPasso(3); // Vai direto para o placar
    }
  };

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);

  return (
    <div style={{ 
      maxWidth: '680px', 
      margin: '20px auto', 
      padding: '24px', 
      fontFamily: '"Inter", "Segoe UI", sans-serif', 
      backgroundColor: '#ffffff', 
      borderRadius: '20px', 
      boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
      border: '1px solid #E5E7EB'
    }}>
      
      {/* --- PASSO 0: NICKNAME --- */}
      {passo === 0 && (
        <div style={{ textAlign: 'center', padding: '20px 10px', animation: 'fadeIn 0.3s' }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>🏠</div>
          <h2 style={{ color: '#111827', fontSize: '32px', fontWeight: '900', marginBottom: '10px' }}>Desafio do Preço</h2>
          <p style={{ color: '#4B5563', fontSize: '18px', marginBottom: '30px' }}>Prove que você conhece o mercado de Maricá!</p>
          
          <input 
            type="text" 
            placeholder="Digite seu Nickname" 
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && registrarNickname()}
            style={{ 
              padding: '16px', width: '100%', boxSizing: 'border-box', borderRadius: '12px', 
              border: '2px solid #D1D5DB', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', 
              marginBottom: '24px', outline: 'none', transition: 'all 0.2s',
            }}
          />
          <button 
            onClick={registrarNickname} 
            style={{ 
              width: '100%', padding: '18px', backgroundColor: '#3B82F6', color: 'white', border: 'none', 
              borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '20px'
            }}
          >
            Entrar no Desafio 🎮
          </button>
        </div>
      )}

      {/* --- PASSO 1: FILTROS E LOBBY --- */}
      {passo === 1 && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#111827', margin: 0, fontSize: '26px', fontWeight: '900' }}>Configurar Partida</h2>
            <div style={{ backgroundColor: '#F3F4F6', padding: '8px 16px', borderRadius: '20px', fontWeight: '700', color: '#4B5563', fontSize: '15px' }}>
              👤 {nickname} | 🏆 {estatisticasGlobais.partidasJogadas} Jogos
            </div>
          </div>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: '#4B5563', marginBottom: '8px' }}>📍 Bairro</label>
                <select value={filtros.bairro} onChange={e => setFiltros({...filtros, bairro: e.target.value})} style={{ padding: '14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '16px', fontWeight: '600' }}>
                  <option value="">Misturar Tudo</option>
                  <option value="Itaipuaçu">Itaipuaçu</option>
                  <option value="Centro">Centro</option>
                  <option value="Ponta Negra">Ponta Negra</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: '#4B5563', marginBottom: '8px' }}>🏠 Tipo</label>
                <select value={filtros.tipo} onChange={e => setFiltros({...filtros, tipo: e.target.value})} style={{ padding: '14px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '16px', fontWeight: '600' }}>
                  <option value="">Qualquer tipo</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Duplex">Duplex</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            onClick={iniciarJogo} 
            style={{ 
              width: '100%', padding: '18px', backgroundColor: '#10B981', color: 'white', border: 'none', 
              borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '20px', transition: 'all 0.2s'
            }}
          >
            Iniciar Jogo Rápido ⏳
          </button>
        </div>
      )}

      {/* --- PASSO 2: A RODADA (COMPACTA) --- */}
      {passo === 2 && imoveisPartida.length > 0 && (
        <div style={{ animation: 'fadeIn 0.2s' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
            <span style={{ fontWeight: '800', color: '#4B5563', fontSize: '16px' }}>Rodada {rodadaAtual} / 5</span>
            <span style={{ fontWeight: '800', color: '#10B981', fontSize: '16px' }}>{acertosPartida} Acertos</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', marginBottom: '16px' }}>
            <div style={{ width: `${(rodadaAtual / 5) * 100}%`, height: '100%', backgroundColor: '#3B82F6', transition: 'width 0.3s' }}></div>
          </div>
          
          <h2 style={{ textAlign: 'center', color: '#111827', margin: '0 0 16px 0', fontSize: '24px', fontWeight: '900' }}>Qual é o valor?</h2>
          
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid #F3F4F6', marginBottom: '20px' }}>
            {/* Foto com altura reduzida para caber na tela */}
            <div style={{ height: '200px', backgroundImage: `url(${imoveisPartida[rodadaAtual - 1].imagem})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '6px 14px', borderRadius: '20px', fontWeight: '800', fontSize: '14px', color: '#111827' }}>
                📍 {imoveisPartida[rodadaAtual - 1].bairro}
              </div>
            </div>
            
            <div style={{ padding: '16px', backgroundColor: '#ffffff' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '22px', fontWeight: '900' }}>{imoveisPartida[rodadaAtual - 1].tipo}</h3>
              
              <div style={{ display: 'flex', gap: '12px', color: '#374151', fontSize: '15px', marginBottom: '12px', fontWeight: '700', flexWrap: 'wrap' }}>
                <span>🛏️ {imoveisPartida[rodadaAtual - 1].quartos} Qts</span>
                <span>📐 {imoveisPartida[rodadaAtual - 1].area}m²</span>
                {imoveisPartida[rodadaAtual - 1].piscina && <span style={{ color: '#0284C7' }}>🏊 Piscina</span>}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {imoveisPartida[rodadaAtual - 1].destaques.map((destaque, idx) => (
                  <span key={idx} style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: '800' }}>
                    {destaque}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {imoveisPartida[rodadaAtual - 1].opcoes.map((opcao, index) => (
              <button 
                key={index}
                onClick={() => adivinharValor(opcao)}
                onMouseEnter={() => setHoveredBtn(index)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ 
                  padding: '16px 8px', backgroundColor: hoveredBtn === index ? '#E0F2FE' : '#ffffff', 
                  color: hoveredBtn === index ? '#0369A1' : '#111827', border: hoveredBtn === index ? '3px solid #38BDF8' : '3px solid #E5E7EB', 
                  borderRadius: '12px', cursor: 'pointer', fontSize: '20px', fontWeight: '900', transition: 'all 0.1s'
                }}
              >
                {formatCurrency(opcao)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- PASSO 3: PLACAR FINAL COM TABELA --- */}
      {passo === 3 && (
        <div style={{ animation: 'fadeIn 0.4s' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '32px', color: '#111827', margin: '0 0 8px 0', fontWeight: '900' }}>Fim de Jogo! 🏁</h2>
            <p style={{ fontSize: '18px', color: '#4B5563', margin: 0, fontWeight: '600' }}>
              Você acertou <strong style={{ color: '#10B981', fontSize: '22px' }}>{acertosPartida} de 5</strong> avaliações.
            </p>
          </div>

          {/* Tabela de Resultados Compacta */}
          <div style={{ overflowX: 'auto', marginBottom: '24px', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', color: '#374151' }}>
                  <th style={{ padding: '12px', fontWeight: '800' }}>Imóvel</th>
                  <th style={{ padding: '12px', fontWeight: '800' }}>Seu Chute</th>
                  <th style={{ padding: '12px', fontWeight: '800' }}>Valor Real</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Res.</th>
                </tr>
              </thead>
              <tbody>
                {historicoPartida.map((rodada, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: rodada.acertou ? '#F0FDF4' : '#FEF2F2' }}>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#111827' }}>
                      {rodada.imovel.tipo} ({rodada.imovel.bairro})
                    </td>
                    <td style={{ padding: '12px', fontWeight: '700', color: rodada.acertou ? '#059669' : '#DC2626' }}>
                      {formatCurrency(rodada.chute)}
                    </td>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#4B5563' }}>
                      {formatCurrency(rodada.valorReal)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '18px' }}>
                      {rodada.acertou ? '✅' : '❌'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SESSÃO DE AVALIAÇÃO DO JOGO */}
          <div style={{ padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
            {jogoAvaliado ? (
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#10B981', fontWeight: '900' }}>Obrigado! 💖</h3>
              </div>
            ) : (
              <>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#111827', fontWeight: '800' }}>Avalie este joguinho:</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <span 
                      key={estrela}
                      onClick={() => setJogoAvaliado(true)}
                      onMouseEnter={() => setHoveredStar(estrela)}
                      onMouseLeave={() => setHoveredStar(0)}
                      style={{ 
                        fontSize: '36px', cursor: 'pointer',
                        color: (hoveredStar >= estrela || rating >= estrela) ? '#F59E0B' : '#D1D5DB',
                        transition: 'transform 0.1s', transform: hoveredStar === estrela ? 'scale(1.2)' : 'scale(1)'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <button 
            onClick={() => setPasso(1)} 
            style={{ 
              width: '100%', marginTop: '20px', padding: '18px', backgroundColor: '#3B82F6', 
              color: 'white', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '20px', cursor: 'pointer'
            }}
          >
            Jogar Nova Partida 🔄
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}