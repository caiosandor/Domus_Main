import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- DADOS MOCKADOS (Aumentei a lista para garantir 5 rodadas variadas) ---
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
  
  // Estados de Navegação do Componente
  const [passo, setPasso] = useState(0); 
  // 0: Nickname | 1: Filtros | 2: Pergunta (Rodada) | 3: Feedback Pergunta | 4: Placar Final

  // Estados do Usuário e Jogo
  const [nickname, setNickname] = useState('');
  const [estatisticasGlobais, setEstatisticasGlobais] = useState({ partidasJogadas: 0, acertosTotais: 0 });
  const [filtros, setFiltros] = useState({ bairro: '', tipo: '', quartos: '', piscina: '' });
  
  // Estados da Partida Atual (5 Rodadas)
  const [imoveisPartida, setImoveisPartida] = useState([]);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [acertosPartida, setAcertosPartida] = useState(0);
  const [feedbackAtual, setFeedbackAtual] = useState(null); // Guarda se acertou/errou a rodada

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
      alert("Escolha um nickname com pelo menos 3 letras!");
      return;
    }
    localStorage.setItem('domus_game_nick', nickname);
    setPasso(1);
  };

  const iniciarJogo = () => {
    // 1. Aplica os filtros preferenciais
    let preferenciais = imoveisMock.filter(i => (filtros.bairro ? i.bairro === filtros.bairro : true));
    if (filtros.tipo) preferenciais = preferenciais.filter(i => i.tipo === filtros.tipo);
    
    // Embaralha os que deram match perfeito
    preferenciais = preferenciais.sort(() => Math.random() - 0.5);

    // 2. Garante que teremos exatamente 5 imóveis para as 5 rodadas!
    let selecionadosParaPartida = [...preferenciais];
    
    // Se os filtros foram muito rígidos e achamos menos de 5, preenchemos com outros imóveis aleatórios
    if (selecionadosParaPartida.length < 5) {
      const idsJaEscolhidos = selecionadosParaPartida.map(p => p.id);
      const restantes = imoveisMock
        .filter(i => !idsJaEscolhidos.includes(i.id))
        .sort(() => Math.random() - 0.5);
      
      selecionadosParaPartida = [...selecionadosParaPartida, ...restantes].slice(0, 5);
    } else {
      selecionadosParaPartida = selecionadosParaPartida.slice(0, 5);
    }

    // Embaralha as opções de botões de todos os 5 imóveis selecionados
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
    
    if (acertou) {
      setAcertosPartida(prev => prev + 1);
    }
    
    // Salva o feedback para mostrar na tela intermediária
    setFeedbackAtual({
      acertou,
      chute,
      valorReal: imovel.valorReal
    });
    
    setPasso(3);
  };

  const proximaRodada = () => {
    if (rodadaAtual < 5) {
      setRodadaAtual(prev => prev + 1);
      setPasso(2);
    } else {
      // Fim das 5 rodadas! Atualiza estatísticas globais
      const novasStats = {
        partidasJogadas: estatisticasGlobais.partidasJogadas + 1,
        acertosTotais: estatisticasGlobais.acertosTotais + acertosPartida
      };
      setEstatisticasGlobais(novasStats);
      localStorage.setItem('domus_game_stats', JSON.stringify(novasStats));
      setPasso(4); // Vai para o placar final
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
      
      {/* --- PASSO 0: NICKNAME --- */}
      {passo === 0 && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '28px' }}>Desafio do Preço 🏠</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Crie seu nickname e desafie seus amigos para ver quem acerta mais avaliações!</p>
          
          <input 
            type="text" 
            placeholder="Digite seu Nickname" 
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            style={{ padding: '15px', width: '80%', borderRadius: '8px', border: '2px solid #ddd', fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}
          />
          <br />
          <button 
            onClick={registrarNickname} 
            style={{ padding: '15px 40px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}
          >
            Entrar no Desafio 🎮
          </button>
        </div>
      )}

      {/* --- PASSO 1: FILTROS / INÍCIO DA PARTIDA --- */}
      {passo === 1 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#2c3e50', margin: 0 }}>O Preço Certo</h2>
            <span style={{ backgroundColor: '#f1f2f6', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', color: '#2c3e50', fontSize: '13px' }}>
              👤 {nickname} | 🏆 Partidas: {estatisticasGlobais.partidasJogadas}
            </span>
          </div>
          
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>O desafio consiste em <strong>5 rodadas</strong>. Escolha uma preferência abaixo e veja se consegue fazer 5/5!</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'left', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Bairro Favorito</label>
              <select value={filtros.bairro} onChange={e => setFiltros({...filtros, bairro: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <option value="">Sortido (Recomendado)</option>
                <option value="Itaipuaçu">Itaipuaçu</option>
                <option value="Centro">Centro</option>
                <option value="Ponta Negra">Ponta Negra</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Tipo de Imóvel</label>
              <select value={filtros.tipo} onChange={e => setFiltros({...filtros, tipo: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <option value="">Qualquer tipo</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
              </select>
            </div>
          </div>

          <button 
            onClick={iniciarJogo} 
            style={{ width: '100%', marginTop: '20px', padding: '16px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px', transition: '0.3s' }}
          >
            Começar Partida (5 Rodadas) ⏳
          </button>
        </div>
      )}

      {/* --- PASSO 2: A RODADA (PERGUNTA) --- */}
      {passo === 2 && imoveisPartida.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#7f8c8d' }}>👤 {nickname}</span>
            <span style={{ backgroundColor: '#2980b9', color: 'white', padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold' }}>
              Rodada {rodadaAtual} / 5
            </span>
          </div>
          
          <h2 style={{ textAlign: 'center', color: '#2c3e50', marginTop: 0 }}>Qual o valor deste imóvel?</h2>
          
          {/* Card do Imóvel Atual */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', marginBottom: '20px' }}>
            <div style={{ height: '250px', backgroundImage: `url(${imoveisPartida[rodadaAtual - 1].imagem})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div style={{ padding: '15px', backgroundColor: '#f8f9fa' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{imoveisPartida[rodadaAtual - 1].tipo} em {imoveisPartida[rodadaAtual - 1].bairro}</h3>
              <div style={{ display: 'flex', gap: '15px', color: '#7f8c8d', fontSize: '14px', marginBottom: '10px' }}>
                <span>🛏️ {imoveisPartida[rodadaAtual - 1].quartos} Quartos</span>
                <span>📐 {imoveisPartida[rodadaAtual - 1].area}m²</span>
                {imoveisPartida[rodadaAtual - 1].piscina && <span>🏊 Com Piscina</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {imoveisPartida[rodadaAtual - 1].destaques.map((destaque, idx) => (
                  <span key={idx} style={{ backgroundColor: '#e1f5fe', color: '#0277bd', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>
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
                style={{ padding: '18px', backgroundColor: '#fff', color: '#2c3e50', border: '2px solid #3498db', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.target.style.backgroundColor = '#3498db'; e.target.style.color = '#fff'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#2c3e50'; }}
              >
                R$ {opcao.toLocaleString('pt-BR')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- PASSO 3: FEEDBACK DA RODADA --- */}
      {passo === 3 && feedbackAtual && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          {feedbackAtual.acertou ? (
            <div>
              <h1 style={{ fontSize: '60px', margin: '0' }}>🎯</h1>
              <h2 style={{ color: '#27ae60', fontSize: '28px' }}>Na mosca!</h2>
              <p style={{ fontSize: '18px', color: '#555' }}>Você acertou em cheio o valor de mercado.</p>
            </div>
          ) : (
            <div>
              <h1 style={{ fontSize: '60px', margin: '0' }}>😅</h1>
              <h2 style={{ color: '#e74c3c', fontSize: '28px' }}>Passou perto!</h2>
              <p style={{ fontSize: '18px', color: '#555' }}>
                O valor real era <strong>R$ {feedbackAtual.valorReal.toLocaleString('pt-BR')}</strong>.
              </p>
            </div>
          )}

          <div style={{ marginTop: '40px' }}>
            <button 
              onClick={proximaRodada}
              style={{ padding: '16px 40px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}
            >
              {rodadaAtual < 5 ? "Próxima Rodada ➡️" : "Ver Placar Final 🏆"}
            </button>
          </div>
        </div>
      )}

      {/* --- PASSO 4: RESULTADO FINAL DA PARTIDA (PLACAR) --- */}
      {passo === 4 && (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', color: '#2c3e50', marginTop: 0 }}>Fim de Jogo! 🏁</h2>
          
          <div style={{ backgroundColor: acertosPartida >= 3 ? '#e8f8f5' : '#fef9e7', padding: '30px', borderRadius: '12px', marginTop: '20px', border: acertosPartida >= 3 ? '2px solid #a3e4d7' : '2px solid #f9e79f' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>
              {acertosPartida === 5 ? 'Corretor de Elite! 🥇' : acertosPartida >= 3 ? 'Ótimo faro para negócios! 🥈' : 'Precisa estudar mais o mercado! 🥉'}
            </h3>
            
            <p style={{ fontSize: '18px', color: '#555' }}>
              Você acertou <strong>{acertosPartida} de 5</strong> imóveis nesta partida.
            </p>

            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', border: '1px dashed #ccc' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>Printe essa tela e mande para seus amigos:</p>
              <h4 style={{ margin: '10px 0 0 0', color: '#2980b9' }}>🎮 {nickname} fez {acertosPartida}/5 no DomusLaguna!</h4>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '25px' }}>
            <button 
              onClick={() => { setPasso(1); }} // Volta para a tela de filtros para jogar de novo
              style={{ padding: '16px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              Jogar Nova Partida 🔄
            </button>
            
            <button 
              onClick={() => navigate('/resultados')} 
              style={{ padding: '16px', background: 'transparent', border: '2px solid #27ae60', color: '#27ae60', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              Procurar imóveis reais para comprar 🔍
            </button>
          </div>
        </div>
      )}

    </div>
  );
}