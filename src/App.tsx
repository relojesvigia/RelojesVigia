/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { createCheckout, getLiveVariantInfo, getCart, createCart, addToCart, removeFromCart } from './lib/shopify';
import { motion, AnimatePresence } from 'motion/react';

import { Page } from './types';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import WarrantyPage from './pages/WarrantyPage';
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
  MapPin,
  Truck,
  ShoppingBag,
  Trash2,
  Loader2
} from 'lucide-react';

// --- Components ---

const Navbar = ({ currentPage, setPage, cartItemCount, onOpenCart }: { currentPage: Page, setPage: (p: Page) => void, cartItemCount: number, onOpenCart: () => void }) => {
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
    { label: 'Relojes', value: 'collection' },
    { label: 'Nosotros', value: 'nosotros' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 flex justify-between items-center ${isScrolled || currentPage === 'modelo-carajo' ? 'bg-stone-950/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="md:hidden w-8" /> {/* Spacer for mobile centering */}
      
      <div 
        className="font-habibi text-2xl tracking-[0.05em] text-on-surface cursor-pointer absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0" 
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
                ? 'text-primary' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="Abrir carrito" onClick={onOpenCart} className="relative text-on-surface hover:text-primary transition-colors p-2 md:mr-2">
          <ShoppingBag size={20} />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-on-primary text-[10px] rounded-full flex items-center justify-center font-bold shadow-glow">
              {cartItemCount}
            </span>
          )}
        </button>
        <button 
          aria-label="Menú móvil"
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
            <button 
              onClick={() => { setPage('collection'); setIsMobileMenuOpen(false); }} 
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-serif tracking-[0.2em] uppercase text-xs w-full"
            >
              COMPRA AHORA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="w-full py-20 px-6 md:px-12 border-t border-white/5 bg-stone-950">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
      <div className="flex flex-col gap-4">
        <span className="font-habibi text-on-surface tracking-[0.05em] text-3xl">VIGIA</span>
        <p className="font-sans tracking-[0.15em] text-[10px] uppercase text-secondary max-w-xs leading-relaxed">
          Hecho para durar más que el tiempo. Cada pieza es un manifiesto de permanencia.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-x-12 gap-y-4">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">Navegación</span>
          <button onClick={() => setPage('home')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Inicio</button>
          <button onClick={() => setPage('collection')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Relojes</button>
          <button onClick={() => setPage('nosotros')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">About</button>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">Legal</span>
          <button onClick={() => setPage('terms')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Términos</button>
          <button onClick={() => setPage('terms')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Privacidad</button>
          <button onClick={() => setPage('warranty')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Garantía</button>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">Soporte</span>
          <a href="#" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Contacto</a>
          <a href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">WhatsApp</a>
          <button onClick={() => setPage('faq')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">FAQ</button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:items-end">
        <div className="flex gap-4">
          <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <Instagram size={18} />
          </a>
          <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <Facebook size={18} />
          </a>
          <a href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase text-secondary">
          © 2026 VIGIA. HECHO EN MÉXICO.
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
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/HeroVideo" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start md:items-center text-left md:text-center pt-12 md:pt-0">
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
            className="text-4xl md:text-8xl font-serif text-on-surface leading-[1.1] md:leading-tight mb-6 md:mb-8 max-w-4xl"
          >
            VIGIA: <span className="italic font-normal">El Legado</span> que se Lleva en la Muñeca
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-secondary text-sm md:text-xl max-w-xl md:mx-auto mb-10 md:mb-12 font-light leading-relaxed"
          >
            No es solo un reloj, es la historia de tus momentos más valiosos capturada en acero y zafiro. Una pieza diseñada para trascender generaciones.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => setPage('collection')}
              className="bg-primary text-on-primary px-8 md:px-12 py-4 md:py-5 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:scale-105 hover:shadow-glow shadow-2xl"
            >
              COMPRAR AHORA
            </button>
            <a 
              href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-outline/30 text-on-surface px-8 md:px-12 py-4 md:py-5 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:bg-white/5 flex items-center justify-center gap-3"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              HABLAR POR WHATSAPP
            </a>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">El Manifiesto</span>
          <h2 className="text-3xl md:text-6xl font-serif text-on-surface leading-tight mb-6 md:mb-8">
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
              src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp" 
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
              src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp" 
              alt="Modelo Carajo" 
              className="w-full h-auto rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">Colección Principal</span>
            <h2 className="text-4xl md:text-7xl font-serif text-on-surface mb-8 md:mb-12">Modelo Carajo</h2>
            
            <div className="grid grid-cols-2 gap-y-8 md:gap-y-12 gap-x-6 md:gap-x-8 mb-10 md:mb-16">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Material</span>
                <span className="text-xl font-serif text-on-surface">Acero 316L</span>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Cristal</span>
                <span className="text-xl font-serif text-on-surface">Zafiro</span>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Movimiento</span>
                <span className="text-xl font-serif text-on-surface">Automático Japonés</span>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Resistencia</span>
                <span className="text-xl font-serif text-on-surface">5 ATM</span>
              </div>
            </div>

            <button 
              onClick={() => setPage('modelo-carajo')}
              className="bg-primary text-on-primary px-8 md:px-12 py-4 md:py-5 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:scale-105 hover:shadow-glow shadow-2xl"
            >
              VER PRODUCTO
            </button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-12 md:mb-20">Hazlo personal. <span className="text-primary font-normal">Hazlo permanente.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-serif text-white/20 mb-4 md:mb-6">01</span>
            <h3 className="text-lg md:text-xl font-serif tracking-[0.1em] uppercase mb-2 md:mb-4">Elige tu reloj</h3>
            <p className="text-secondary text-xs md:text-sm leading-relaxed max-w-xs">
              Selecciona uno de nuestros modelos de reloj de acero.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-serif text-white/20 mb-4 md:mb-6">02</span>
            <h3 className="text-lg md:text-xl font-serif tracking-[0.1em] uppercase mb-2 md:mb-4">Define el mensaje</h3>
            <p className="text-secondary text-xs md:text-sm leading-relaxed max-w-xs">
              Nombres, fechas o coordenadas. Grabado con precisión láser en el reverso o corona.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-serif text-white/20 mb-4 md:mb-6">03</span>
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
          <div onClick={() => { setPage('ocasiones'); setTimeout(() => document.getElementById('parejas')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="md:col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp" alt="Parejas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Para Parejas</span>
            </div>
          </div>
          <div onClick={() => { setPage('ocasiones'); setTimeout(() => document.getElementById('hijos')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp" alt="Hijos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">De Padres a Hijos</span>
            </div>
          </div>
          <div onClick={() => { setPage('ocasiones'); setTimeout(() => document.getElementById('hitos')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="md:col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp" alt="Hitos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Hitos Personales</span>
            </div>
          </div>
          <div onClick={() => { setPage('ocasiones'); setTimeout(() => document.getElementById('fechas')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="md:col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp" alt="Fechas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Fechas Eternas</span>
            </div>
          </div>
          <div onClick={() => { setPage('ocasiones'); setTimeout(() => document.getElementById('regalo')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="md:col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp" alt="Regalo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
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

const PersonalizePage = ({ setPage, key, engravingText, setEngravingText }: { setPage: (p: Page) => void, key?: string, engravingText: string, setEngravingText: (t: string) => void }) => {
  
  const suggestions = ['PARA SIEMPRE', 'NOSOTROS', '03.02.26'];

  return (
    <motion.div 
      key="personalize-content"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col"
    >
      {/* Global Header Section */}
      <div className="mb-12 md:mb-20 space-y-4 md:space-y-6 text-center md:text-left">
        <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block">GRABADO ARTESANAL</span>
        <h1 className="font-serif text-4xl md:text-7xl text-on-surface leading-[1.1] max-w-4xl">
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
              <label className="text-outline text-[10px] tracking-[0.2em] uppercase font-medium">Grabado laser personalizado</label>
              <div className="relative group">
                <input 
                  className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-xl font-serif tracking-widest text-primary focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/20 uppercase" 
                  maxLength={20} 
                  placeholder="AQUÍ TU MENSAJE" 
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
            <button 
              onClick={() => setPage('modelo-carajo')}
              className="w-full md:w-80 bg-primary text-on-primary py-5 rounded-full font-bold tracking-[0.2em] hover:brightness-110 transition-all uppercase text-xs shadow-glow"
            >
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
      <section className="pt-24 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Nuestra Filosofía</span>
        <h1 className="text-4xl md:text-8xl font-serif text-on-surface leading-tight mb-8 md:mb-12">
          No creemos en el lujo como estatus. Creemos en <span className="italic font-normal">objetos</span> que guardan significado.
        </h1>
        <div className="w-20 md:w-32 h-[1px] bg-primary" />
      </section>

      <section className="py-16 md:py-32 bg-surface-lowest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <img 
              src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp" 
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
            <h2 className="text-3xl md:text-5xl font-serif text-on-surface">La herencia de lo esencial.</h2>
          </div>
          <p className="text-secondary italic font-serif text-sm md:text-base">"Hecho para durar más que el tiempo."</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: "Familia", icon: <Shield />, text: "El reloj no es tuyo; solo lo custodias para la siguiente generación." },
            { title: "Amor", icon: <Quote />, text: "Dedicación obsesiva en cada micro-ajuste, porque lo que se ama se cuida." },
            { title: "Integridad", icon: <UserCheck />, text: "Materiales nobles y procesos transparentes. Sin atajos, sin artificios." },
            { title: "Belleza cotidiana", icon: <Sparkles />, text: "Encontrar lo extraordinario en el segundero que marca el presente." }
          ].map((v, i) => (
            <div key={i} className="bg-surface-low p-6 md:p-10 rounded-2xl border border-white/5 flex flex-col gap-4 md:gap-8">
              <div className="text-primary">{v.icon}</div>
              <div>
                <h3 className="text-lg md:text-xl font-serif text-on-surface mb-2 md:mb-4">{v.title}</h3>
                <p className="text-on-surface/80 text-base md:text-lg font-light leading-relaxed">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-48 text-center px-6">
        <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Propósito Vital</span>
        <h2 className="text-4xl md:text-8xl font-serif text-on-surface mb-12 md:mb-16 max-w-5xl mx-auto">
          Crear objetos que duren más que el tiempo.
        </h2>
        <button className="border border-outline text-on-surface px-10 md:px-12 py-4 md:py-5 rounded-full font-serif tracking-[0.3em] uppercase text-[10px] md:text-xs hover:bg-white/5 transition-all">
          COMIENZA TU LEGADO
        </button>
      </section>
    </motion.div>
  );
};

const OcasionesPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const occasions = [
    {
      id: "parejas",
      title: "Para Parejas",
      subtitle: "Un secreto compartido en acero",
      text: "Un grabado que sella un compromiso. Coordenadas del lugar donde todo comenzó, iniciales entrelazadas o una fecha que marcó su historia. El acero guarda el secreto de dos personas, resistiendo el paso del tiempo tanto como su vínculo.",
      image: "https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp"
    },
    {
      id: "hijos",
      title: "De Padres a Hijos",
      subtitle: "Pasar el testigo del tiempo",
      text: "Más que un objeto, una herencia. Entregar un reloj es entregar responsabilidad y confianza. Un mensaje en el reverso que dicta 'Siempre contigo' o 'Crea tu propio camino'. Un legado físico que acompañará a la siguiente generación en cada segundo de su vida.",
      image: "https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp"
    },
    {
      id: "hitos",
      title: "Hitos Personales",
      subtitle: "El monumento a tu propio esfuerzo",
      text: "El premio a la perseverancia. Una graduación, el primer gran logro profesional o la superación de un obstáculo que parecía insuperable. Graba la fecha de tu victoria o la frase que te mantuvo en pie. Un recordatorio constante de tu propia fuerza y resiliencia.",
      image: "https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp"
    },
    {
      id: "fechas",
      title: "Fechas Eternas",
      subtitle: "Detener el tiempo en un instante",
      text: "El tiempo es efímero, pero los días cruciales pueden ser eternos. Un nacimiento, un aniversario, el día que cambiaste el rumbo de tu vida. Inmortaliza ese momento exacto en el metal, donde las manecillas nunca podrán borrar el recuerdo.",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "regalo",
      title: "El Regalo Perfecto",
      subtitle: "Cuando lo ordinario no es suficiente",
      text: "Cuando las palabras se quedan cortas, el acero habla. Un regalo personalizado demuestra que has pensado en cada detalle. No es solo un reloj de alta relojería y precisión, es una pieza única en el mundo, diseñada exclusivamente para esa persona excepcional.",
      image: "https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <motion.div 
      key="ocasiones-content"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col pt-24 md:pt-40 pb-24"
    >
      <section className="px-6 md:px-12 max-w-7xl mx-auto text-center mb-20 md:mb-32">
        <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block">Personalización Significativa</span>
        <h1 className="text-4xl md:text-7xl font-serif text-on-surface leading-tight max-w-4xl mx-auto">
          Un reloj para cada historia. Un grabado para la eternidad.
        </h1>
      </section>

      <div className="space-y-24 md:space-y-40">
        {occasions.map((occ, i) => (
          <section key={occ.id} id={occ.id} className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border border-white/5">
                <img 
                  src={occ.image} 
                  alt={occ.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">0{i + 1} — {occ.title}</span>
              <h2 className="text-3xl md:text-5xl font-serif text-on-surface mb-6 leading-tight">{occ.subtitle}</h2>
              <p className="text-secondary text-base md:text-lg font-light leading-relaxed mb-10">
                {occ.text}
              </p>
              <button 
                onClick={() => setPage('personalize')}
                className="self-start px-8 py-4 border border-outline text-on-surface rounded-full font-serif tracking-[0.2em] uppercase text-[10px] transition-all hover:bg-white/5 active:scale-[0.98]"
              >
                CREAR ESTE REGALO
              </button>
            </div>
          </section>
        ))}
      </div>
      
      <section className="mt-32 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-surface-low p-12 rounded-3xl border border-white/5">
          <h3 className="text-2xl md:text-4xl font-serif text-on-surface mb-6">¿Listo para dejar tu marca?</h3>
          <p className="text-secondary mb-10 font-light">Explora nuestra colección y descubre el lienzo de acero perfecto para tu mensaje.</p>
          <button 
            onClick={() => setPage('collection')}
            className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-glow"
          >
            VER COLECCIÓN
          </button>
        </div>
      </section>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, onRemoveItem }: { isOpen: boolean, onClose: () => void, cart: any, onRemoveItem: (lineId: string) => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-surface-low">
              <h2 className="font-serif text-xl tracking-widest text-on-surface uppercase">Tu Carrito</h2>
              <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {!cart || !cart.lines?.edges?.length ? (
                <div className="h-full flex flex-col items-center justify-center text-secondary space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="font-serif tracking-widest uppercase text-xs">Tu carrito está vacío</p>
                  <button onClick={onClose} className="text-primary text-xs tracking-widest uppercase hover:underline">Continuar comprando</button>
                </div>
              ) : (
                cart.lines.edges.map(({ node }: any) => {
                  const engraving = node.attributes?.find((a: any) => a.key === 'Grabado')?.value;
                  return (
                    <div key={node.id} className="flex gap-4 bg-surface-lowest p-4 rounded-2xl border border-white/5 relative group">
                      <div className="w-24 h-24 bg-surface-low rounded-xl overflow-hidden shrink-0">
                        <img src={node.merchandise.image?.url} alt={node.merchandise.product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-grow">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-on-surface uppercase text-sm">{node.merchandise.product.title}</h3>
                            <button onClick={() => onRemoveItem(node.id)} className="text-secondary hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-secondary tracking-widest uppercase mt-1">{node.merchandise.title}</p>
                          {engraving && (
                            <p className="text-[10px] text-primary tracking-widest uppercase mt-2">Grabado: "{engraving}"</p>
                          )}
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-xs text-secondary">Cant: {node.quantity}</span>
                          <span className="font-serif text-on-surface">
                            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: node.merchandise.price.currencyCode }).format(node.merchandise.price.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart && cart.lines?.edges?.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-surface-low space-y-6">
                <div className="flex justify-between items-center text-on-surface">
                  <span className="text-xs tracking-widest uppercase text-secondary">
                    Subtotal <span className="text-[9px] tracking-[0.1em] opacity-60 lowercase">(impuestos incluidos)</span>
                  </span>
                  <span className="font-serif text-xl">
                    {new Intl.NumberFormat('es-MX', { style: 'currency', currency: cart.cost.totalAmount.currencyCode }).format(cart.cost.totalAmount.amount)}
                  </span>
                </div>
                <p className="text-[10px] text-secondary tracking-widest uppercase text-center">El costo de envío se calculará en la pantalla de pago</p>
                <a 
                  href={cart.checkoutUrl}
                  className="w-full block text-center py-5 bg-primary text-on-primary rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-glow"
                >
                  Proceder al Pago
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [globalEngraving, setGlobalEngraving] = useState('');
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash.replace('#', '') as Page;
    const validPages: Page[] = ['home', 'collection', 'nosotros', 'personalize', 'modelo-carajo', 'faq', 'terms', 'warranty', 'ocasiones'];
    return validPages.includes(hash) ? hash : 'home';
  });
  const [selectedVariant, setSelectedVariant] = useState<'NEGRO' | 'BLANCO'>('NEGRO');

  // Cart State
  const [cart, setCart] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const savedCartId = localStorage.getItem('vigia_cart_id');
      if (savedCartId) {
        try {
          const currentCart = await getCart(savedCartId);
          if (currentCart) {
            setCart(currentCart);
          } else {
            localStorage.removeItem('vigia_cart_id');
          }
        } catch (e) {
          console.error('Error fetching cart', e);
        }
      }
    };
    fetchCart();
  }, []);

  const handleAddToCart = async (variantId: string, text: string) => {
    try {
      let updatedCart;
      if (cart?.id) {
        updatedCart = await addToCart(cart.id, variantId, text);
      } else {
        updatedCart = await createCart(variantId, text);
        localStorage.setItem('vigia_cart_id', updatedCart.id);
      }
      
      const fullCart = await getCart(updatedCart.id);
      setCart(fullCart);
      setIsCartOpen(true);
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  };

  const handleRemoveFromCart = async (lineId: string) => {
    if (!cart?.id) return;
    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      const fullCart = await getCart(updatedCart.id);
      setCart(fullCart);
    } catch (e) {
      console.error('Error removing item', e);
    }
  };

  const cartItemCount = cart?.lines?.edges?.reduce((acc: number, curr: any) => acc + curr.node.quantity, 0) || 0;

  useEffect(() => {
    window.location.hash = page;
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      const validPages: Page[] = ['home', 'collection', 'nosotros', 'personalize', 'modelo-carajo', 'faq', 'terms', 'warranty', 'ocasiones'];
      if (validPages.includes(hash)) {
        setPage(hash);
      } else if (hash === '') {
        setPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar currentPage={page} setPage={setPage} cartItemCount={cartItemCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage key="home" setPage={setPage} />}
          {page === 'collection' && <CollectionPage key="collection" setPage={setPage} setSelectedVariant={setSelectedVariant} />}
          {page === 'nosotros' && <AboutPage key="nosotros" />}
          {page === 'personalize' && <PersonalizePage key="personalize" setPage={setPage} engravingText={globalEngraving} setEngravingText={setGlobalEngraving} />}
          {page === 'modelo-carajo' && <ProductDetailPage key="modelo-carajo" productId="carajo" initialVariant={selectedVariant} setPage={setPage} engravingText={globalEngraving} setEngravingText={setGlobalEngraving} onAddToCart={handleAddToCart} />}
          {page === 'faq' && <FAQPage key="faq" onBack={() => setPage('home')} />}
          {page === 'terms' && <TermsPage key="terms" onBack={() => setPage('home')} />}
          {page === 'warranty' && <WarrantyPage key="warranty" onBack={() => setPage('home')} />}
          {page === 'ocasiones' && <OcasionesPage key="ocasiones" setPage={setPage} />}
        </AnimatePresence>
      </main>

      <div className={page === 'modelo-carajo' ? 'hidden md:block' : 'block'}>
        <Footer setPage={setPage} />
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemoveItem={handleRemoveFromCart} 
      />
    </div>
  );
}
