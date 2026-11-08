import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- DADOS MOCKADOS ---
const imoveisMock = [
  { id: 1, bairro: 'Itaipuaçu', tipo: 'Casa', quartos: 3, piscina: true, area: 150, imagem: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', valorReal: 650000, opcoes: [550000, 650000, 750000, 850000], destaques: ['Área Gourmet', 'Terreno de 480m²'] },
  { id: 2, bairro: 'Itaipuaçu', tipo: 'Casa', quartos: 2, piscina: false, area: 90, imagem: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', valorReal: 380000, opcoes: [320000, 380000, 450000, 500000], destaques: ['Próximo à Praia', 'Quintal Amplo'] },
  { id: 3, bairro: 'Centro', tipo: 'Apartamento', quartos: 2, piscina: false, area: 75, imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', valorReal: 320000, opcoes: [250000, 280000, 320000, 380000], destaques: ['Varanda', 'Vaga Coberta'] },
  { id: 4, bairro: 'Ponta Negra', tipo: 'Casa', quartos: 4, piscina: true, area: 250, imagem: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', valorReal: 950000, opcoes: [750000, 850000, 950000, 1100000], destaques: ['Vista para o Mar', 'Acabamento Premium'] },
  { id: 5, bairro: 'Cordeirinho', tipo: 'Casa', quartos: 2, piscina: true, area: 110, imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', valorReal: 420000, opcoes: [350000, 420000, 480000, 550000], destaques: ['Cozinha Americana', 'Churrasqueira'] },
  { id: 6, bairro: 'Inoã', tipo: 'Duplex', quartos: 3, piscina: false, area: 130, imagem: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', valorReal: 480000, opcoes: [400000, 480000, 520000, 600000], destaques: ['Condomínio Fechado', 'Segurança 24h'] },
  { id: 7, bairro: 'Centro', tipo: 'Casa', quartos: 3, piscina: true, area: 180, imagem: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', valorReal: 580000, opcoes: [480000, 520000, 580000, 650000], destaques: ['Piscina Aquecida', 'Centro Comercial'] },
  { id: 8, bairro: 'Itaipuaçu', tipo: 'Duplex', quartos: 3, piscina: true, area: 160, imagem: 'https://images.unsplash.com/photo-1605276374104-162f1f13ce3a?auto=format&fit=crop&w=800&q=80', valorReal: 720000, opcoes: [620000, 720000, 820000, 900000], destaques: ['Espaço Gourmet', 'Fino Acabamento'] },
  { id: 9, bairro: 'São José', tipo: 'Casa', quartos: 2, piscina: false, area: 85, imagem: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80', valorReal: 350000, opcoes: [280000, 350000, 410000, 480000], destaques: ['Rua Asfaltada', 'Comércio Próximo'] },
  { id: 10, bairro: 'Centro', tipo: 'Apartamento', quartos: 3, piscina: true, area: 95, imagem: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', valorReal: 450000, opcoes: [380000, 450000, 520000, 600000], destaques: ['Condomínio Clube', 'Andar Alto'] }
];

export default function AvaliacaoStepper() {
  const navigate = useNavigate();
  
  const [passo, setPasso] = useState(0); 
  const [nickname, setNickname] = useState('');
  const [estatisticasGlobais, setEstatisticasGlobais] = useState({ partidasJogadas: 0, acertosTotais: 0 });
  const [filtros, setFiltros] = useState({ bairro: '', tipo: '', quartos: '', piscina: '' });
  
  const [imoveisPartida, setImoveisPartida] = useState([]);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [acertosPartida, setAcertosPartida] = useState(0);
  const [feedbackAtual, setFeedbackAtual] = useState(null);
  
  // Estado para UX de botão (efeitos hover inline)
  const [hoveredBtn, setHoveredBtn] = useState(null);

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
    if (nickname.trim().length < 3) {
      alert("Seu nickname precisa ter pelo menos 3 caracteres.");
      return;
    }
    localStorage.setItem('domus_game_nick', nickname);
    setPasso(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') registrarNickname();
  };

  const iniciarJogo = () => {
    let preferenciais = imoveisMock.filter(i => (filtros.bairro ? i.bairro === filtros.bairro : true));
    if (filtros.tipo) preferenciais = preferenciais.filter(i => i.tipo === filtros.tipo);
    
    preferenciais = preferenciais.sort(() => Math.random() - 0.5);
    let selecionadosParaPartida = [...preferenciais];
    
    if (selecionadosParaPartida.length < 5) {
      const idsJaEscolhidos = selecionadosParaPartida.map(p => p.id);
      const restantes = imoveisMock
        .filter(i => !idsJaEscolhidos.includes(i.id))
        .sort(() => Math.random() - 0.5);
      
      selecionadosParaPartida = [...selecionadosParaPartida, ...restantes].slice(0, 5);
    } else {
      selecionadosParaPartida = selecionadosParaPartida.slice(0, 5);
    }

    selecionadosParaPartida = selecionadosParaPartida.map(imovel => ({
      ...imovel,
      opcoes: [...imovel.opcoes].sort(() => Math.random() - 0.5)
    }));

    setImoveisPartida(selecionadosParaPartida);
    setRodadaAtual(1);
    setAcertosPartida(0);
    setPasso(2);
  };

  const adivinharValor = (chute) => {
    const imovel = imoveisPartida[rodadaAtual - 1];
    const acertou = chute === imovel.valorReal;
    
    if (acertou) setAcertosPartida(prev => prev + 1);
    
    setFeedbackAtual({ acertou, chute, valorReal: imovel.valorReal });
    setPasso(3);
  };

  const proximaRodada = () => {
    if (rodadaAtual < 5) {
      setRodadaAtual(prev => prev + 1);
      setPasso(2);
    } else {
      const novasStats = {
        partidasJogadas: estatisticasGlobais.partidasJogadas + 1,
        acertosTotais: estatisticasGlobais.acertosTotais + acertosPartida
      };
      setEstatisticasGlobais(novasStats);
      localStorage.setItem('domus_game_stats', JSON.stringify(novasStats));
      setPasso(4);
    }
  };

  // Funções auxiliares de UI
  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '40px auto', 
      padding: '32px', 
      fontFamily: '"Inter", "Segoe UI", sans-serif', 
      backgroundColor: '#ffffff', 
      borderRadius: '20px', 
      boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      
      {/* --- PASSO 0: NICKNAME --- */}
      {passo === 0 && (
        <div style={{ textAlign: 'center', padding: '30px 10px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
          <h2 style={{ color: '#111827', fontSize: '32px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' }}>Desafio do Preço</h2>
          <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px', lineHeight: '1.5' }}>
            Prove que você conhece o mercado imobiliário de Maricá.<br/>Crie seu nickname para começar.
          </p>
          
          <input 
            type="text" 
            placeholder="Como quer ser chamado?" 
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ 
              padding: '16px 20px', 
              width: '100%', 
              boxSizing: 'border-box',
              borderRadius: '12px', 
              border: '2px solid #E5E7EB', 
              fontSize: '18px', 
              textAlign: 'center', 
              marginBottom: '24px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
          />
          <button 
            onClick={registrarNickname} 
            style={{ 
              width: '100%', 
              padding: '18px', 
              backgroundColor: '#3B82F6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              fontSize: '18px',
              transition: 'transform 0.1s, background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Entrar no Desafio 🎮
          </button>
        </div>
      )}

      {/* --- PASSO 1: FILTROS E LOBBY --- */}
      {passo === 1 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ color: '#111827', margin: 0, fontSize: '24px', fontWeight: '800' }}>Configurar Partida</h2>
            <div style={{ backgroundColor: '#F3F4F6', padding: '8px 16px', borderRadius: '24px', fontWeight: '600', color: '#4B5563', fontSize: '14px', display: 'flex', gap: '12px' }}>
              <span>👤 {nickname}</span>
              <span style={{ color: '#D1D5DB' }}>|</span>
              <span>🏆 {estatisticasGlobais.partidasJogadas} Jogos</span>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#374151' }}>Filtre os imóveis (Opcional)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Região</label>
                <select 
                  value={filtros.bairro} 
                  onChange={e => setFiltros({...filtros, bairro: e.target.value})} 
                  style={{ padding: '14px', borderRadius: '10px', border: '1px solid #D1D5DB', backgroundColor: 'white', fontSize: '15px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">Todas (Sorteio)</option>
                  <option value="Itaipuaçu">Itaipuaçu</option>
                  <option value="Centro">Centro</option>
                  <option value="Ponta Negra">Ponta Negra</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Tipo</label>
                <select 
                  value={filtros.tipo} 
                  onChange={e => setFiltros({...filtros, tipo: e.target.value})} 
                  style={{ padding: '14px', borderRadius: '10px', border: '1px solid #D1D5DB', backgroundColor: 'white', fontSize: '15px', outline: 'none', cursor: 'pointer' }}
                >
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
              width: '100%', 
              padding: '18px', 
              backgroundColor: '#10B981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              fontSize: '18px', 
              boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#059669'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#10B981'; e.target.style.transform = 'translateY(0)'; }}
          >
            Iniciar 5 Rodadas ⏳
          </button>
        </div>
      )}

      {/* --- PASSO 2: A RODADA (PERGUNTA) --- */}
      {passo === 2 && imoveisPartida.length > 0 && (
        <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
          
          {/* Header e Barra de Progresso */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', color: '#6B7280', fontSize: '14px' }}>Rodada {rodadaAtual} de 5</span>
              <span style={{ fontWeight: '700', color: '#10B981', fontSize: '14px' }}>{acertosPartida} Acertos</span>
            </div>
            {/* Progress Bar UI */}
            <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${(rodadaAtual / 5) * 100}%`, 
                height: '100%', 
                backgroundColor: '#3B82F6', 
                transition: 'width 0.4s ease-out' 
              }}></div>
            </div>
          </div>
          
          <h2 style={{ textAlign: 'center', color: '#111827', margin: '0 0 24px 0', fontSize: '24px', fontWeight: '800' }}>Qual é o valor deste imóvel?</h2>
          
          {/* Card do Imóvel Atual */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', marginBottom: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ height: '240px', backgroundImage: `url(${imoveisPartida[rodadaAtual - 1].imagem})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              {/* Badge Bairro flutuante sobre a imagem */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '20px', fontWeight: '700', fontSize: '12px', color: '#111827', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                📍 {imoveisPartida[rodadaAtual - 1].bairro}
              </div>
            </div>
            
            <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#111827', fontSize: '20px', fontWeight: '700' }}>{imoveisPartida[rodadaAtual - 1].tipo}</h3>
              
              <div style={{ display: 'flex', gap: '16px', color: '#4B5563', fontSize: '14px', marginBottom: '16px', fontWeight: '500' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>🛏️ {imoveisPartida[rodadaAtual - 1].quartos} Dorms</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>📐 {imoveisPartida[rodadaAtual - 1].area}m²</span>
                {imoveisPartida[rodadaAtual - 1].piscina && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>🏊 Piscina</span>}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {imoveisPartida[rodadaAtual - 1].destaques.map((destaque, idx) => (
                  <span key={idx} style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                    {destaque}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Botões de Preço */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {imoveisPartida[rodadaAtual - 1].opcoes.map((opcao, index) => (
              <button 
                key={index}
                onClick={() => adivinharValor(opcao)}
                onMouseEnter={() => setHoveredBtn(index)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ 
                  padding: '20px 10px', 
                  backgroundColor: hoveredBtn === index ? '#F3F4F6' : '#ffffff', 
                  color: '#111827', 
                  border: hoveredBtn === index ? '2px solid #3B82F6' : '2px solid #E5E7EB', 
                  borderRadius: '12px', 
                  cursor: 'pointer', 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  transition: 'all 0.2s ease',
                  boxShadow: hoveredBtn === index ? '0 4px 6px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                {formatCurrency(opcao)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- PASSO 3: FEEDBACK DA RODADA --- */}
      {passo === 3 && feedbackAtual && (
        <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'fadeIn 0.4s' }}>
          <div style={{ 
            display: 'inline-flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '96px', 
            height: '96px', 
            borderRadius: '50%', 
            backgroundColor: feedbackAtual.acertou ? '#D1FAE5' : '#FEE2E2',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '48px' }}>{feedbackAtual.acertou ? '🎯' : '📉'}</span>
          </div>
          
          <h2 style={{ color: feedbackAtual.acertou ? '#059669' : '#DC2626', fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0' }}>
            {feedbackAtual.acertou ? 'Avaliação Perfeita!' : 'Passou Longe!'}
          </h2>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '16px', margin: '24px 0' }}>
            <p style={{ margin: '0 0 8px 0', color: '#6B7280', fontSize: '15px' }}>O valor real de mercado é:</p>
            <p style={{ margin: 0, color: '#111827', fontSize: '28px', fontWeight: '800' }}>
              {formatCurrency(feedbackAtual.valorReal)}
            </p>
          </div>

          <button 
            onClick={proximaRodada}
            style={{ 
              width: '100%', 
              padding: '18px', 
              backgroundColor: '#111827', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: '700', 
              cursor: 'pointer', 
              fontSize: '18px',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {rodadaAtual < 5 ? "Avançar para Próxima Rodada ➡️" : "Ver Placar Final 🏆"}
          </button>
        </div>
      )}

      {/* --- PASSO 4: RESULTADO FINAL DA PARTIDA (PLACAR) --- */}
      {passo === 4 && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
          <h2 style={{ fontSize: '32px', color: '#111827', marginTop: 0, fontWeight: '800' }}>Fim de Jogo!</h2>
          
          <div style={{ 
            background: acertosPartida >= 3 ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)' : 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', 
            padding: '40px 20px', 
            borderRadius: '20px', 
            marginTop: '24px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {acertosPartida === 5 ? '🏆' : acertosPartida >= 3 ? '👏' : '📚'}
            </div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '24px', color: '#111827', fontWeight: '800' }}>
              {acertosPartida === 5 ? 'Corretor de Elite!' : acertosPartida >= 3 ? 'Faro para Negócios!' : 'Mercado Imprevisível!'}
            </h3>
            <p style={{ fontSize: '18px', color: '#4B5563', margin: 0 }}>
              Você cravou <strong>{acertosPartida} de 5</strong> avaliações.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
            <button 
              onClick={() => setPasso(1)} 
              style={{ padding: '18px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
            >
              Jogar Nova Partida 🔄
            </button>
            
            <button 
              onClick={() => navigate('/resultados')} 
              style={{ padding: '18px', backgroundColor: 'transparent', border: '2px solid #10B981', color: '#10B981', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#10B981'; e.target.style.color = '#fff'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#10B981'; }}
            >
              Explorar Imóveis Reais 🔍
            </button>
          </div>
        </div>
      )}

      {/* Estilo embutido apenas para a animação de FadeIn */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}