import React, { useState, useEffect } from 'react';

// --- DADOS MOCKADOS (Mais dinâmicos e com descrições específicas) ---
const imoveisMock = [
  { id: 1, bairro: 'Itaipuaçu', tipo: 'Casa', quartos: 5, piscina: true, area: 250, imagem: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', valorReal: 650000, opcoes: [550000, 650000, 750000, 850000], destaques: ['Área Gourmet', 'Aceita Pet 🐕', 'Energia Solar ⚡'] },
  { id: 2, bairro: 'Itaipuaçu', tipo: 'Casa', quartos: 2, piscina: false, area: 90, imagem: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', valorReal: 380000, opcoes: [320000, 380000, 450000, 500000], destaques: ['Próximo à Praia', 'Proibido som alto 🔇', 'Quintal Amplo'] },
  { id: 3, bairro: 'Centro', tipo: 'Apartamento', quartos: 2, piscina: false, area: 75, imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', valorReal: 320000, opcoes: [250000, 280000, 320000, 380000], destaques: ['Varanda Envidraçada', 'Vaga Coberta 🚗', 'Portaria 24h'] },
  { id: 4, bairro: 'Ponta Negra', tipo: 'Casa', quartos: 4, piscina: true, area: 300, imagem: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', valorReal: 950000, opcoes: [750000, 850000, 950000, 1100000], destaques: ['Vista para o Mar 🌊', 'Acabamento Premium', 'Churrasqueira'] },
  { id: 5, bairro: 'Cordeirinho', tipo: 'Casa', quartos: 3, piscina: true, area: 110, imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', valorReal: 420000, opcoes: [350000, 420000, 480000, 550000], destaques: ['Cozinha Americana', 'Aceita Financiamento 🏦'] },
  { id: 6, bairro: 'Inoã', tipo: 'Duplex', quartos: 3, piscina: false, area: 130, imagem: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', valorReal: 480000, opcoes: [400000, 480000, 520000, 600000], destaques: ['Condomínio Fechado', 'Segurança 24h 🛡️', 'Parquinho'] },
  { id: 7, bairro: 'Centro', tipo: 'Casa', quartos: 3, piscina: true, area: 180, imagem: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', valorReal: 580000, opcoes: [480000, 520000, 580000, 650000], destaques: ['Piscina Aquecida', 'Centro Comercial 🏪', 'Móveis Planejados'] },
  { id: 8, bairro: 'Itaipuaçu', tipo: 'Duplex', quartos: 4, piscina: true, area: 160, imagem: 'https://images.unsplash.com/photo-1605276374104-162f1f13ce3a?auto=format&fit=crop&w=800&q=80', valorReal: 720000, opcoes: [620000, 720000, 820000, 900000], destaques: ['Espaço Gourmet', 'Fino Acabamento ✨', 'Rua Asfaltada'] },
  { id: 9, bairro: 'São José', tipo: 'Casa', quartos: 2, piscina: false, area: 85, imagem: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80', valorReal: 350000, opcoes: [280000, 350000, 410000, 480000], destaques: ['Ideal para Casal 👩‍❤️‍👨', 'Comércio Próximo', 'Aceita Pet 🐈'] },
  { id: 10, bairro: 'Centro', tipo: 'Apartamento', quartos: 3, piscina: true, area: 95, imagem: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', valorReal: 450000, opcoes: [380000, 450000, 520000, 600000], destaques: ['Condomínio Clube 🎾', 'Andar Alto', 'Sol da Manhã ☀️'] }
];

export default function AvaliacaoStepper() {
  const [passo, setPasso] = useState(0); 
  const [nickname, setNickname] = useState('');
  const [estatisticasGlobais, setEstatisticasGlobais] = useState({ partidasJogadas: 0, acertosTotais: 0 });
  const [filtros, setFiltros] = useState({ bairro: '', tipo: '', quartos: '', piscina: '' });
  
  const [imoveisPartida, setImoveisPartida] = useState([]);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [acertosPartida, setAcertosPartida] = useState(0);
  const [feedbackAtual, setFeedbackAtual] = useState(null);
  
  // Estados de Hover e Avaliação (Rating)
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
    if (nickname.trim().length < 3) {
      alert("Seu nickname precisa ter pelo menos 3 letras.");
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
    setJogoAvaliado(false); // Reseta a avaliação para nova partida
    setRating(0);
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

  const enviarAvaliacao = (nota) => {
    setRating(nota);
    setJogoAvaliado(true);
    // Aqui você poderia enviar a nota para o backend futuramente
  };

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);

  return (
    <div style={{ 
      maxWidth: '700px', // Um pouco mais largo para acomodar letras maiores
      margin: '40px auto', 
      padding: '40px', 
      fontFamily: '"Inter", "Segoe UI", sans-serif', 
      backgroundColor: '#ffffff', 
      borderRadius: '24px', 
      boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
      border: '2px solid #f0f0f0'
    }}>
      
      {/* --- PASSO 0: NICKNAME --- */}
      {passo === 0 && (
        <div style={{ textAlign: 'center', padding: '30px 10px', animation: 'fadeIn 0.4s' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏠</div>
          <h2 style={{ color: '#111827', fontSize: '38px', fontWeight: '900', marginBottom: '16px' }}>Desafio do Preço</h2>
          <p style={{ color: '#4B5563', fontSize: '22px', marginBottom: '40px', lineHeight: '1.5' }}>
            Prove que você conhece o mercado imobiliário!<br/>Crie seu nickname para começar.
          </p>
          
          <input 
            type="text" 
            placeholder="Digite seu Nickname" 
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ 
              padding: '20px', 
              width: '100%', 
              boxSizing: 'border-box',
              borderRadius: '16px', 
              border: '3px solid #E5E7EB', 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: '#111827',
              textAlign: 'center', 
              marginBottom: '30px',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.boxShadow = '0 0 0 6px rgba(59, 130, 246, 0.15)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
          />
          <button 
            onClick={registrarNickname} 
            style={{ 
              width: '100%', 
              padding: '22px', 
              backgroundColor: '#3B82F6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontWeight: '800', 
              cursor: 'pointer', 
              fontSize: '24px',
              transition: 'transform 0.1s, background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Entrar no Desafio 🎮
          </button>
        </div>
      )}

      {/* --- PASSO 1: FILTROS E LOBBY --- */}
      {passo === 1 && (
        <div style={{ animation: 'fadeIn 0.4s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px', gap: '15px' }}>
            <h2 style={{ color: '#111827', margin: 0, fontSize: '34px', fontWeight: '900' }}>Configurar Partida</h2>
            <div style={{ backgroundColor: '#F3F4F6', padding: '12px 24px', borderRadius: '30px', fontWeight: '700', color: '#374151', fontSize: '20px', display: 'flex', gap: '16px' }}>
              <span>👤 {nickname}</span>
              <span style={{ color: '#9CA3AF' }}>|</span>
              <span>🏆 {estatisticasGlobais.partidasJogadas} Jogos</span>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '30px', borderRadius: '20px', border: '2px solid #E5E7EB', marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '22px', color: '#111827', fontWeight: '800', textAlign: 'center' }}>Filtre os imóveis (Opcional)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '18px', fontWeight: '700', color: '#4B5563', marginBottom: '10px' }}>📍 Região Favorita</label>
                <select 
                  value={filtros.bairro} 
                  onChange={e => setFiltros({...filtros, bairro: e.target.value})} 
                  style={{ padding: '18px', borderRadius: '12px', border: '2px solid #D1D5DB', backgroundColor: 'white', fontSize: '20px', fontWeight: '600', color: '#111827', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">Misturar Tudo (Recomendado)</option>
                  <option value="Itaipuaçu">Itaipuaçu</option>
                  <option value="Centro">Centro</option>
                  <option value="Ponta Negra">Ponta Negra</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '18px', fontWeight: '700', color: '#4B5563', marginBottom: '10px' }}>🏠 Tipo de Imóvel</label>
                <select 
                  value={filtros.tipo} 
                  onChange={e => setFiltros({...filtros, tipo: e.target.value})} 
                  style={{ padding: '18px', borderRadius: '12px', border: '2px solid #D1D5DB', backgroundColor: 'white', fontSize: '20px', fontWeight: '600', color: '#111827', outline: 'none', cursor: 'pointer' }}
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
              padding: '24px', 
              backgroundColor: '#10B981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontWeight: '900', 
              cursor: 'pointer', 
              fontSize: '26px', 
              boxShadow: '0 8px 16px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#059669'; e.target.style.transform = 'translateY(-3px)'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#10B981'; e.target.style.transform = 'translateY(0)'; }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'}
            onMouseUp={(e) => e.target.style.transform = 'translateY(-3px)'}
          >
            Iniciar 5 Rodadas ⏳
          </button>
        </div>
      )}

      {/* --- PASSO 2: A RODADA (PERGUNTA) --- */}
      {passo === 2 && imoveisPartida.length > 0 && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          
          {/* Header e Barra de Progresso */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', color: '#4B5563', fontSize: '20px' }}>Rodada {rodadaAtual} de 5</span>
              <span style={{ fontWeight: '900', color: '#10B981', fontSize: '20px' }}>{acertosPartida} Acertos 🏆</span>
            </div>
            <div style={{ width: '100%', height: '12px', backgroundColor: '#E5E7EB', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${(rodadaAtual / 5) * 100}%`, 
                height: '100%', 
                backgroundColor: '#3B82F6', 
                transition: 'width 0.4s ease-out' 
              }}></div>
            </div>
          </div>
          
          <h2 style={{ textAlign: 'center', color: '#111827', margin: '0 0 30px 0', fontSize: '32px', fontWeight: '900' }}>Qual é o valor deste imóvel?</h2>
          
          {/* Card do Imóvel Atual */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', border: '3px solid #F3F4F6', marginBottom: '30px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ height: '300px', backgroundImage: `url(${imoveisPartida[rodadaAtual - 1].imagem})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '10px 20px', borderRadius: '30px', fontWeight: '900', fontSize: '18px', color: '#111827', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                📍 {imoveisPartida[rodadaAtual - 1].bairro}
              </div>
            </div>
            
            <div style={{ padding: '24px', backgroundColor: '#ffffff' }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '28px', fontWeight: '900' }}>{imoveisPartida[rodadaAtual - 1].tipo}</h3>
              
              <div style={{ display: 'flex', gap: '20px', color: '#374151', fontSize: '20px', marginBottom: '20px', fontWeight: '700', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🛏️ {imoveisPartida[rodadaAtual - 1].quartos} Quartos</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📐 {imoveisPartida[rodadaAtual - 1].area}m²</span>
                {imoveisPartida[rodadaAtual - 1].piscina && <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284C7' }}>🏊 Piscina</span>}
              </div>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {imoveisPartida[rodadaAtual - 1].destaques.map((destaque, idx) => (
                  <span key={idx} style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '10px 18px', borderRadius: '24px', fontSize: '18px', fontWeight: '800', border: '1px solid #BFDBFE' }}>
                    {destaque}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Botões de Preço Gigantes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {imoveisPartida[rodadaAtual - 1].opcoes.map((opcao, index) => (
              <button 
                key={index}
                onClick={() => adivinharValor(opcao)}
                onMouseEnter={() => setHoveredBtn(index)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ 
                  padding: '24px 10px', 
                  backgroundColor: hoveredBtn === index ? '#E0F2FE' : '#ffffff', 
                  color: hoveredBtn === index ? '#0369A1' : '#111827', 
                  border: hoveredBtn === index ? '4px solid #38BDF8' : '4px solid #E5E7EB', 
                  borderRadius: '16px', 
                  cursor: 'pointer', 
                  fontSize: '26px', 
                  fontWeight: '900', 
                  transition: 'all 0.15s ease',
                  boxShadow: hoveredBtn === index ? '0 8px 16px rgba(56, 189, 248, 0.2)' : 'none',
                  transform: hoveredBtn === index ? 'scale(1.02)' : 'scale(1)'
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
        <div style={{ textAlign: 'center', padding: '50px 20px', animation: 'fadeIn 0.4s' }}>
          <div style={{ 
            display: 'inline-flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '140px', 
            height: '140px', 
            borderRadius: '50%', 
            backgroundColor: feedbackAtual.acertou ? '#D1FAE5' : '#FEE2E2',
            marginBottom: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '72px' }}>{feedbackAtual.acertou ? '🎯' : '📉'}</span>
          </div>
          
          <h2 style={{ color: feedbackAtual.acertou ? '#059669' : '#DC2626', fontSize: '42px', fontWeight: '900', margin: '0 0 16px 0' }}>
            {feedbackAtual.acertou ? 'Na mosca!' : 'Passou Longe!'}
          </h2>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '30px', borderRadius: '20px', margin: '30px 0', border: '2px solid #E5E7EB' }}>
            <p style={{ margin: '0 0 12px 0', color: '#4B5563', fontSize: '22px', fontWeight: '700' }}>O valor real de mercado é:</p>
            <p style={{ margin: 0, color: '#111827', fontSize: '46px', fontWeight: '900' }}>
              {formatCurrency(feedbackAtual.valorReal)}
            </p>
          </div>

          <button 
            onClick={proximaRodada}
            style={{ 
              width: '100%', 
              padding: '24px', 
              backgroundColor: '#111827', 
              color: 'white', 
              border: 'none', 
              borderRadius: '16px', 
              fontWeight: '900', 
              cursor: 'pointer', 
              fontSize: '26px',
              transition: 'transform 0.2s, background-color 0.2s',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => { e.target.style.transform = 'translateY(-4px)'; e.target.style.backgroundColor = '#1F2937'; }}
            onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.backgroundColor = '#111827'; }}
          >
            {rodadaAtual < 5 ? "Próxima Rodada ➡️" : "Ver Placar Final 🏆"}
          </button>
        </div>
      )}

      {/* --- PASSO 4: RESULTADO FINAL DA PARTIDA (PLACAR E AVALIAÇÃO) --- */}
      {passo === 4 && (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s' }}>
          <h2 style={{ fontSize: '42px', color: '#111827', margin: '0 0 10px 0', fontWeight: '900' }}>Fim de Jogo!</h2>
          
          <div style={{ 
            background: acertosPartida >= 3 ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)' : 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', 
            padding: '50px 20px', 
            borderRadius: '24px', 
            marginTop: '20px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '72px', marginBottom: '20px' }}>
              {acertosPartida === 5 ? '🏆' : acertosPartida >= 3 ? '👏' : '📚'}
            </div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '32px', color: '#111827', fontWeight: '900' }}>
              {acertosPartida === 5 ? 'Corretor de Elite!' : acertosPartida >= 3 ? 'Faro para Negócios!' : 'Mercado Imprevisível!'}
            </h3>
            <p style={{ fontSize: '24px', color: '#374151', margin: 0, fontWeight: '600' }}>
              Você cravou <strong style={{ color: '#111827', fontSize: '28px' }}>{acertosPartida} de 5</strong> avaliações.
            </p>
          </div>

          {/* SESSÃO DE AVALIAÇÃO DO JOGO */}
          <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#F9FAFB', borderRadius: '20px', border: '2px solid #E5E7EB' }}>
            {jogoAvaliado ? (
              <div style={{ animation: 'fadeIn 0.4s' }}>
                <h3 style={{ margin: 0, fontSize: '26px', color: '#10B981', fontWeight: '900' }}>Obrigado por avaliar! 💖</h3>
                <p style={{ fontSize: '18px', color: '#4B5563', marginTop: '10px' }}>Sua nota ajuda a melhorar o jogo.</p>
              </div>
            ) : (
              <>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '24px', color: '#111827', fontWeight: '800' }}>O que achou do jogo?</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <span 
                      key={estrela}
                      onClick={() => enviarAvaliacao(estrela)}
                      onMouseEnter={() => setHoveredStar(estrela)}
                      onMouseLeave={() => setHoveredStar(0)}
                      style={{ 
                        fontSize: '48px', 
                        cursor: 'pointer',
                        color: (hoveredStar >= estrela || rating >= estrela) ? '#F59E0B' : '#D1D5DB',
                        transition: 'transform 0.1s, color 0.2s',
                        transform: hoveredStar === estrela ? 'scale(1.2)' : 'scale(1)'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div style={{ marginTop: '40px' }}>
            <button 
              onClick={() => setPasso(1)} 
              style={{ 
                width: '100%',
                padding: '24px', 
                backgroundColor: '#3B82F6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '16px', 
                fontWeight: '900', 
                fontSize: '26px', 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
              }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#2563EB'; e.target.style.transform = 'translateY(-3px)'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = '#3B82F6'; e.target.style.transform = 'translateY(0)'; }}
            >
              Jogar Nova Partida 🔄
            </button>
          </div>
        </div>
      )}

      {/* Estilos Globais Auxiliares */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}