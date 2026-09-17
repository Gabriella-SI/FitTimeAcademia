import React, { useState } from 'react';
import { 
  Dumbbell, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Check, 
  Star, 
  Users, 
  Trophy,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col antialiased selection:bg-red-600 selection:text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-wider text-white">
              fit<span className="text-red-600">.</span>time
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-zinc-300">
            <a href="#inicio" className="hover:text-red-500 transition-colors">Início</a>
            <a href="#modalidades" className="hover:text-red-500 transition-colors">Modalidades</a>
            <a href="#planos" className="hover:text-red-500 transition-colors">Planos</a>
            <a href="#unidades" className="hover:text-red-500 transition-colors">Unidades</a>
            <a href="#contato" className="hover:text-red-500 transition-colors">Contato</a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a 
              href="#planos" 
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-red-600/30 inline-block"
            >
              Matricule-se Já
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE NAV DROPDOWN */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 flex flex-col gap-4">
            <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Início</a>
            <a href="#modalidades" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Modalidades</a>
            <a href="#planos" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Planos</a>
            <a href="#unidades" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Unidades</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="text-zinc-300 py-2">Contato</a>
            <a 
              href="#planos" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-red-600 text-center text-white py-3 rounded-full font-bold mt-2"
            >
              Matricule-se Já
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative py-24 md:py-36 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-red-600/20 text-red-500 font-semibold text-xs tracking-widest uppercase px-3 py-1 rounded-full border border-red-600/30 mb-6">
              Sua evolução começa agora
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight uppercase mb-6">
              Transforme seu corpo na <span className="text-red-600">fit.time</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 mb-8 leading-relaxed">
              Estrutura de ponta, equipamentos modernos e acompanhamento profissional completo para você atingir seus objetivos com alta performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#planos" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/25"
              >
                Conheça os Planos <ChevronRight size={20} />
              </a>
              <a 
                href="#unidades" 
                className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 px-8 py-4 rounded-xl font-bold text-center transition-all"
              >
                Ver Unidades
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section id="modalidades" className="py-20 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
              Treine do seu jeito
            </h2>
            <p className="text-zinc-400">
              Modalidades pensadas para atender todas as idades e objetivos fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl hover:border-red-600/50 transition-all">
              <div className="bg-red-600/10 p-4 rounded-xl w-fit text-red-500 mb-6">
                <Dumbbell size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Musculação</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Área de peso livre completa, aparelhos biomecânicos modernos e instrutores sempre presentes.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl hover:border-red-600/50 transition-all">
              <div className="bg-red-600/10 p-4 rounded-xl w-fit text-red-500 mb-6">
                <Trophy size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cross Training</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Aulas dinâmicas em grupo para ganho de resistência, força e alto gasto calórico.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl hover:border-red-600/50 transition-all">
              <div className="bg-red-600/10 p-4 rounded-xl w-fit text-red-500 mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Aulas Coletivas</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Spinning, Ritmos, FitDance, Pilates e Muay Thai inclusos na sua rotina de treinos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
              Escolha seu plano
            </h2>
            <p className="text-zinc-400">
              Sem taxa de cancelamento abusiva e com acesso simplificado a todas as áreas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* PLANO FIT */}
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Plano Fit</h3>
                <p className="text-zinc-400 text-sm mb-6">Ideal para quem quer focar na musculação básica.</p>
                <div className="mb-6">
                  <span className="text-4xl font-black">R$ 89</span>
                  <span className="text-zinc-400">,90/mês</span>
                </div>
                <ul className="space-y-4 text-sm text-zinc-300 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="text-red-500" size={18} /> Acesso à musculação e aeróbico
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-red-500" size={18} /> Avaliação física inicial
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-red-500" size={18} /> Acesso a 1 unidade
                  </li>
                </ul>
              </div>
              <button className="w-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold py-3.5 rounded-xl transition-all">
                Matricular no Fit
              </button>
            </div>

            {/* PLANO VIP */}
            <div className="bg-gradient-to-b from-red-950/40 to-zinc-900 border-2 border-red-600 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl shadow-red-600/10">
              <span className="absolute -top-3.5 right-6 bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded-full">
                Mais Popular
              </span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Plano VIP</h3>
                <p className="text-zinc-400 text-sm mb-6">Acesso ilimitado e benefícios exclusivos.</p>
                <div className="mb-6">
                  <span className="text-4xl font-black">R$ 119</span>
                  <span className="text-zinc-400">,90/mês</span>
                </div>
                <ul className="space-y-4 text-sm text-zinc-300 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="text-red-500" size={18} /> Acesso ilimitado a todas as unidades
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-red-500" size={18} /> Aulas coletivas liberadas
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-red-500" size={18} /> Leve 1 acompanhante 5x por mês
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="text-red-500" size={18} /> Cadeira de massagem inclusa
                  </li>
                </ul>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/30">
                Matricular no VIP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES & HORÁRIOS */}
      <section id="unidades" className="py-20 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6">
                Onde nos encontrar
              </h2>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Unidades com excelente localização, estacionamento e ambiente climatizado para o seu melhor conforto.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-red-600/10 p-3 rounded-lg text-red-500 h-fit">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Unidade Central</h4>
                    <p className="text-zinc-400 text-sm">Av. Principal, 1000 — Centro</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-600/10 p-3 rounded-lg text-red-500 h-fit">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Horário de Funcionamento</h4>
                    <p className="text-zinc-400 text-sm">Segunda a Sexta: 05h às 23h</p>
                    <p className="text-zinc-400 text-sm">Sábados e Feriados: 08h às 16h</p>
                    <p className="text-zinc-400 text-sm">Domingos: 08h às 12h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Agende uma aula experimental</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Nome Completo</label>
                  <input type="text" placeholder="Seu nome" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">WhatsApp</label>
                  <input type="tel" placeholder="(00) 00000-0000" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600" />
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg transition-all mt-2">
                  Solicitar Agendamento
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="bg-zinc-950 border-t border-zinc-900 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-1.5 rounded-lg">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                fit<span className="text-red-600">.</span>time
              </span>
            </div>

            <div className="flex items-center gap-6 text-zinc-400">
              <a href="#" className="hover:text-red-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Phone size={20} /></a>
            </div>
          </div>

          <div className="pt-8 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} fit.time. Todos os direitos reservados.
          </div>
        </div>
      </footer>

    </div>
  );
}
