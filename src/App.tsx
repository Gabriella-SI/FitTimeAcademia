import { useEffect, useRef, useState, useCallback, forwardRef } from 'react'

const IMG = {
  hero: 'https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?w=1200&h=1600&fit=crop&auto=format',
  equipment: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=1400&h=900&fit=crop&auto=format',
  barbell: 'https://images.unsplash.com/photo-1521805103424-d8f8430e8933?w=700&h=1050&fit=crop&auto=format',
  woman: 'https://images.unsplash.com/photo-1722925541142-5db2668ca492?w=600&h=900&fit=crop&auto=format',
  rooftop: 'https://images.unsplash.com/photo-1611416457332-946853cc75d6?w=1600&h=900&fit=crop&auto=format',
  boxing: 'https://images.unsplash.com/photo-1546711076-85a7923432ab?w=700&h=900&fit=crop&auto=format',
  gym2: 'https://images.unsplash.com/photo-1722925541321-f52d45b29c17?w=600&h=900&fit=crop&auto=format',
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el))
    }, 150)
    return () => { clearTimeout(timer); observer.disconnect() }
  }, [])
}

/* ─── HEADER ─────────────────────────────────────────────────────────── */
function Header({ shrunk, menuOpen, setMenuOpen }: { shrunk: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const links = ['INÍCIO', 'A FIT.TIME', 'ESTRUTURA', 'MODALIDADES', 'PLANOS', 'CONTATO']
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
      style={{ paddingTop: shrunk ? '12px' : '20px', transition: 'padding 0.4s cubic-bezier(0.16,1,0.3,1)' }}
    >
      <div
        className="glass-mirror rounded-full flex items-center justify-between gap-8 px-6"
        style={{
          width: shrunk ? '94%' : '90%',
          maxWidth: 1100,
          height: shrunk ? 52 : 64,
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Logo */}
        <div className="font-display font-black text-xl tracking-widest text-white shrink-0 select-none">
          FIT<span className="text-accent">.</span>TIME
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <a
              key={l}
              href="#"
              className="font-display font-700 text-sm tracking-widest text-white/60 hover:text-accent transition-colors duration-200"
              style={{ fontWeight: 700 }}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#"
          className="hidden lg:flex btn-accent rounded-full px-6 py-2 text-sm items-center shrink-0"
        >
          QUERO TREINAR
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="absolute top-full left-4 right-4 mt-2 glass-mirror rounded-2xl overflow-hidden transition-all duration-500 lg:hidden"
        style={{ maxHeight: menuOpen ? '400px' : '0', opacity: menuOpen ? 1 : 0 }}
      >
        <div className="p-6 flex flex-col gap-4">
          {links.map(l => (
            <a key={l} href="#" className="font-display font-black text-2xl tracking-widest text-white/80 hover:text-accent transition-colors"
              onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#" className="btn-accent rounded-full px-6 py-3 text-center mt-2">QUERO TREINAR</a>
        </div>
      </div>
    </header>
  )
}

/* ─── HERO ────────────────────────────────────────────────────────────── */
const HeroSection = forwardRef<HTMLElement, {
  onMouseMove: (e: React.MouseEvent) => void
  mouse: { x: number; y: number }
}>(({ onMouseMove, mouse }, ref) => {
  const parallax = (fx: number, fy: number) => ({
    transform: `translate(${mouse.x * fx}px, ${mouse.y * fy}px)`,
    transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
  })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={onMouseMove}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#0d0d0d] to-[#111111]" />

      {/* Accent glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', right: '25%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(202,255,0,0.07) 0%, transparent 70%)',
          ...parallax(-30, -20),
        }}
      />

      {/* Hero image – positioned right side */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 max-md:w-full max-md:opacity-20"
        style={parallax(-15, -10)}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMG.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 80%, transparent 100%)',
          }}
        />
        {/* Dark tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] opacity-60" />
      </div>

      {/* Floating elements */}
      {/* Top-left: equipment tag */}
      <div
        className="absolute glass rounded-xl px-4 py-3 animate-float-slow pointer-events-none hidden sm:block"
        style={{ top: '22%', left: '4%', ...parallax(18, 12) }}
      >
        <div className="font-display font-black text-accent text-xl tracking-widest">MUSCULAÇÃO</div>
        <div className="font-display text-white/40 text-xs tracking-[0.3em] mt-0.5">PERFORMANCE</div>
      </div>

      {/* Left mid: number */}
      <div
        className="absolute pointer-events-none hidden sm:block"
        style={{ top: '55%', left: '3%', ...parallax(22, 8) }}
      >
        <div
          className="font-display font-black text-white/05 select-none"
          style={{ fontSize: 'clamp(80px,10vw,140px)', lineHeight: 1, WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}
        >
          01
        </div>
      </div>

      {/* Right top: rooftop tag */}
      <div
        className="absolute glass-mirror rounded-2xl px-4 py-3 animate-float pointer-events-none hidden md:block"
        style={{ top: '18%', right: '5%', animationDelay: '1.2s', ...parallax(-20, 15) }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-glow" />
          <div className="font-display font-black text-white text-xs tracking-[0.3em]">ROOFTOP</div>
        </div>
        <div className="font-display text-white/40 text-xs tracking-[0.2em] mt-1">CENTRO — CURITIBA</div>
      </div>

      {/* Right mid: hours floating panel */}
      <div
        className="absolute glass rounded-xl px-5 py-4 animate-float-reverse pointer-events-none hidden md:block"
        style={{ top: '45%', right: '3%', animationDelay: '0.5s', ...parallax(-25, -10) }}
      >
        <div className="font-display font-black text-white/30 text-xs tracking-[0.3em] mb-1">HORÁRIO</div>
        <div className="font-display font-black text-accent text-3xl tracking-wide">AMPLO</div>
        <div className="w-full h-px bg-white/10 my-2" />
        <div className="font-display text-white/50 text-xs tracking-[0.2em]">CENTRO DE CURITIBA</div>
      </div>

      {/* Bottom right: evolução */}
      <div
        className="absolute border border-accent/20 rounded-full px-5 py-2 animate-float pointer-events-none hidden md:block"
        style={{ bottom: '22%', right: '8%', animationDelay: '2s', ...parallax(-15, -18) }}
      >
        <div className="font-display font-black text-accent/70 text-sm tracking-[0.4em]">EVOLUÇÃO</div>
      </div>

      {/* Geometric circle */}
      <div
        className="absolute border border-white/05 rounded-full pointer-events-none hidden lg:block animate-spin-slow"
        style={{ width: 400, height: 400, top: '10%', right: '15%', ...parallax(-8, -5) }}
      />
      <div
        className="absolute border border-accent/10 rounded-full pointer-events-none hidden lg:block"
        style={{ width: 200, height: 200, top: '30%', right: '25%', ...parallax(-12, -8) }}
      />

      {/* Main content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-20 pt-32 pb-20 max-w-5xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-accent" />
          <span className="font-display font-700 text-accent/80 text-xs tracking-[0.4em]">ACADEMIA — CURITIBA/PR</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black leading-none mb-6"
          style={{ fontSize: 'clamp(56px, 11vw, 160px)' }}
        >
          <span className="block text-white">ESQUEÇA</span>
          <span className="block text-white">AS ACADEMIAS</span>
          <span className="block text-accent" style={{ WebkitTextStroke: '0px' }}>COMUNS.</span>
        </h1>

        {/* Sub */}
        <p className="font-display text-white/50 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed font-300 tracking-wide">
          Um ambiente diferenciado, equipamentos de qualidade e uma experiência feita para quem leva seu treino a sério.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a href="#" className="btn-accent rounded-full px-8 py-4 text-base">
            QUERO TREINAR
          </a>
          <a href="#" className="btn-ghost rounded-full px-8 py-4 text-base">
            CONHECER A FIT.TIME
          </a>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 mt-14 pt-8 border-t border-white/07">
          {[
            { n: '01', label: 'ROOFTOP' },
            { n: '∞', label: 'POSSIBILIDADES' },
            { n: 'CTR', label: 'CENTRO CURITIBA' },
          ].map(s => (
            <div key={s.n}>
              <div className="font-display font-black text-accent text-3xl">{s.n}</div>
              <div className="font-display text-white/40 text-xs tracking-[0.25em] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="font-display text-white text-xs tracking-[0.4em]">SCROLL</div>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
})
HeroSection.displayName = 'HeroSection'

/* ─── TICKER ─────────────────────────────────────────────────────────── */
function Ticker() {
  const items = ['FORÇA', 'TREINO', 'PERFORMANCE', 'DISCIPLINA', 'EVOLUÇÃO', 'ENERGIA', 'MUSCULAÇÃO', 'ROOFTOP']
  const repeated = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/07 py-4 bg-[#0a0a0a]">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {repeated.map((item, i) => (
          <span key={i} className="font-display font-black text-sm tracking-[0.4em] px-8 text-white/20">
            {item}
            <span className="text-accent ml-8">—</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── IMPACT SECTION ─────────────────────────────────────────────────── */
function ImpactSection() {
  return (
    <section className="relative py-32 px-6 sm:px-10 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#080808]" />
      {/* large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.025 }}
      >
        <span
          className="font-display font-black text-white"
          style={{ fontSize: 'clamp(100px, 25vw, 380px)', lineHeight: 1 }}
        >
          FT
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-4 reveal">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-accent/60" />
            <span className="font-display text-accent/60 text-xs tracking-[0.4em]">FILOSOFIA</span>
          </div>
        </div>

        <h2
          className="font-display font-black leading-none reveal delay-100"
          style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}
        >
          <span className="block text-white">TREINE DO</span>
          <span className="block text-accent">SEU JEITO.</span>
        </h2>
        <h2
          className="font-display font-black leading-none mt-2 reveal delay-200"
          style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}
        >
          <span className="block text-white/40">EVOLUA NO</span>
          <span className="block text-white/40">SEU RITMO.</span>
        </h2>

        {/* Decorative lines */}
        <div className="absolute top-1/2 right-0 w-40 h-px bg-gradient-to-l from-accent/30 to-transparent hidden lg:block" />
        <div className="absolute top-1/2 -translate-y-8 right-0 w-24 h-px bg-gradient-to-l from-white/10 to-transparent hidden lg:block" />

        {/* Small callout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          {[
            { n: '001', t: 'AMBIENTE', d: 'Diferenciado e pensado para performance' },
            { n: '002', t: 'EQUIPAMENTOS', d: 'Qualidade que exige o melhor de você' },
            { n: '003', t: 'EXPERIÊNCIA', d: 'Um nível acima do que você espera' },
          ].map((c, i) => (
            <div key={c.n} className={`reveal delay-${(i + 2) * 100}`}>
              <div className="font-display font-black text-accent/40 text-xs tracking-[0.4em] mb-2">{c.n}</div>
              <div className="font-display font-black text-white text-xl tracking-widest mb-2">{c.t}</div>
              <div className="text-white/40 text-sm leading-relaxed">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT SECTION ──────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-20 overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div>
          <div className="flex items-center gap-3 mb-8 reveal">
            <div className="w-8 h-px bg-accent" />
            <span className="font-display text-accent/80 text-xs tracking-[0.4em]">A FIT.TIME</span>
          </div>
          <h2
            className="font-display font-black leading-none mb-8 reveal delay-100"
            style={{ fontSize: 'clamp(40px, 6vw, 90px)' }}
          >
            <span className="block text-white">ESQUEÇA AS</span>
            <span className="block text-accent">ACADEMIAS</span>
            <span className="block text-white">COMUNS.</span>
          </h2>
          <p className="text-white/50 leading-relaxed text-base mb-8 max-w-md reveal delay-200">
            A Fit.Time nasceu para quem exige mais. Um espaço construído com propósito,
            onde cada detalhe foi pensado para elevar a sua performance e transformar o seu treino em uma experiência única.
          </p>
          <p className="text-white/40 leading-relaxed text-sm max-w-md reveal delay-300">
            No coração do Centro de Curitiba, com estrutura de rooftop, equipamentos premium e um ambiente que inspira.
          </p>

          {/* Address as visual composition */}
          <div className="mt-12 reveal delay-400">
            <div className="glass-mirror rounded-2xl p-6 max-w-sm relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(202,255,0,0.15), transparent 70%)' }}
              />
              <div className="font-display font-black text-accent/60 text-xs tracking-[0.4em] mb-3">LOCALIZAÇÃO</div>
              <div className="font-display font-black text-white text-xl tracking-wide mb-1">
                R. VISCONDE DE NÁCAR
              </div>
              <div className="font-display font-black text-accent text-2xl tracking-wider mb-3">
                1322
              </div>
              <div className="w-full h-px bg-white/08 mb-3" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-glow" />
                <span className="font-display text-white/50 text-xs tracking-[0.2em]">CENTRO — CURITIBA/PR</span>
              </div>

              {/* Mini abstract map grid */}
              <div className="mt-4 grid grid-cols-4 grid-rows-3 gap-1 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-sm"
                    style={{ background: i === 5 ? 'var(--accent)' : 'rgba(255,255,255,0.2)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: image composition */}
        <div className="relative h-[500px] lg:h-[680px] reveal-right delay-100">
          {/* Main image */}
          <div className="absolute top-0 right-0 w-3/4 h-4/5 rounded-2xl overflow-hidden">
            <img src={IMG.barbell} alt="Equipamentos Fit.Time" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>
          {/* Overlay card */}
          <div className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-2xl overflow-hidden">
            <img src={IMG.woman} alt="Treino Fit.Time" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
          </div>
          {/* Number accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            <div
              className="font-display font-black text-white/03"
              style={{ fontSize: 200, lineHeight: 1, WebkitTextStroke: '1px rgba(202,255,0,0.08)' }}
            >
              FT
            </div>
          </div>
          {/* Floating label */}
          <div className="absolute top-6 left-6 glass rounded-xl px-4 py-3">
            <div className="font-display font-black text-accent text-xs tracking-[0.3em]">PERFORMANCE</div>
            <div className="font-display text-white/40 text-xs tracking-[0.2em] mt-0.5">EQUIPAMENTOS</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── STRUCTURE SECTION ──────────────────────────────────────────────── */
function StructureSection() {
  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4 reveal">
              <div className="w-8 h-px bg-accent" />
              <span className="font-display text-accent/80 text-xs tracking-[0.4em]">ESTRUTURA</span>
            </div>
            <h2
              className="font-display font-black leading-none reveal delay-100"
              style={{ fontSize: 'clamp(36px, 6vw, 84px)' }}
            >
              <span className="block text-white">UM AMBIENTE</span>
              <span className="block text-accent">DIFERENTE.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed reveal delay-200">
            Cada metro quadrado pensado para você treinar com foco, energia e resultado.
          </p>
        </div>

        {/* Asymmetric image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={{ gridTemplateRows: 'auto' }}>
          {/* Large main image */}
          <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative group reveal" style={{ height: 400 }}>
            <img
              src={IMG.equipment}
              alt="Equipamentos"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="font-display font-black text-accent text-xs tracking-[0.4em] mb-1">EQUIPAMENTOS</div>
              <div className="font-display font-black text-white text-2xl">PREMIUM</div>
            </div>
            {/* Glass card overlay */}
            <div className="absolute top-6 right-6 glass rounded-xl px-4 py-3">
              <div className="font-display text-white/60 text-xs tracking-[0.3em]">AMBIENTE</div>
            </div>
          </div>

          {/* Vertical image */}
          <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden relative group reveal delay-100" style={{ height: 'auto', minHeight: 400 }}>
            <img
              src={IMG.gym2}
              alt="Estrutura"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-4 right-4">
              <div className="font-display font-black text-accent text-xs tracking-[0.3em] mb-1">TREINO</div>
              <div className="font-display font-black text-white text-xl leading-tight">PERFORMANCE<br/>REAL</div>
            </div>
          </div>

          {/* Small bottom-left */}
          <div className="col-span-1 rounded-2xl overflow-hidden relative group reveal delay-200" style={{ height: 220 }}>
            <img
              src={IMG.boxing}
              alt="Muay Thai"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <div className="font-display font-black text-accent text-xs tracking-[0.3em] mb-0.5">MUAY THAI</div>
              <div className="font-display font-black text-white text-sm">LUTA</div>
            </div>
          </div>

          {/* Info card */}
          <div className="col-span-1 glass-mirror rounded-2xl p-6 flex flex-col justify-between reveal delay-300" style={{ height: 220 }}>
            <div className="font-display font-black text-accent/60 text-xs tracking-[0.4em]">DESTAQUE</div>
            <div>
              <div
                className="font-display font-black text-white leading-none"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
              >
                ROOF<span className="text-accent">TOP</span>
              </div>
              <div className="font-display text-white/40 text-xs tracking-[0.2em] mt-2">TREINO COM OUTRA VISTA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── ROOFTOP SECTION ────────────────────────────────────────────────── */
function RooftopSection() {
  const ref = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current || !imgRef.current) return
      const rect = ref.current.getBoundingClientRect()
      const progress = 1 - Math.max(0, Math.min(1, rect.top / window.innerHeight))
      imgRef.current.style.transform = `scale(${1 + progress * 0.08}) translateY(${(1 - progress) * 40}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG image with parallax */}
      <div
        ref={imgRef}
        className="absolute inset-0 transition-transform duration-100"
        style={{ willChange: 'transform' }}
      >
        <img src={IMG.rooftop} alt="Rooftop Fit.Time" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/30" />
      </div>

      {/* Mask reveal line */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-20 py-32 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8 reveal">
          <div className="w-8 h-px bg-accent" />
          <span className="font-display text-accent/80 text-xs tracking-[0.4em]">ROOFTOP</span>
        </div>

        <h2
          className="font-display font-black leading-none mb-6 reveal delay-100"
          style={{ fontSize: 'clamp(48px, 10vw, 140px)' }}
        >
          <span className="block text-white">TREINO COM</span>
          <span className="block text-accent">OUTRA VISTA.</span>
        </h2>

        <p className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed reveal delay-200">
          O único treino onde a vista faz parte da experiência. No coração de Curitiba, com o horizonte da cidade como pano de fundo.
        </p>

        <div className="flex flex-wrap gap-4 items-center reveal delay-300">
          <a href="#" className="btn-accent rounded-full px-8 py-4 text-base">QUERO TREINAR</a>
          <div className="glass rounded-full px-6 py-4">
            <span className="font-display font-black text-white/70 text-xs tracking-[0.4em]">CENTRO DE CURITIBA/PR</span>
          </div>
        </div>

        {/* Floating stat */}
        <div className="absolute top-40 right-8 glass-mirror rounded-2xl p-6 hidden lg:block reveal-right delay-200">
          <div className="font-display font-black text-accent text-xs tracking-[0.4em] mb-2">EXCLUSIVO</div>
          <div className="font-display font-black text-white text-4xl leading-none">ROOF</div>
          <div className="font-display font-black text-accent text-4xl leading-none">TOP</div>
          <div className="w-full h-px bg-white/10 my-3" />
          <div className="font-display text-white/40 text-xs tracking-[0.2em]">NÍVEL ACIMA</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  )
}

/* ─── MODALITIES SECTION ─────────────────────────────────────────────── */
function ModalidadesSection() {
  const mods = [
    {
      title: 'MUSCULAÇÃO',
      desc: 'Equipamentos premium, ambiente profissional e treinos sob medida para o seu corpo e objetivo.',
      img: IMG.barbell,
      accent: true,
      size: 'large',
    },
    {
      title: 'PILATES',
      desc: 'Força, flexibilidade e controle. Método completo para corpo e mente.',
      img: null,
      accent: false,
      size: 'text',
    },
    {
      title: 'MUAY THAI',
      desc: 'Arte marcial completa. Condicionamento físico, técnica e disciplina.',
      img: IMG.boxing,
      accent: false,
      size: 'medium',
    },
    {
      title: 'AERÓBICOS',
      desc: 'Cardio e condicionamento com alta energia para quem quer mais.',
      img: null,
      accent: false,
      size: 'mirror',
    },
  ]

  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4 reveal">
          <div className="w-8 h-px bg-accent" />
          <span className="font-display text-accent/80 text-xs tracking-[0.4em]">MODALIDADES</span>
        </div>
        <h2
          className="font-display font-black leading-none mb-16 reveal delay-100"
          style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
        >
          <span className="block text-white">O QUE VOCÊ</span>
          <span className="block text-accent">ESCOLHE.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Musculação – large photo */}
          <div className="md:row-span-2 rounded-2xl overflow-hidden relative group reveal" style={{ minHeight: 500 }}>
            <img
              src={IMG.barbell}
              alt="Musculação"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="font-display font-black text-accent text-xs tracking-[0.4em] mb-2">01</div>
              <div className="font-display font-black text-white leading-none mb-3" style={{ fontSize: 'clamp(32px,4vw,56px)' }}>
                MUSCU<br/>LAÇÃO
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Equipamentos premium, ambiente profissional e treinos sob medida.
              </p>
            </div>
          </div>

          {/* Pilates – pure typography */}
          <div className="rounded-2xl border border-white/07 p-8 flex flex-col justify-between group hover:border-accent/30 transition-colors duration-300 reveal delay-100" style={{ minHeight: 220 }}>
            <div className="font-display font-black text-accent/40 text-xs tracking-[0.4em]">02</div>
            <div>
              <div
                className="font-display font-black text-white leading-none mb-2 group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
              >
                PILATES
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Força, flexibilidade e controle. Método completo.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-px bg-accent" />
              <span className="font-display text-accent text-xs tracking-[0.3em]">SAÚDE</span>
            </div>
          </div>

          {/* Muay Thai – photo card */}
          <div className="rounded-2xl overflow-hidden relative group reveal delay-200" style={{ minHeight: 220 }}>
            <img
              src={IMG.boxing}
              alt="Muay Thai"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="font-display font-black text-accent/60 text-xs tracking-[0.4em]">03</div>
              <div>
                <div className="font-display font-black text-white text-3xl leading-none mb-2">MUAY THAI</div>
                <p className="text-white/50 text-sm">Arte marcial. Disciplina. Performance.</p>
              </div>
            </div>
          </div>

          {/* Aeróbicos – mirror card */}
          <div className="glass-mirror rounded-2xl p-8 flex flex-col justify-between reveal delay-300" style={{ minHeight: 180 }}>
            <div className="font-display font-black text-accent/40 text-xs tracking-[0.4em]">04</div>
            <div>
              <div
                className="font-display font-black leading-none mb-2"
                style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
              >
                <span className="text-white">AERÓ</span><span className="text-accent">BICOS</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">Cardio e condicionamento de alto nível.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SCHEDULE SECTION ───────────────────────────────────────────────── */
function HorarioSection() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const hh = time.getHours().toString().padStart(2, '0')
  const mm = time.getMinutes().toString().padStart(2, '0')
  const ss = time.getSeconds().toString().padStart(2, '0')

  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#080808]" />
      {/* Grid lines decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(202,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(202,255,0,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4 reveal">
          <div className="w-8 h-px bg-accent" />
          <span className="font-display text-accent/80 text-xs tracking-[0.4em]">HORÁRIO</span>
        </div>
        <h2
          className="font-display font-black leading-none mb-16 reveal delay-100"
          style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
        >
          <span className="block text-white">SEU HORÁRIO.</span>
          <span className="block text-accent">SEU TREINO.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Live clock */}
          <div className="reveal delay-100">
            <div className="glass-mirror rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(202,255,0,0.1), transparent 70%)' }}
              />
              <div className="font-display font-black text-accent/40 text-xs tracking-[0.4em] mb-4">AGORA</div>
              <div
                className="font-display font-black text-accent leading-none mb-2 tabular-nums"
                style={{ fontSize: 'clamp(56px, 10vw, 120px)', letterSpacing: '0.02em' }}
              >
                {hh}:{mm}
              </div>
              <div
                className="font-display font-black text-white/20 tabular-nums"
                style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}
              >
                :{ss}
              </div>
              <div className="w-full h-px bg-white/08 my-6" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-glow" />
                <span className="font-display text-white/50 text-xs tracking-[0.3em]">CURITIBA — BRASIL</span>
              </div>
            </div>
          </div>

          {/* Schedule info */}
          <div className="reveal delay-200">
            <p className="text-white/50 text-base leading-relaxed mb-8">
              A Fit.Time possui horário amplo para que você possa treinar no momento que melhor se encaixa na sua rotina. Consulte nossa grade completa de horários.
            </p>

            {/* Schedule placeholder rows */}
            <div className="flex flex-col gap-3">
              {[
                { day: 'SEG — SEX', hours: 'Consulte os horários' },
                { day: 'SÁBADO', hours: 'Consulte os horários' },
                { day: 'DOMINGO', hours: 'Consulte os horários' },
              ].map((h, i) => (
                <div
                  key={h.day}
                  className={`flex items-center justify-between p-4 rounded-xl border border-white/07 hover:border-accent/30 transition-colors duration-300 reveal delay-${(i + 3) * 100}`}
                >
                  <span className="font-display font-black text-white/80 text-sm tracking-widest">{h.day}</span>
                  <span className="font-display text-accent/60 text-xs tracking-[0.2em]">{h.hours}</span>
                </div>
              ))}
            </div>

            <a href="#" className="btn-accent rounded-full px-8 py-4 text-sm mt-8 inline-block reveal delay-600">
              CONSULTAR HORÁRIOS
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── PLANS SECTION ──────────────────────────────────────────────────── */
function PlanosSection() {
  const plans = [
    {
      id: '01',
      name: 'MENSAL',
      highlight: false,
      features: ['Acesso à academia', 'Musculação completa', 'Aeróbicos', 'Horário amplo'],
    },
    {
      id: '02',
      name: 'TRIMESTRAL',
      highlight: true,
      features: ['Tudo do Mensal', 'Acesso ao Rooftop', 'Pilates', 'Desconto progressivo'],
    },
    {
      id: '03',
      name: 'ANUAL',
      highlight: false,
      features: ['Tudo do Trimestral', 'Muay Thai incluso', 'Prioridade de matrícula', 'Melhor custo-benefício'],
    },
  ]

  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4 reveal">
          <div className="w-8 h-px bg-accent" />
          <span className="font-display text-accent/80 text-xs tracking-[0.4em]">PLANOS</span>
        </div>
        <h2
          className="font-display font-black leading-none mb-6 reveal delay-100"
          style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
        >
          <span className="block text-white">ESCOLHA</span>
          <span className="block text-accent">O SEU PLANO.</span>
        </h2>
        <p className="text-white/40 text-sm max-w-lg mb-16 reveal delay-200">
          Consulte nossos valores e condições diretamente com a academia. Os preços são personalizados para o seu objetivo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden reveal delay-${(i + 1) * 100} transition-transform duration-300 hover:-translate-y-2 ${
                plan.highlight
                  ? 'border border-accent/40'
                  : 'border border-white/07'
              }`}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(135deg, rgba(202,255,0,0.06) 0%, rgba(202,255,0,0.02) 100%)'
                  : 'rgba(255,255,255,0.02)',
              }}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              )}
              {plan.highlight && (
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right, rgba(202,255,0,0.12), transparent 70%)' }}
                />
              )}

              <div>
                <div className="font-display font-black text-accent/40 text-xs tracking-[0.4em] mb-2">{plan.id}</div>
                <div
                  className={`font-display font-black leading-none ${plan.highlight ? 'text-accent' : 'text-white'}`}
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  {plan.name}
                </div>
              </div>

              {/* Price placeholder */}
              <div className="flex items-end gap-2">
                <div className="font-display font-black text-white/20 text-5xl leading-none">—</div>
                <div className="font-display text-white/30 text-xs tracking-[0.2em] mb-2">CONSULTE</div>
              </div>

              <div className="w-full h-px bg-white/07" />

              <ul className="flex flex-col gap-3">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${plan.highlight ? 'bg-accent' : 'bg-white/30'}`} />
                    <span className="font-display text-white/60 text-sm tracking-wide">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-auto rounded-full px-6 py-3 text-sm text-center font-display font-black tracking-widest transition-all duration-300 ${
                  plan.highlight
                    ? 'btn-accent'
                    : 'btn-ghost'
                }`}
              >
                QUERO COMEÇAR
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── HORIZONTAL SCROLL SECTION ──────────────────────────────────────── */
const HorizontalSection = forwardRef<HTMLDivElement, { trackRef: React.RefObject<HTMLDivElement | null> }>(
  ({ trackRef }, ref) => {
    const words = [
      { text: 'FORÇA', img: IMG.barbell, type: 'photo' },
      { text: 'TREINO', img: null, type: 'text' },
      { text: 'PERFORMANCE', img: IMG.woman, type: 'photo' },
      { text: 'DISCIPLINA', img: null, type: 'mirror' },
      { text: 'EVOLUÇÃO', img: null, type: 'accent' },
    ]

    return (
      <div ref={ref} className="h-scroll-outer relative bg-[#080808]">
        {/* Label */}
        <div className="absolute top-8 left-6 sm:left-10 lg:left-20 z-10 hidden md:flex items-center gap-3">
          <div className="w-8 h-px bg-accent" />
          <span className="font-display text-accent/80 text-xs tracking-[0.4em]">MANIFESTO</span>
        </div>

        <div className="h-scroll-sticky">
          <div ref={trackRef} className="h-scroll-track items-center gap-4 px-6 sm:px-10 md:px-20">
            {words.map((w, i) => (
              <div
                key={w.text}
                className="shrink-0 h-full flex items-center justify-center"
                style={{ width: w.type === 'text' || w.type === 'accent' ? '40vw' : '55vw', scrollSnapAlign: 'start' }}
              >
                {w.type === 'photo' && (
                  <div className="relative w-full h-[70vh] max-h-[600px] rounded-2xl overflow-hidden group">
                    <img src={w.img!} alt={w.text} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <div
                        className="font-display font-black text-white leading-none"
                        style={{ fontSize: 'clamp(48px, 6vw, 90px)' }}
                      >
                        {w.text}
                      </div>
                      <div className="w-12 h-1 bg-accent mt-3 rounded-full" />
                    </div>
                  </div>
                )}
                {w.type === 'text' && (
                  <div className="text-center">
                    <div className="font-display font-black text-white/07 select-none" style={{ fontSize: 'clamp(80px, 14vw, 200px)', lineHeight: 0.9, WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                      {w.text}
                    </div>
                  </div>
                )}
                {w.type === 'mirror' && (
                  <div className="glass-mirror rounded-2xl flex items-center justify-center w-full" style={{ height: '50vh', maxHeight: 420 }}>
                    <div
                      className="font-display font-black text-white leading-none text-center"
                      style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
                    >
                      {w.text}
                    </div>
                  </div>
                )}
                {w.type === 'accent' && (
                  <div className="text-center">
                    <div
                      className="font-display font-black text-accent leading-none"
                      style={{ fontSize: 'clamp(64px, 10vw, 150px)', lineHeight: 0.85 }}
                    >
                      {w.text}
                    </div>
                    <div className="font-display text-white/30 text-xs tracking-[0.5em] mt-6">SEU PRÓXIMO NÍVEL</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)
HorizontalSection.displayName = 'HorizontalSection'

/* ─── FINAL CTA ──────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.equipment} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]" />
      </div>

      {/* Glow behind CTA */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(202,255,0,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Floating elements */}
      <div className="absolute top-20 left-8 glass rounded-xl px-4 py-3 animate-float-slow hidden md:block">
        <div className="font-display font-black text-accent text-xs tracking-[0.3em]">FORÇA</div>
      </div>
      <div className="absolute bottom-24 right-8 glass rounded-xl px-4 py-3 animate-float hidden md:block" style={{ animationDelay: '1.5s' }}>
        <div className="font-display font-black text-white/60 text-xs tracking-[0.3em]">DISCIPLINA</div>
      </div>
      <div className="absolute top-1/3 right-6 animate-float-reverse hidden lg:block" style={{ animationDelay: '0.8s' }}>
        <div className="font-display font-black text-white/04 text-8xl" style={{ WebkitTextStroke: '1px rgba(202,255,0,0.1)' }}>FT</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <div className="flex items-center justify-center gap-3 mb-8 reveal">
          <div className="w-8 h-px bg-accent" />
          <span className="font-display text-accent/80 text-xs tracking-[0.4em]">FIT.TIME — CURITIBA</span>
          <div className="w-8 h-px bg-accent" />
        </div>

        <h2
          className="font-display font-black leading-none mb-8 reveal delay-100"
          style={{ fontSize: 'clamp(56px, 13vw, 180px)' }}
        >
          <span className="block text-white">SEU PRÓXIMO</span>
          <span className="block text-accent">NÍVEL</span>
          <span className="block text-white">COMEÇA AQUI.</span>
        </h2>

        <p className="text-white/50 text-base max-w-md mx-auto mb-10 leading-relaxed reveal delay-200">
          Junte-se a quem escolheu um nível diferente de treino. Venha conhecer a Fit.Time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal delay-300">
          <a href="#" className="btn-accent rounded-full px-10 py-5 text-base w-full sm:w-auto">
            QUERO TREINAR NA FIT.TIME
          </a>
          <a href="#" className="btn-ghost rounded-full px-10 py-5 text-base w-full sm:w-auto">
            R. VISCONDE DE NÁCAR, 1322
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/07 px-6 sm:px-10 lg:px-20 py-12 bg-[#080808]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        <div>
          <div className="font-display font-black text-2xl tracking-widest mb-2">
            FIT<span className="text-accent">.</span>TIME
          </div>
          <div className="font-display text-white/30 text-xs tracking-[0.3em]">CENTRO — CURITIBA/PR</div>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <div className="font-display font-black text-white/60 text-xs tracking-[0.3em]">R. VISCONDE DE NÁCAR, 1322</div>
          <div className="font-display text-white/30 text-xs tracking-[0.3em]">CENTRO — CURITIBA/PR — BRASIL</div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/05 flex justify-between items-center flex-wrap gap-4">
        <div className="font-display text-white/20 text-xs tracking-[0.2em]">© 2024 FIT.TIME. TODOS OS DIREITOS RESERVADOS.</div>
        <div className="font-display text-white/20 text-xs tracking-[0.2em]">FORCE · DISCIPLINE · EVOLUTION</div>
      </div>
    </footer>
  )
}

/* ─── ROOT ───────────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerShrunk, setHeaderShrunk] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setHeaderShrunk(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Horizontal scroll driver
  useEffect(() => {
    const section = horizontalRef.current
    const track = horizontalTrackRef.current
    if (!section || !track) return

    const isMobile = () => window.innerWidth < 768

    const onScroll = () => {
      if (isMobile()) {
        track.style.transform = ''
        return
      }
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (section.offsetHeight - window.innerHeight)))
      const maxShift = track.scrollWidth - window.innerWidth
      track.style.transform = `translateX(-${progress * maxShift}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onHeroMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width * 60,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height * 40,
    })
  }, [])

  return (
    <div className="bg-[#080808] text-white overflow-x-hidden">
      <Header shrunk={headerShrunk} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection ref={heroRef} onMouseMove={onHeroMouseMove} mouse={mouse} />
      <Ticker />
      <ImpactSection />
      <AboutSection />
      <StructureSection />
      <RooftopSection />
      <ModalidadesSection />
      <HorarioSection />
      <PlanosSection />
      <HorizontalSection ref={horizontalRef} trackRef={horizontalTrackRef} />
      <FinalCTA />
      <Footer />
    </div>
  )
}
