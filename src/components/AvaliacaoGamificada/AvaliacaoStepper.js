import React, { useState, useEffect } from 'react';

// --- DADOS MOCKADOS (Agora com arrays de imagens e Dicas de Especialista) ---
const imoveisMock = [
  { 
    id: 1, bairro: 'Ponta Negra', tipo: 'Casa de Luxo', quartos: 4, piscina: true, area: 350, 
    imagens: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80', // Fachada moderna
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', // Vista mar
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'  // Interior premium
    ], 
    valorReal: 1100000, opcoes: [950000, 1100000, 1250000, 1500000], 
    destaques: ['Vista para o Mar 🌊', 'Acabamento Premium', 'Energia Solar ⚡'],
    dica: 'Dica: Imóveis de alto padrão com mais de 300m² e vista para o mar em Ponta Negra costumam ultrapassar a marca de 1 Milhão.'
  },
  { 
    id: 2, bairro: 'Itaipuaçu', tipo: 'Casa', quartos: 3, piscina: true, area: 180, 
    imagens: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', // Fachada
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?auto=format&fit=crop&w=800&q=80', // Gourmet/Piscina
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80'  // Pet no quintal
    ], 
    valorReal: 650000, opcoes: [550000, 650000, 750000, 850000], 
    destaques: ['Área Gourmet 🥩', 'Aceita Pet 🐕', 'Terreno 480m²'],
    dica: 'Dica: Em Itaipuaçu, casas em terrenos inteiros (480m²) com piscina e área gourmet completa ficam acima de meio milhão.'
  },
  { 
    id: 3, bairro: 'Centro', tipo: 'Apartamento', quartos: 2, piscina: false, area: 75, 
    imagens: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', // Sala
      'https://images.unsplash.com/photo-1502672260266-1c1c24240f57?auto=format&fit=crop&w=800&q=80', // Quarto
    ], 
    valorReal: 320000, opcoes: [250000, 280000, 320000, 380000], 
    destaques: ['Varanda Envidraçada', 'Vaga Coberta 🚗', 'Proibido som alto 🔇'],
    dica: 'Dica: Apartamentos centrais de 2 quartos costumam seguir a regra: a cada 100m², o valor ronda os R$ 400 mil. Esse é um pouco menor.'
  },
  { 
    id: 4, bairro: 'Cordeirinho', tipo: 'Casa', quartos: 2, piscina: true, area: 110, 
    imagens: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', // Fachada
      'https://images.unsplash.com/photo-1556912172-45b7ee8819d6?auto=format&fit=crop&w=800&q=80', // Cozinha americana
    ], 
    valorReal: 420000, opcoes: [350000, 420000, 480000, 550000], 
    destaques: ['Cozinha Americana 🍳', 'Aceita Financiamento 🏦'],
    dica: 'Dica: Uma casa padrão de 2 quartos com piscina gira na faixa de R$ 400 mil a R$ 450 mil.'
  },
  { 
    id: 5, bairro: 'Inoã', tipo: 'Duplex', quartos: 3, piscina: false, area: 130, 
    imagens: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80', // Fachada
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80', // Rua condominio
    ], 
    valorReal: 480000, opcoes: [400000, 480000, 520000, 600000], 
    destaques: ['Condomínio Fechado', 'Segurança 24h 🛡️', 'Parquinho'],
    dica: 'Dica: A segurança do condomínio fechado valoriza o imóvel, deixando um duplex de 3 quartos perto dos R$ 500 mil.'
  },
  { 
    id: 6, bairro: 'Itaipuaçu', tipo: 'Duplex', quartos: 4, piscina: true, area: 160, 
    imagens: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80', // Fachada
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', // Sala
    ], 
    valorReal: 720000, opcoes: [620000, 720000, 820000, 900000], 
    destaques: ['Móveis Planejados', 'Fino Acabamento ✨', 'Rua Asfaltada'],
    dica: 'Dica: Duplex com 4 quartos, piscina e móveis planejados possui alto valor agregado, passando fácil dos R$ 700 mil.'
  }
];

export default function AvaliacaoStepper() {
  const [passo, setPasso] = useState(0); 
  const [nickname, setNickname] = useState('');
  const [estatisticasGlobais, setEstatisticasGlobais] = useState({ partidasJogadas: 0, acertosTotais: 0 });
  const [filtros, setFiltros] = useState({ bairro: '', tipo: '' });
  
  const [imoveisPartida, setImoveisPartida] = useState([]);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [acertosPartida, setAcertosPartida] = useState(0);
  const [historicoPartida, setHistoricoPartida] = useState([]);
  
  // Estado para o Carrossel
  const [fotoAtual, setFotoAtual] = useState(0);

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

  // Reseta a foto do carrossel sempre que a rodada muda
  useEffect(() => {
    setFotoAtual(0);
  }, [rodadaAtual]);

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

  const adivinharValor = (chute) => {
    const imovel = imoveisPartida[rodadaAtual - 1];
    const acertou = chute === imovel.valorReal;
    
    setHistoricoPartida(prev => [...prev, { imovel, chute, valorReal: imovel.valorReal, acertou }]);
    if (acertou) setAcertosPartida(prev => prev + 1);

    if (rodadaAtual < 5) {
      setRodadaAtual(prev => prev + 1);
    } else {
      const novasStats = {
        partidasJogadas: estatisticasGlobais.partidasJogadas + 1,
        acertosTotais: estatisticasGlobais.acertosTotais + (acertou ? acertosPartida + 1 : acertosPartida)
      };
      setEstatisticasGlobais(novasStats);
      localStorage.setItem('domus_game_stats', JSON.stringify(novasStats));
      setPasso(3);
    }
  };

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);

  // Funções do Carrossel
  const proximaFoto = () => {
    const imovel = imoveisPartida[rodadaAtual - 1];
    setFotoAtual((prev) => (prev === imovel.imagens.length - 1 ? 0 : prev + 1));
  };

  const fotoAnterior = () => {
    const imovel = imoveisPartida[rodadaAtual - 1];
    setFotoAtual((prev) => (prev === 0 ? imovel.imagens.length - 1 : prev - 1));
  };

  return (
    <div className="domus-game-wrapper">
      
      {/* PASSO 0: NICKNAME */}
      {passo === 0 && (
        <div className="step-container slide-in">
          <div className="icon-large">🏠</div>
          <h2 className="title-text">Desafio do Preço</h2>
          <p className="subtitle-text">Prove que você conhece o mercado de Maricá!</p>
          
          <input 
            type="text" 
            placeholder="Digite seu Nickname" 
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && registrarNickname()}
            className="input-field"
          />
          <button onClick={registrarNickname} className="btn-primary">
            Entrar no Desafio 🎮
          </button>
        </div>
      )}

      {/* PASSO 1: FILTROS E LOBBY */}
      {passo === 1 && (
        <div className="step-container slide-in">
          <div className="header-flex">
            <h2 className="title-text no-margin">Partida</h2>
            <div className="badge-info">
              👤 {nickname} | 🏆 {estatisticasGlobais.partidasJogadas} Jogos
            </div>
          </div>
          
          <div className="filter-box">
            <div className="grid-2-cols">
              <div className="input-group">
                <label>📍 Bairro</label>
                <select value={filtros.bairro} onChange={e => setFiltros({...filtros, bairro: e.target.value})}>
                  <option value="">Misturar Tudo</option>
                  <option value="Itaipuaçu">Itaipuaçu</option>
                  <option value="Centro">Centro</option>
                  <option value="Ponta Negra">Ponta Negra</option>
                </select>
              </div>
              <div className="input-group">
                <label>🏠 Tipo</label>
                <select value={filtros.tipo} onChange={e => setFiltros({...filtros, tipo: e.target.value})}>
                  <option value="">Qualquer tipo</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Duplex">Duplex</option>
                </select>
              </div>
            </div>
          </div>

          <button onClick={iniciarJogo} className="btn-success">
            Iniciar Jogo Rápido ⏳
          </button>
        </div>
      )}

      {/* PASSO 2: A RODADA */}
      {passo === 2 && imoveisPartida.length > 0 && (
        <div className="step-container fade-in">
          
          <div className="progress-header">
            <span>Rodada {rodadaAtual} / 5</span>
            <span className="text-success">{acertosPartida} Acertos</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${(rodadaAtual / 5) * 100}%` }}></div>
          </div>
          
          <h2 className="question-text">Qual é o valor?</h2>
          
          <div className="property-card">
            
            {/* CARROSSEL DE IMAGENS */}
            <div className="carousel-container" style={{ backgroundImage: `url(${imoveisPartida[rodadaAtual - 1].imagens[fotoAtual]})` }}>
              <div className="property-badge">📍 {imoveisPartida[rodadaAtual - 1].bairro}</div>
              
              {imoveisPartida[rodadaAtual - 1].imagens.length > 1 && (
                <>
                  <button className="carousel-btn left" onClick={fotoAnterior}>❮</button>
                  <button className="carousel-btn right" onClick={proximaFoto}>❯</button>
                  <div className="carousel-dots">
                    {imoveisPartida[rodadaAtual - 1].imagens.map((_, idx) => (
                      <div key={idx} className={`dot ${idx === fotoAtual ? 'active' : ''}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="property-details">
              <h3>{imoveisPartida[rodadaAtual - 1].tipo}</h3>
              <div className="property-specs">
                <span>🛏️ {imoveisPartida[rodadaAtual - 1].quartos} Qts</span>
                <span>📐 {imoveisPartida[rodadaAtual - 1].area}m²</span>
                {imoveisPartida[rodadaAtual - 1].piscina && <span className="text-blue">🏊 Piscina</span>}
              </div>
              <div className="property-tags">
                {imoveisPartida[rodadaAtual - 1].destaques.map((destaque, idx) => (
                  <span key={idx} className="tag-pill">{destaque}</span>
                ))}
              </div>
            </div>
          </div>

          {/* DICA DE ESPECIALISTA */}
          <div className="hint-box">
            {imoveisPartida[rodadaAtual - 1].dica}
          </div>

          <div className="btn-grid">
            {imoveisPartida[rodadaAtual - 1].opcoes.map((opcao, index) => (
              <button key={index} onClick={() => adivinharValor(opcao)} className="btn-price">
                {formatCurrency(opcao)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASSO 3: PLACAR FINAL */}
      {passo === 3 && (
        <div className="step-container slide-in">
          <div className="text-center margin-bottom-sm">
            <h2 className="title-text no-margin">Fim de Jogo! 🏁</h2>
            <p className="subtitle-text text-bold">
              Você acertou <strong className="text-success">{acertosPartida} de 5</strong> avaliações.
            </p>
          </div>

          <div className="table-wrapper">
            <table className="result-table">
              <thead>
                <tr>
                  <th>Imóvel</th>
                  <th>Chute</th>
                  <th>Real</th>
                </tr>
              </thead>
              <tbody>
                {historicoPartida.map((rodada, idx) => (
                  <tr key={idx} className={rodada.acertou ? 'row-success' : 'row-error'}>
                    <td className="font-bold">
                      {rodada.imovel.tipo} <br/><span className="text-small">({rodada.imovel.bairro})</span>
                    </td>
                    <td className={rodada.acertou ? 'text-success font-bold' : 'text-error font-bold'}>
                      {formatCurrency(rodada.chute)}
                    </td>
                    <td className="font-bold text-muted">
                      {formatCurrency(rodada.valorReal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rating-box">
            {jogoAvaliado ? (
              <h3 className="text-success no-margin font-bold">Obrigado! 💖</h3>
            ) : (
              <>
                <h3 className="rating-title">Avalie este joguinho:</h3>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <span 
                      key={estrela}
                      onClick={() => setJogoAvaliado(true)}
                      onMouseEnter={() => setHoveredStar(estrela)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className={`star ${(hoveredStar >= estrela || rating >= estrela) ? 'active' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <button onClick={() => setPasso(1)} className="btn-primary margin-top-sm">
            Jogar Nova Partida 🔄
          </button>
        </div>
      )}

      {/* --- ESTILOS CSS --- */}
      <style>{`
        /* VARIÁVEIS E BASE */
        .domus-game-wrapper {
          max-width: 600px;
          margin: 10px auto;
          padding: 24px;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          border: 1px solid #E5E7EB;
          box-sizing: border-box;
          width: 100%;
        }
        
        .step-container { display: flex; flex-direction: column; height: 100%; }
        .text-center { text-align: center; }
        .no-margin { margin: 0; }
        .margin-bottom-sm { margin-bottom: 12px; }
        .margin-top-sm { margin-top: 16px; }
        .font-bold { font-weight: 800; }
        .text-success { color: #10B981; }
        .text-error { color: #DC2626; }
        .text-blue { color: #0284C7; }
        .text-muted { color: #4B5563; }
        .text-small { font-size: 12px; font-weight: 500; }

        /* TIPOGRAFIA */
        .icon-large { font-size: 48px; margin-bottom: 10px; text-align: center; }
        .title-text { color: #111827; font-size: 28px; font-weight: 900; margin-bottom: 8px; }
        .subtitle-text { color: #4B5563; font-size: 16px; margin-bottom: 24px; }
        .question-text { text-align: center; color: #111827; margin: 0 0 12px 0; font-size: 22px; font-weight: 900; }

        /* FORMS E BOTOES */
        .input-field {
          padding: 14px; width: 100%; box-sizing: border-box; border-radius: 12px; 
          border: 2px solid #D1D5DB; font-size: 18px; font-weight: bold; text-align: center; 
          margin-bottom: 20px; outline: none; transition: all 0.2s;
        }
        .input-field:focus { border-color: #3B82F6; }
        
        .btn-primary, .btn-success {
          width: 100%; padding: 16px; color: white; border: none; 
          border-radius: 12px; font-weight: 900; cursor: pointer; font-size: 18px; transition: transform 0.1s;
        }
        .btn-primary { background-color: #3B82F6; }
        .btn-primary:active { transform: scale(0.98); }
        .btn-success { background-color: #10B981; }
        .btn-success:active { transform: scale(0.98); }

        /* LAYOUT LOBBY */
        .header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .badge-info { background-color: #F3F4F6; padding: 6px 12px; border-radius: 20px; font-weight: 700; color: #4B5563; font-size: 14px; }
        .filter-box { background-color: #F9FAFB; padding: 16px; border-radius: 16px; border: 1px solid #E5E7EB; margin-bottom: 16px; }
        .grid-2-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .input-group label { display: block; font-size: 14px; font-weight: 700; color: #4B5563; margin-bottom: 6px; }
        .input-group select { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #D1D5DB; font-size: 15px; font-weight: 600; outline: none; }

        /* RODADA & CARROSSEL */
        .progress-header { display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center; font-weight: 800; font-size: 14px; color: #4B5563; }
        .progress-bar-bg { width: 100%; height: 8px; background-color: #E5E7EB; border-radius: 4px; margin-bottom: 12px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background-color: #3B82F6; transition: width 0.3s; }
        
        .property-card { border-radius: 12px; overflow: hidden; border: 2px solid #F3F4F6; margin-bottom: 12px; }
        
        .carousel-container { 
          height: 200px; 
          background-size: cover; 
          background-position: center; 
          position: relative; 
          background-color: #E5E7EB;
          transition: background-image 0.3s ease-in-out;
        }
        .carousel-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.4); color: white; border: none; font-size: 18px;
          padding: 8px 12px; cursor: pointer; border-radius: 50%;
          transition: background 0.2s;
        }
        .carousel-btn:hover { background: rgba(0,0,0,0.7); }
        .carousel-btn.left { left: 10px; }
        .carousel-btn.right { right: 10px; }
        
        .carousel-dots {
          position: absolute; bottom: 12px; width: 100%;
          display: flex; justify-content: center; gap: 6px;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.5); transition: 0.3s; }
        .dot.active { background: #ffffff; transform: scale(1.2); }

        .property-badge { position: absolute; top: 10px; left: 10px; background-color: rgba(255,255,255,0.95); padding: 4px 12px; border-radius: 20px; font-weight: 800; font-size: 12px; color: #111827; }
        .property-details { padding: 12px; background-color: #ffffff; }
        .property-details h3 { margin: 0 0 8px 0; color: #111827; font-size: 18px; font-weight: 900; }
        .property-specs { display: flex; gap: 10px; color: #374151; font-size: 13px; margin-bottom: 8px; font-weight: 700; flex-wrap: wrap; }
        .property-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .tag-pill { background-color: #EFF6FF; color: #1D4ED8; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 800; }

        /* HINT BOX (DICA) */
        .hint-box {
          background-color: #FEF9C3;
          border-left: 4px solid #F59E0B;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 13px;
          color: #854D0E;
          font-weight: 600;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .btn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .btn-price { 
          padding: 14px 6px; background-color: #ffffff; color: #111827; border: 2px solid #E5E7EB; 
          border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 900; transition: all 0.1s; 
        }
        .btn-price:hover { background-color: #E0F2FE; color: #0369A1; border-color: #38BDF8; }

        /* TABELA E AVALIAÇÃO */
        .table-wrapper { border: 1px solid #E5E7EB; border-radius: 10px; overflow: hidden; margin-bottom: 16px; }
        .result-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
        .result-table th { background-color: #F9FAFB; padding: 10px; font-weight: 800; border-bottom: 2px solid #E5E7EB; color: #374151; }
        .result-table td { padding: 10px; border-bottom: 1px solid #E5E7EB; }
        .row-success { background-color: #F0FDF4; }
        .row-error { background-color: #FEF2F2; }

        .rating-box { padding: 16px; background-color: #F9FAFB; border-radius: 12px; border: 1px solid #E5E7EB; text-align: center; }
        .rating-title { margin: 0 0 8px 0; font-size: 16px; color: #111827; font-weight: 800; }
        .stars-container { display: flex; justify-content: center; gap: 6px; }
        .star { font-size: 32px; cursor: pointer; color: #D1D5DB; transition: transform 0.1s; }
        .star.active { color: #F59E0B; }
        .star:active { transform: scale(1.2); }

        /* ANIMAÇÕES */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.2s ease-in; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .slide-in { animation: slideIn 0.3s ease-out; }

        /* MEDIA QUERIES PARA CELULAR */
        @media (max-width: 500px) {
          .domus-game-wrapper { padding: 16px; margin: 0; border-radius: 0; border: none; box-shadow: none; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
          
          .icon-large { font-size: 36px; margin-bottom: 4px; }
          .title-text { font-size: 22px; margin-bottom: 4px; }
          .subtitle-text { font-size: 14px; margin-bottom: 16px; }
          .question-text { font-size: 18px; margin-bottom: 8px; }
          
          .input-field { padding: 12px; font-size: 16px; margin-bottom: 16px; }
          .btn-primary, .btn-success { padding: 14px; font-size: 16px; }
          
          .header-flex { flex-direction: column; gap: 8px; align-items: flex-start; }
          .grid-2-cols { grid-template-columns: 1fr; gap: 8px; }
          .input-group select { padding: 10px; font-size: 14px; }
          .filter-box { padding: 12px; margin-bottom: 12px; }
          
          .property-card { margin-bottom: 10px; border-width: 1px; }
          .carousel-container { height: 160px; } /* Ajuste fino de altura para caber Dica + Carrossel */
          
          .property-details { padding: 10px; }
          .property-details h3 { font-size: 16px; margin-bottom: 6px; }
          .property-specs { font-size: 12px; margin-bottom: 6px; gap: 8px; }
          .tag-pill { font-size: 10px; padding: 4px 8px; }
          
          .hint-box { font-size: 12px; padding: 8px 10px; margin-bottom: 12px; }

          .btn-grid { gap: 8px; }
          .btn-price { padding: 10px 4px; font-size: 14px; border-width: 2px; }

          .result-table th, .result-table td { padding: 8px 6px; font-size: 12px; }
          .table-wrapper { margin-bottom: 12px; }
          .rating-box { padding: 12px; }
          .star { font-size: 28px; }
        }
      `}</style>
    </div>
  );
}