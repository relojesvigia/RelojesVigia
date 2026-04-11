/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
  Lock, 
  Sparkles, 
  Hourglass, 
  PenTool, 
  Menu, 
  X,
  Instagram,
  Twitter,
  Facebook,
  Star,
  Quote,
  Clock,
  Shield,
  UserCheck,
  MapPin
} from 'lucide-react';

// --- Types ---

type Page = 'home' | 'collection' | 'about' | 'personalize';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Inicio', value: 'home' },
    { label: 'Personalizar', value: 'personalize' },
    { label: 'Colección', value: 'collection' },
    { label: 'About', value: 'about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 flex justify-between items-center ${isScrolled ? 'bg-stone-950/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div 
        className="font-serif text-2xl tracking-[0.3em] text-on-surface cursor-pointer" 
        onClick={() => setPage('home')}
      >
        VIGIA
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => (
          <button
            key={link.value}
            onClick={() => setPage(link.value)}
            className={`font-serif tracking-[0.2em] uppercase text-xs transition-colors duration-300 ${
              currentPage === link.value 
                ? 'text-primary border-b border-primary pb-1' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block bg-primary text-on-primary px-8 py-2.5 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] transition-all hover:scale-105 hover:shadow-glow">
          COMPRA AHORA
        </button>
        <button 
          className="md:hidden text-on-surface"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-stone-950 border-b border-white/10 p-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setPage(link.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`font-serif tracking-[0.2em] uppercase text-lg text-left ${
                  currentPage === link.value ? 'text-primary' : 'text-secondary'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-serif tracking-[0.2em] uppercase text-xs w-full">
              COMPRA AHORA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="w-full py-20 px-6 md:px-12 border-t border-white/5 bg-stone-950">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
      <div className="flex flex-col gap-4">
        <span className="font-serif text-on-surface tracking-[0.3em] text-2xl">VIGIA</span>
        <p className="font-sans tracking-[0.15em] text-[10px] uppercase text-secondary max-w-xs leading-relaxed">
          Hecho para durar más que el tiempo. Cada pieza es un manifiesto de permanencia.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-x-12 gap-y-4">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">Navegación</span>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Inicio</a>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Colección</a>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">About</a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">Legal</span>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Términos</a>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Privacidad</a>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Cookies</a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">Soporte</span>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Contacto</a>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">WhatsApp</a>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">FAQ</a>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:items-end">
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <Instagram size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <Twitter size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <Facebook size={18} />
          </a>
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase text-outline">
          © 2024 VIGIA MONOLITH. HECHO EN MÉXICO.
        </div>
      </div>
    </div>
  </footer>
);

// --- Page Sections ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void, key?: string }) => {
  return (
    <motion.div 
      key="home-content"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Watch" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-primary tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block"
          >
            Horología de Precisión
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-8xl font-serif text-on-surface leading-tight mb-6 md:mb-8"
          >
            VIGIA: <span className="italic font-normal">El Legado</span> que se Lleva en la Muñeca
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hidden md:block text-secondary text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed"
          >
            No es solo un reloj, es la historia de tus momentos más valiosos capturada en acero y zafiro. Una pieza diseñada para trascender generaciones.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <button 
              onClick={() => setPage('collection')}
              className="bg-primary text-on-primary px-8 md:px-10 py-3.5 md:py-4 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:scale-105 hover:shadow-glow w-full sm:w-auto"
            >
              COMPRAR AHORA
            </button>
            <button className="border border-outline text-on-surface px-8 md:px-10 py-3.5 md:py-4 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:bg-white/5 w-full sm:w-auto">
              CONTACTAR A UN ASESOR
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-12 px-6">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <Shield size={14} className="text-primary" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-secondary">Garantía de 24 meses</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <UserCheck size={14} className="text-primary" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-secondary">Trato Personal</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <MapPin size={14} className="text-primary" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-secondary">Hecho en México</span>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">El Manifiesto</span>
          <h2 className="text-2xl md:text-6xl font-serif text-on-surface leading-tight mb-6 md:mb-8">
            Creamos relojes con significado. No para mostrar quién eres, sino para recordar lo que importa.
          </h2>
          <div className="w-16 md:w-20 h-[1px] bg-primary mb-6 md:mb-8" />
          <p className="text-secondary text-base md:text-lg font-light leading-relaxed">
            En un mundo de obsolescencia programada, elegimos la permanencia. Cada pieza VIGIA es un manifiesto contra lo efímero, una herramienta para medir no solo el tiempo, sino la vida misma.
          </p>
        </div>
        <div className="relative order-1 lg:order-2">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200" 
              alt="Craftsmanship" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-surface-low p-8 rounded-2xl border border-white/5 max-w-xs hidden md:block">
            <p className="text-secondary text-sm leading-relaxed italic">
              "Cada pieza es ensamblada a mano, asegurando que la precisión técnica se encuentre con la emoción humana."
            </p>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16 md:py-32 bg-surface-lowest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="bg-surface-low p-6 md:p-12 rounded-3xl border border-white/5 shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000" 
              alt="Modelo Carajo" 
              className="w-full h-auto rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">Colección Principal</span>
            <h2 className="text-3xl md:text-7xl font-serif text-on-surface mb-8 md:mb-12">Modelo Carajo</h2>
            
            <div className="grid grid-cols-2 gap-y-8 md:gap-y-12 gap-x-6 md:gap-x-8 mb-10 md:mb-16">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-outline block mb-2">Material</span>
                <span className="text-xl font-serif text-on-surface">316L Steel</span>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-outline block mb-2">Cristal</span>
                <span className="text-xl font-serif text-on-surface">Sapphire</span>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-outline block mb-2">Movimiento</span>
                <span className="text-xl font-serif text-on-surface">Automatic</span>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-outline block mb-2">Resistencia</span>
                <span className="text-xl font-serif text-on-surface">5 ATM</span>
              </div>
            </div>

            <button 
              onClick={() => setPage('collection')}
              className="group flex items-center gap-4 text-on-surface hover:text-primary transition-colors"
            >
              <span className="font-serif tracking-[0.3em] uppercase text-sm">Ver Producto</span>
              <div className="w-12 h-[1px] bg-outline group-hover:bg-primary transition-all group-hover:w-20" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-5xl font-serif italic mb-12 md:mb-20">Hazlo personal. <span className="text-primary font-normal not-italic">Hazlo permanente.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-serif text-white/5 mb-4 md:mb-6">01</span>
            <h3 className="text-lg md:text-xl font-serif tracking-[0.1em] uppercase mb-2 md:mb-4">Elige tu base</h3>
            <p className="text-secondary text-xs md:text-sm leading-relaxed max-w-xs">
              Selecciona entre nuestras configuraciones de acero, cueros y esferas minimalistas.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-serif text-white/5 mb-4 md:mb-6">02</span>
            <h3 className="text-lg md:text-xl font-serif tracking-[0.1em] uppercase mb-2 md:mb-4">Define el mensaje</h3>
            <p className="text-secondary text-xs md:text-sm leading-relaxed max-w-xs">
              Nombres, fechas o coordenadas. Grabado con precisión láser en el reverso o corona.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-serif text-white/5 mb-4 md:mb-6">03</span>
            <h3 className="text-lg md:text-xl font-serif tracking-[0.1em] uppercase mb-2 md:mb-4">Forja la herencia</h3>
            <p className="text-secondary text-xs md:text-sm leading-relaxed max-w-xs">
              Recibe una pieza única que guardará tu historia para las próximas generaciones.
            </p>
          </div>
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 h-auto md:h-[800px]">
          <div className="md:col-span-1 relative group overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800" alt="Parejas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Para Parejas</span>
            </div>
          </div>
          <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" alt="Hijos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">De Padres a Hijos</span>
            </div>
          </div>
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&q=80&w=1200" alt="Hitos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Hitos Personales</span>
            </div>
          </div>
          <div className="md:col-span-1 relative group overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1539533331302-7eb39159f5d8?auto=format&fit=crop&q=80&w=800" alt="Fechas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Fechas Eternas</span>
            </div>
          </div>
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1549463591-14cc58e15c3e?auto=format&fit=crop&q=80&w=1200" alt="Regalo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">El Regalo Perfecto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { name: "Carlos M.", text: "La calidad del acero y el acabado del grabado superaron mis expectativas. Es una pieza que mi hijo heredará.", stars: 5 },
            { name: "Elena R.", text: "El minimalismo absoluto. Buscaba algo sobrio pero con alma, y el servicio de personalización fue impecable.", stars: 5 },
            { name: "Javier L.", text: "Un regalo de aniversario que emocionó hasta las lágrimas. Gracias por cuidar tanto los detalles del empaque.", stars: 5 }
          ].map((t, i) => (
            <div key={i} className="bg-surface-low p-10 rounded-2xl border border-white/5 flex flex-col justify-between h-full">
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={12} className="fill-primary text-primary" />)}
                </div>
                <Quote className="text-primary/20 mb-4" size={32} />
                <p className="text-on-surface text-lg font-light leading-relaxed mb-8 italic">"{t.text}"</p>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">{t.name}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const CollectionPage = ({ key }: { key?: string }) => {
  return (
    <motion.div 
      key="collection-content"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-16 md:pt-32 pb-16 md:pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto"
    >
      <header className="mb-12 md:mb-20">
        <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block">Colección Actual</span>
        <h1 className="text-4xl md:text-8xl font-serif text-on-surface leading-none">Nuestros Monolitos</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-32">
        {/* Product 1 */}
        <div className="group bg-surface-low rounded-3xl p-6 md:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-white/5">
          <div className="flex justify-between items-start mb-8 md:mb-12">
            <div>
              <span className="text-[10px] font-serif tracking-widest text-primary mb-2 block uppercase">01 / Dark</span>
              <h2 className="text-2xl md:text-4xl font-serif text-on-surface mb-2">VIGIA 01</h2>
              <p className="text-secondary text-[10px] tracking-widest uppercase">Obsidian Black</p>
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000" 
              alt="Vigia 01 Black" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black border border-white/20 ring-2 ring-primary ring-offset-4 ring-offset-surface-low" />
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-stone-200 border border-white/20" />
            </div>
            <button className="flex items-center gap-3 md:gap-4 group/btn">
              <span className="font-serif tracking-[0.2em] uppercase text-[9px] md:text-[10px] text-on-surface group-hover/btn:text-primary transition-colors">Ver Producto</span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all">
                <ArrowRight size={12} className="group-hover/btn:text-on-primary" />
              </div>
            </button>
          </div>
        </div>

        {/* Product 2 */}
        <div className="group bg-surface-low rounded-3xl p-6 md:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-white/5">
          <div className="flex justify-between items-start mb-8 md:mb-12">
            <div>
              <span className="text-[10px] font-serif tracking-widest text-primary mb-2 block uppercase">02 / Light</span>
              <h2 className="text-2xl md:text-4xl font-serif text-on-surface mb-2">VIGIA 01</h2>
              <p className="text-secondary text-[10px] tracking-widest uppercase">Broken White</p>
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=1000" 
              alt="Vigia 01 White" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black border border-white/20" />
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-stone-200 border border-white/20 ring-2 ring-primary ring-offset-4 ring-offset-surface-low" />
            </div>
            <button className="flex items-center gap-3 md:gap-4 group/btn">
              <span className="font-serif tracking-[0.2em] uppercase text-[9px] md:text-[10px] text-on-surface group-hover/btn:text-primary transition-colors">Ver Producto</span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all">
                <ArrowRight size={12} className="group-hover/btn:text-on-primary" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <section className="border-t border-white/5 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-xl">
            <h3 className="text-4xl font-serif text-on-surface mb-4">Más diseños próximamente</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Nuestros artesanos están esculpiendo la próxima generación de legados. Formas que aún no tienen nombre, destinadas a ser eternas.
            </p>
          </div>
          <div className="px-6 py-3 bg-surface-highest rounded-full border border-white/5">
            <span className="font-serif tracking-[.25em] uppercase text-[10px] text-primary">Próximos Lanzamientos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Lock />, title: "VIGIA 02" },
            { icon: <Sparkles />, title: "VIGIA CHRONO" },
            { icon: <Hourglass />, title: "VIGIA NOIR" },
            { icon: <PenTool />, title: "EDICIÓN ESPECIAL" }
          ].map((item, i) => (
            <div key={i} className="aspect-[3/4] bg-surface-lowest rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-white/5 group hover:border-primary/30 transition-all">
              <div className="text-primary/40 mb-6 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <p className="font-serif tracking-[0.2em] uppercase text-[10px] text-outline mb-2">Coming soon</p>
              <h4 className="font-serif text-on-surface/30 text-xl">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const PersonalizePage = ({ key }: { key?: string }) => {
  const [engravingText, setEngravingText] = useState('PRIMERA EDICIÓN DE VIGIA');
  
  const suggestions = ['PARA SIEMPRE', 'NOSOTROS', '03.02.26'];

  return (
    <motion.div 
      key="personalize-content"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-16 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col"
    >
      {/* Global Header Section */}
      <div className="mb-12 md:mb-20 space-y-4 md:space-y-6 text-center md:text-left">
        <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block">GRABADO ARTESANAL</span>
        <h1 className="font-serif text-3xl md:text-7xl text-on-surface leading-[1.1] max-w-4xl">
          Escribe lo que quieres llevar contigo.
        </h1>
      </div>

      {/* Two-Column Content Layout */}
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        {/* Left Side: SVG Engraving Preview */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
          <div className="relative w-full aspect-square max-w-[450px] md:max-w-[550px] flex items-center justify-center">
            {/* Circular Background Placeholder */}
            <div className="absolute inset-0 rounded-full bg-surface-low/20 border border-white/5"></div>
            
            {/* Laser Engraving SVG Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <path d="M 200, 200 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" fill="none" id="engravingPath"></path>
                </defs>
                {/* Top Arc Text */}
                <text className="engraving-text fill-on-surface text-[15px]">
                  <textPath href="#engravingPath" startOffset="25%" textAnchor="middle">{engravingText || 'PRIMERA EDICIÓN DE VIGIA'}</textPath>
                </text>
                {/* Bottom Arc Text */}
                <text className="engraving-text fill-on-surface text-[15px]">
                  <textPath href="#engravingPath" startOffset="75%" textAnchor="middle">
                    AUT • JAP • 5 ATM   CARAJO 0010
                  </textPath>
                </text>
                {/* Circle Guides */}
                <circle cx="200" cy="200" fill="none" opacity="0.1" r="140" stroke="currentColor" strokeDasharray="4 8" strokeWidth="0.5"></circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Controls */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-12">
          <div className="space-y-8">
            {/* Minimal Input Design */}
            <div className="space-y-4">
              <label className="text-outline text-[10px] tracking-[0.2em] uppercase font-medium">TU MENSAJE (MAX. 20 CARACTERES)</label>
              <div className="relative group">
                <input 
                  className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-xl font-habibi tracking-widest text-primary focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/20 uppercase" 
                  maxLength={20} 
                  placeholder="EJ. PARA SIEMPRE" 
                  type="text"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                />
                <div className="absolute right-0 bottom-4 font-serif text-[10px] tracking-[0.2em] text-outline">
                  <span>{engravingText.length}</span> / 20
                </div>
              </div>
            </div>

            {/* Suggestion Pills */}
            <div className="space-y-4">
              <span className="text-outline text-[10px] tracking-[0.2em] uppercase block">SUGERENCIAS</span>
              <div className="flex flex-wrap gap-3">
                {suggestions.map((text) => (
                  <button 
                    key={text}
                    className="px-6 py-2 rounded-full border border-white/10 bg-surface-low/30 text-secondary text-[10px] tracking-[0.2em] uppercase hover:border-primary/50 hover:text-primary transition-all duration-300"
                    onClick={() => setEngravingText(text)}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-12">
            <button className="w-full md:w-80 bg-primary text-on-primary py-5 rounded-full font-bold tracking-[0.2em] hover:brightness-110 transition-all uppercase text-xs shadow-glow">
              CONTINUAR A COMPRA
            </button>

            {/* Laser Precision Section */}
            <div className="flex gap-4 max-w-md">
              <div className="pt-1">
                <Sparkles size={24} className="text-primary" />
              </div>
              <div className="space-y-1">
                <span className="text-on-surface text-[10px] tracking-[0.15em] uppercase font-bold block">PRECISIÓN LÁSER</span>
                <p className="text-outline text-[11px] leading-relaxed tracking-wide font-light">
                  Cada grabado es realizado con tecnología de fibra óptica de alta definición, garantizando legibilidad eterna en el acero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage = ({ key }: { key?: string }) => {
  return (
    <motion.div 
      key="about-content"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <section className="pt-16 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Nuestra Filosofía</span>
        <h1 className="text-3xl md:text-8xl font-serif text-on-surface leading-tight mb-8 md:mb-12">
          No creemos en el lujo como estatus. Creemos en <span className="italic font-normal">objetos</span> que guardan significado.
        </h1>
        <div className="w-20 md:w-32 h-[1px] bg-primary" />
      </section>

      <section className="py-16 md:py-32 bg-surface-lowest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=1000" 
              alt="Watch Internal" 
              className="w-full h-auto rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">El Diferenciador</span>
            <h2 className="text-2xl md:text-6xl font-serif text-on-surface mb-6 md:mb-8">
              El problema no es el precio alto. Es pagar por algo que no significa nada.
            </h2>
            <p className="text-secondary text-base md:text-lg font-light leading-relaxed">
              En un mundo de obsolescencia programada, elegimos la permanencia. Cada pieza VIGIA es un manifiesto contra lo efímero. No vendemos tiempo, vendemos el recipiente para tus recuerdos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div>
            <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">Nuestros Valores</span>
            <h2 className="text-2xl md:text-5xl font-serif text-on-surface">La herencia de lo esencial.</h2>
          </div>
          <p className="text-secondary italic font-serif text-sm md:text-base">"Hecho para durar más que el tiempo."</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Familia", icon: <Shield />, text: "El reloj no es tuyo; solo lo custodias para la siguiente generación." },
            { title: "Amor", icon: <Quote />, text: "Dedicación obsesiva en cada micro-ajuste, porque lo que se ama se cuida." },
            { title: "Integridad", icon: <UserCheck />, text: "Materiales nobles y procesos transparentes. Sin atajos, sin artificios." },
            { title: "Belleza cotidiana", icon: <Sparkles />, text: "Encontrar lo extraordinario en el segundero que marca el presente." }
          ].map((v, i) => (
            <div key={i} className="bg-surface-low p-8 md:p-10 rounded-2xl border border-white/5 flex flex-col gap-6 md:gap-8">
              <div className="text-primary">{v.icon}</div>
              <div>
                <h3 className="text-lg md:text-xl font-serif text-on-surface mb-3 md:mb-4">{v.title}</h3>
                <p className="text-secondary text-xs md:text-sm leading-relaxed">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-48 text-center px-6">
        <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Propósito Vital</span>
        <h2 className="text-3xl md:text-8xl font-serif text-on-surface mb-12 md:mb-16 max-w-5xl mx-auto">
          Crear objetos que duren más que el tiempo.
        </h2>
        <button className="border border-outline text-on-surface px-10 md:px-12 py-4 md:py-5 rounded-full font-serif tracking-[0.3em] uppercase text-[10px] md:text-xs hover:bg-white/5 transition-all">
          COMIENZA TU LEGADO
        </button>
      </section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage key="home" setPage={setPage} />}
          {page === 'collection' && <CollectionPage key="collection" />}
          {page === 'about' && <AboutPage key="about" />}
          {page === 'personalize' && <PersonalizePage key="personalize" />}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-950/90 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex gap-8 shadow-2xl items-center">
        <button onClick={() => setPage('home')} className={`${page === 'home' ? 'text-primary' : 'text-secondary'}`}>
          <Menu size={20} />
        </button>
        <button onClick={() => setPage('personalize')} className={`${page === 'personalize' ? 'text-primary' : 'text-secondary'}`}>
          <PenTool size={20} />
        </button>
        <button onClick={() => setPage('collection')} className={`${page === 'collection' ? 'text-primary' : 'text-secondary'}`}>
          <Clock size={20} />
        </button>
        <button onClick={() => setPage('about')} className={`${page === 'about' ? 'text-primary' : 'text-secondary'}`}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
