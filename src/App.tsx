import React, { useState } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-screen h-auto bg-black text-white font-sans overflow-x-hidden relative">
      
      {/* HEADER / NAVBAR */}
      <header className="w-full bg-black/90 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 6.5h11M6.5 17.5h11M4 9v6m16-6v6M2 11v2m20-2v2M8 5v14m8-14v14" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-wider text-white">
              fit<span className="text-red-600">.</span>time
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-zinc-300">
            <a href="#inicio" className="hover:text-red-500 transition-colors">Início</a>
            <a href="#modalidades" className="hover:text-red-500 transition-colors">Modalidades</a>
            <a href="#planos" className="hover:text-red-500 transition-colors">Planos</a>
            <a href="#unidades" className="hover:text-red-500 transition-colors">Unidades</a>
            <a href="#contato" className="hover:text-red-500 transition-colors">Contato</a>
          </nav>

          <div className="hidden md:block">
            <a 
              href="#planos" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-red-600/30"
            >
              Matricule-se Já
            </a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white p-2"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex flex-col gap-4">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-1">Início</a>
            <a href="#modalidades" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-1">Modalidades</a>
            <a href="#planos" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-1">Planos</a>
            <a href="#unidades" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-1">Unidades</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-1">Contato</a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="w-full py-16 md:py-28 px-6 lg:px-12 flex flex-col justify-center items-start relative bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-3xl">
          <span className="inline-block bg-red-600/20 text-red-500 font-bold text-xs tracking-widest uppercase px-3 py-1 rounded-full border border-red-600/30 mb-4">
            Sua evolução começa agora
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight mb-6">
            Transforme seu corpo na <span className="text-red-600">fit.time</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-xl mb-8 leading-relaxed">
            Estrutura de ponta, equipamentos modernos e acompanhamento profissional completo para você atingir seus objetivos com alta performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#planos" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-center transition-all shadow-lg shadow-red-600/30"
            >
              Conheça os Planos
            </a>
            <a 
              href="#unidades" 
              className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-8 py-4 rounded-xl font-bold text-center transition-all"
            >
              Ver Unidades
            </a>
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section id="modalidades" className="w-full py-20 px-6 lg:px-12 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Modalidades</h2>
            <p className="text-zinc-400">Variedade de treinos adaptados para todos os níveis e objetivos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">Musculação</h3>
              <p className="text-zinc-400 text-sm">Equipamentos biomecânicos de última geração e acompanhamento técnico.</p>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">Cross Training</h3>
              <p className="text-zinc-400 text-sm">Treinos funcionais de alta intensidade em áreas preparadas.</p>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">Aulas Coletivas</h3>
              <p className="text-zinc-400 text-sm">Spinning, Pilates, Dança e Artes Marciais inclusas no seu plano.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="w-full py-20 px-6 lg:px-12 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Planos e Mensalidades</h2>
            <p className="text-zinc-400">Escolha a opção ideal para a sua rotina.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Plano Fit</h3>
                <p className="text-zinc-400 text-sm mb-6">Acesso à musculação e área aeróbica.</p>
                <div className="text-4xl font-black mb-6">R$ 89,90<span className="text-sm font-normal text-zinc-400">/mês</span></div>
              </div>
              <button className="w-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold py-3 rounded-xl transition-all">
                Matricular no Fit
              </button>
            </div>

            <div className="bg-gradient-to-b from-red-950/30 to-zinc-900 border-2 border-red-600 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Plano VIP</h3>
                <p className="text-zinc-400 text-sm mb-6">Acesso total a todas as modalidades e unidades.</p>
                <div className="text-4xl font-black mb-6">R$ 119,90<span className="text-sm font-normal text-zinc-400">/mês</span></div>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all">
                Matricular no VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="w-full py-10 px-6 bg-black border-t border-zinc-900 text-center text-zinc-500 text-xs">
        <p>© {new Date().getFullYear()} fit.time. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}
