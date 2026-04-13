/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { createCheckout, getLiveVariantInfo } from './lib/shopify';
import { motion, AnimatePresence } from 'motion/react';
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
  Home,
  Palette,
  Watch,
  Truck
} from 'lucide-react';

// --- Types ---

type Page = 'home' | 'collection' | 'nosotros' | 'personalize' | 'modelo-carajo' | 'faq' | 'terms' | 'warranty';

interface ProductVariant {
  color: 'NEGRO' | 'BLANCO';
  shopifyId?: string;
  images: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  variants: ProductVariant[];
}

const PRODUCTS: Product[] = [
  {
    id: 'carajo',
    name: 'Modelo Carajo',
    description: 'El “carajo” era originalmente una parte del barco: una pequeña canastilla en lo alto del mástil donde se colocaba el vigía. Desde ahí, su función era observar el horizonte, detectar peligros, anunciar tierra o anticipar tormentas. Era un punto solitario, expuesto al viento y al mar, reservado para quien tenía la responsabilidad de ver más allá que los demás.',
    price: '$2,450.00',
    variants: [
      {
        color: 'NEGRO',
        shopifyId: 'gid://shopify/ProductVariant/50679276503287',
        images: [
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp',
          'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000',
          'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000',
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
        ]
      },
      {
        color: 'BLANCO',
        shopifyId: 'gid://shopify/ProductVariant/50679276536055',
        images: [
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp',
          'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=1000',
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp',
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp',
          'https://images.unsplash.com/photo-1539533331302-7eb39159f5d8?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1549463591-14cc58e15c3e?auto=format&fit=crop&q=80&w=1200'
        ]
      }
    ]
  }
];

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
        <button 
          onClick={() => setPage('collection')} 
          className="hidden sm:block bg-primary text-on-primary px-8 py-2.5 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] transition-all hover:scale-105 hover:shadow-glow"
        >
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
          <button onClick={() => setPage('collection')} className="text-left text-[10px] tracking-[0.15em] uppercase text-secondary hover:text-on-surface transition-colors">Colección</button>
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
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <Instagram size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <Facebook size={18} />
          </a>
          <a href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all">
            <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase text-outline">
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
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-primary tracking-[0.4em] uppercase text-[10px] md:text-xs mb-2 md:mb-6 block"
          >
            Horología de Precisión
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-8xl font-serif text-on-surface leading-tight mb-4 md:mb-8"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6"
          >
            <button 
              onClick={() => setPage('collection')}
              className="bg-primary text-on-primary px-8 md:px-10 py-3.5 md:py-4 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:scale-105 hover:shadow-glow w-full sm:w-auto"
            >
              COMPRAR AHORA
            </button>
            <a 
              href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-outline/30 sm:border-outline text-on-surface px-4 sm:px-8 md:px-10 py-2 sm:py-3.5 md:py-4 rounded-full font-serif tracking-[0.2em] uppercase text-[8px] sm:text-[10px] md:text-xs transition-all hover:bg-white/5 w-auto sm:w-auto opacity-80 sm:opacity-100 flex items-center justify-center gap-2"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" width="14" height="14" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              HABLAR POR WHATSAPP
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-6 md:bottom-12 left-0 w-full px-6">
          <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-y-4 gap-x-4 md:gap-12 max-w-3xl mx-auto">
            {[
              { icon: <Shield size={14} />, text: "Garantía de 24 meses" },
              { icon: <Shield size={14} />, text: "Pagos seguros" },
              { icon: <MapPin size={14} />, text: "Hecho en México" },
              { icon: <UserCheck size={14} />, text: "Trato Personal" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 whitespace-nowrap justify-center">
                <span className="text-primary">{badge.icon}</span>
                <span className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-secondary">{badge.text}</span>
              </div>
            ))}
          </div>
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
        <h2 className="text-3xl md:text-5xl font-serif italic mb-12 md:mb-20">Hazlo personal. <span className="text-primary font-normal not-italic">Hazlo permanente.</span></h2>
        
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
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp" alt="Parejas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Para Parejas</span>
            </div>
          </div>
          <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-2xl">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp" alt="Hijos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">De Padres a Hijos</span>
            </div>
          </div>
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp" alt="Hitos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Hitos Personales</span>
            </div>
          </div>
          <div className="md:col-span-1 relative group overflow-hidden rounded-2xl">
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp" alt="Fechas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <span className="font-serif tracking-[0.2em] uppercase text-xs">Fechas Eternas</span>
            </div>
          </div>
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
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

const CollectionPage = ({ setPage, setSelectedVariant }: { setPage: (p: Page) => void, setSelectedVariant: (v: 'NEGRO' | 'BLANCO') => void, key?: string }) => {
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
        <h1 className="text-5xl md:text-8xl font-serif text-on-surface leading-none">Nuestros Monolitos</h1>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 mb-16 md:mb-32">
        {/* Product 1 */}
        <div 
          onClick={() => {
            setSelectedVariant('NEGRO');
            setPage('modelo-carajo');
          }}
          className="group bg-surface-low rounded-2xl p-4 md:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-white/5 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4 md:mb-12">
            <div>
              <span className="text-[8px] md:text-[10px] font-serif tracking-widest text-primary mb-1 md:mb-2 block uppercase">VIGIA 01</span>
              <h2 className="text-sm md:text-4xl font-serif text-on-surface mb-1 md:mb-2">Modelo Carajo</h2>
              <p className="text-secondary text-[8px] md:text-[10px] tracking-widest uppercase">NEGRO</p>
            </div>
          </div>
          <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-12 shadow-2xl">
            <img 
              src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp" 
              alt="Vigia 01 Black" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 md:gap-4">
              <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-black border border-white/20 ring-2 ring-primary ring-offset-2 md:ring-offset-4 ring-offset-surface-low" />
              <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-stone-200 border border-white/20" />
            </div>
            <button className="flex items-center gap-2 md:gap-4 group/btn">
              <span className="hidden md:block font-serif tracking-[0.2em] uppercase text-[9px] md:text-[10px] text-on-surface group-hover/btn:text-primary transition-colors">Ver Producto</span>
              <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all">
                <ArrowRight size={10} className="group-hover/btn:text-on-primary" />
              </div>
            </button>
          </div>
        </div>

        {/* Product 2 */}
        <div 
          onClick={() => {
            setSelectedVariant('BLANCO');
            setPage('modelo-carajo');
          }}
          className="group bg-surface-low rounded-2xl p-4 md:p-10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-white/5 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4 md:mb-12">
            <div>
              <span className="text-[8px] md:text-[10px] font-serif tracking-widest text-primary mb-1 md:mb-2 block uppercase">VIGIA 01</span>
              <h2 className="text-sm md:text-4xl font-serif text-on-surface mb-1 md:mb-2">Modelo Carajo</h2>
              <p className="text-secondary text-[8px] md:text-[10px] tracking-widest uppercase">BLANCO</p>
            </div>
          </div>
          <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-12 shadow-2xl">
            <img 
              src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp" 
              alt="Vigia 01 White" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 md:gap-4">
              <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-black border border-white/20" />
              <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-stone-200 border border-white/20 ring-2 ring-primary ring-offset-2 md:ring-offset-4 ring-offset-surface-low" />
            </div>
            <button className="flex items-center gap-2 md:gap-4 group/btn">
              <span className="hidden md:block font-serif tracking-[0.2em] uppercase text-[9px] md:text-[10px] text-on-surface group-hover/btn:text-primary transition-colors">Ver Producto</span>
              <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary transition-all">
                <ArrowRight size={10} className="group-hover/btn:text-on-primary" />
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
            { icon: <Lock />, title: "VIGIA 02" }
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

const ProductDetailPage = ({ productId, initialVariant, setPage, key, engravingText, setEngravingText }: { productId: string, initialVariant: 'NEGRO' | 'BLANCO', setPage: (p: Page) => void, key?: string, engravingText: string, setEngravingText: (t: string) => void }) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedColor, setSelectedColor] = useState<'NEGRO' | 'BLANCO'>(initialVariant);
  const currentVariant = product.variants.find(v => v.color === selectedColor) || product.variants[0];
  const [mainImage, setMainImage] = useState(currentVariant.images[0]);
  const [showModal, setShowModal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [livePrice, setLivePrice] = useState<string | null>("Calculando...");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const suggestions = ['PARA SIEMPRE', 'NOSOTROS', '03.02.26'];

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const url = await createCheckout(currentVariant.shopifyId as string, engravingText);
      window.location.href = url;
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Error al procesar el pago. Por favor intenta de nuevo.");
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    setMainImage(currentVariant.images[0]);
    
    // Reset states when color changes
    setLivePrice("Calculando...");
    setIsAvailable(false);

    if (currentVariant.shopifyId) {
      getLiveVariantInfo(currentVariant.shopifyId).then((info) => {
        if (info && info.price) {
          const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: info.price.currencyCode });
          setLivePrice(formatter.format(info.price.amount));
          setIsAvailable(info.availableForSale);
        } else {
          setLivePrice("No Disponible");
          setIsAvailable(false);
        }
      }).catch(() => {
        setLivePrice("Error de conexión");
        setIsAvailable(false);
      });
    }
  }, [selectedColor, currentVariant.shopifyId]);

  return (
    <motion.div 
      key="product-detail-content"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-24 md:pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="mb-4 md:mb-8">
        <button 
          onClick={() => setPage('collection')} 
          className="flex items-center gap-2 font-serif tracking-widest uppercase text-[10px] text-primary hover:text-on-surface transition-colors"
        >
          <ArrowRight size={12} className="rotate-180" />
          Regresar a la colección
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-16 mb-24 md:mb-32">
        {/* Product Info (Mobile First) */}
        <div className="lg:hidden space-y-2">
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-semibold">Primera Edición de Vigía</span>
          <h1 className="text-5xl font-serif tracking-tighter text-on-surface uppercase">{product.name}</h1>
          <p className="text-secondary font-light leading-relaxed text-sm">
            {product.description}
          </p>
        </div>

        {/* Left: Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
          <div className="aspect-[4/5] bg-surface-low rounded-2xl overflow-hidden shadow-2xl relative">
            <motion.img 
              key={mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-6 gap-2 md:gap-4">
            {currentVariant.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setMainImage(img)}
                className={`aspect-square bg-surface-low rounded-lg overflow-hidden border cursor-pointer transition-all ${mainImage === img ? 'border-primary' : 'border-white/5 hover:border-white/20'}`}
              >
                <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="sticky top-40 space-y-10 md:space-y-12">
            <div className="hidden lg:block space-y-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-semibold">Primera Edición de Vigía</span>
              <h1 className="text-5xl md:text-8xl font-serif tracking-tighter text-on-surface uppercase">{product.name}</h1>
              <p className="text-secondary font-light leading-relaxed max-w-md">
                {product.description}
              </p>
            </div>

            <div className="p-8 bg-surface-low rounded-2xl border border-white/5 space-y-8 mt-0">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-outline block mb-1">Precio</span>
                  <span className={`font-serif text-on-surface ${livePrice === "Calculando..." || livePrice === "No Disponible" || livePrice === "Error de conexión" ? "text-xl text-secondary italic" : "text-4xl"}`}>
                    {livePrice}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] tracking-[0.2em] uppercase block mb-1 ${isAvailable ? 'text-primary' : (livePrice === "Calculando..." ? 'text-secondary' : 'text-red-500')}`}>
                    {livePrice === "Calculando..." ? 'CONECTANDO...' : (isAvailable ? 'En Stock' : 'Agotado')}
                  </span>
                  <span className="text-xs text-secondary">{livePrice === "Calculando..." ? 'Verificando con Atelier' : (isAvailable ? 'Entrega de Atelier' : 'No disponible')}</span>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <label className="text-[10px] tracking-[0.2em] uppercase text-outline">COLORES</label>
                <div className="flex gap-4 items-center">
                  <button 
                    onClick={() => setSelectedColor('NEGRO')}
                    className={`w-6 h-6 rounded-full bg-black border-2 transition-all ${selectedColor === 'NEGRO' ? 'border-primary ring-2 ring-primary/20 ring-offset-4 ring-offset-surface-low' : 'border-white/10 hover:border-white/30'}`}
                  />
                  <button 
                    onClick={() => setSelectedColor('BLANCO')}
                    className={`w-6 h-6 rounded-full bg-stone-200 border-2 transition-all ${selectedColor === 'BLANCO' ? 'border-primary ring-2 ring-primary/20 ring-offset-4 ring-offset-surface-low' : 'border-white/10 hover:border-white/30'}`}
                  />
                </div>
              </div>

              {/* Personalization UI */}
              <div className="space-y-8 pt-0">
                <div className="space-y-4 text-center">
                  <label className="text-outline text-[10px] tracking-[0.2em] uppercase font-medium">Grabado laser personalizado</label>
                  <div className="relative group">
                    <input 
                      className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-xl font-serif tracking-widest text-primary focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/20 placeholder:text-xs uppercase text-center" 
                      maxLength={20} 
                      placeholder="Escribe aquí" 
                      type="text"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                    />
                    <div className="absolute right-0 bottom-4 font-serif text-[10px] tracking-[0.2em] text-outline">
                      <span>{engravingText.length}</span> / 20
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <span className="text-outline text-[10px] tracking-[0.2em] uppercase block">SUGERENCIAS</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((text) => (
                      <button 
                        key={text}
                        className="px-4 py-1.5 rounded-full border border-white/10 bg-surface-low/30 text-secondary text-[9px] tracking-[0.15em] uppercase hover:border-primary/50 hover:text-primary transition-all duration-300"
                        onClick={() => setEngravingText(text)}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setShowModal(true)}
                  disabled={isCheckingOut || !isAvailable}
                  className="w-full py-5 bg-primary text-on-primary rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'PROCESANDO...' : (isAvailable ? 'Comprar Ahora' : 'AGOTADO')}
                </button>
                <a 
                  href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-5 border border-outline text-on-surface rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:bg-white/5 active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16" className="shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  HABLAR POR WHATSAPP
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-y-6 gap-x-4">
              {[
                { icon: <Shield size={14} />, text: "Garantía de 24 meses" },
                { icon: <UserCheck size={14} />, text: "Trato Personal" },
                { icon: <MapPin size={14} />, text: "Hecho en México" },
                { icon: <Truck size={14} />, text: "Envíos a toda la república" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-primary shrink-0">{badge.icon}</span>
                  <span className="text-[9px] tracking-[0.1em] uppercase text-secondary leading-tight">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <section className="mt-24 md:mt-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif italic text-on-surface mb-6">Arquitectura Técnica</h2>
            <div className="h-1 w-24 bg-primary mb-6"></div>
            <p className="text-secondary font-light leading-relaxed">Ingeniería de precisión para superar los estándares de la alta relojería. Cada componente del VIGIA es seleccionado por su longevidad y equilibrio estético.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] tracking-[0.5em] uppercase text-outline">Hoja de Especificaciones Rev. 02.24</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-2xl">
          {[
            { label: "Calibración", title: "Movimiento", text: "Automático Jap (Calibre V-12) con parada de segundero y 24 joyas con carga bidireccional." },
            { label: "Chasis", title: "Material", text: "Acero inoxidable 316L de alta calidad con revestimiento de PVD de obsidiana doble cepillado." },
            { label: "Óptica", title: "Cristal", text: "Cristal de zafiro resistente a los arañazos con 5 capas de revestimiento antirreflectante interno." },
            { label: "Resistencia", title: "Resistencia al Agua", text: "Probado a 5 ATM (50 Metros / 165 Pies). Adecuado para períodos cortos de natación recreativa." },
            { label: "Geometría", title: "Diámetro de Caja", text: "Ancho de caja de 42.0mm. Grosor de 12.8mm. 48.5mm de asa a asa para presencia y comodidad." },
            { label: "Autonomía", title: "Reserva de Marcha", text: "Aprox. 41 horas con carga completa. Sistema de cuerda automática alimentado por el movimiento natural." }
          ].map((spec, i) => (
            <div key={i} className="bg-surface-low p-8 md:p-10 space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary">{spec.label}</span>
              <h3 className="text-xl font-serif text-on-surface">{spec.title}</h3>
              <p className="text-secondary text-sm font-light leading-relaxed">{spec.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Blurred background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-surface-low border border-white/10 p-8 md:p-12 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col items-center text-center"
            >
              <div className="absolute -top-12 opacity-50">
                <Sparkles size={32} className="text-primary" />
              </div>
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-6">Confirmación</span>
              
              {engravingText.trim() === '' ? (
                <>
                  <h3 className="text-2xl md:text-3xl font-serif text-on-surface mb-4">¿Quieres agregar un grabado personalizado sin costo?</h3>
                  <p className="text-secondary text-sm font-light leading-relaxed mb-10">
                    Si no escribes nada, tu reloj llevará el grabado predeterminado del modelo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="w-full py-4 border border-outline text-on-surface rounded-full font-serif tracking-[0.1em] uppercase text-[10px] transition-all hover:bg-white/5 active:scale-[0.98]"
                    >
                      ← Agregar grabado
                    </button>
                    <button 
                      onClick={() => {
                         setShowModal(false);
                         handleCheckout();
                      }}
                      className="w-full py-4 bg-primary text-on-primary rounded-full font-bold uppercase tracking-[0.1em] text-[10px] transition-all hover:brightness-110 active:scale-[0.98] shadow-glow"
                    >
                      Continuar sin personalizar →
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-serif text-on-surface mb-4">Confirma tu grabado:</h3>
                  <div className="bg-surface-lowest border border-white/5 w-full py-6 rounded-2xl mb-6 shadow-inner">
                    <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-primary break-words px-4">
                      "{engravingText.toUpperCase()}"
                    </span>
                  </div>
                  <p className="text-secondary text-sm font-light leading-relaxed mb-10">
                    ¿Deseas continuar con este mensaje?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="w-full py-4 border border-outline text-on-surface rounded-full font-serif tracking-[0.1em] uppercase text-[10px] transition-all hover:bg-white/5 active:scale-[0.98]"
                    >
                      ← Editar grabado
                    </button>
                    <button 
                      onClick={() => {
                         setShowModal(false);
                         handleCheckout();
                      }}
                      className="w-full py-4 bg-primary text-on-primary rounded-full font-bold uppercase tracking-[0.1em] text-[10px] transition-all hover:brightness-110 active:scale-[0.98] shadow-glow"
                    >
                      Confirmar y continuar →
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
              <label className="text-outline text-[10px] tracking-[0.2em] uppercase font-medium">TU MENSAJE (MAX. 20 CARACTERES)</label>
              <div className="relative group">
                <input 
                  className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-xl font-serif tracking-widest text-primary focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/20 uppercase" 
                  maxLength={20} 
                  placeholder="Escribe aquí" 
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

// --- Main App ---

export default function App() {
  const [globalEngraving, setGlobalEngraving] = useState('');
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash.replace('#', '') as Page;
    const validPages: Page[] = ['home', 'collection', 'nosotros', 'personalize', 'modelo-carajo', 'faq', 'terms', 'warranty'];
    return validPages.includes(hash) ? hash : 'home';
  });
  const [selectedVariant, setSelectedVariant] = useState<'NEGRO' | 'BLANCO'>('NEGRO');

  useEffect(() => {
    window.location.hash = page;
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      const validPages: Page[] = ['home', 'collection', 'nosotros', 'personalize', 'modelo-carajo', 'faq', 'terms', 'warranty'];
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
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage key="home" setPage={setPage} />}
          {page === 'collection' && <CollectionPage key="collection" setPage={setPage} setSelectedVariant={setSelectedVariant} />}
          {page === 'nosotros' && <AboutPage key="nosotros" />}
          {page === 'personalize' && <PersonalizePage key="personalize" setPage={setPage} engravingText={globalEngraving} setEngravingText={setGlobalEngraving} />}
          {page === 'modelo-carajo' && <ProductDetailPage key="modelo-carajo" productId="carajo" initialVariant={selectedVariant} setPage={setPage} engravingText={globalEngraving} setEngravingText={setGlobalEngraving} />}
          {page === 'faq' && <FAQPage key="faq" onBack={() => setPage('home')} />}
          {page === 'terms' && <TermsPage key="terms" onBack={() => setPage('home')} />}
          {page === 'warranty' && <WarrantyPage key="warranty" onBack={() => setPage('home')} />}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />

      {/* Mobile Bottom Nav */}
      <div className="hidden min-[390px]:flex md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 bg-stone-950/90 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full gap-8 shadow-2xl items-center">
        <button onClick={() => setPage('home')} className={`${page === 'home' ? 'text-primary' : 'text-secondary'}`}>
          <Home size={20} />
        </button>
        <button onClick={() => setPage('personalize')} className={`${page === 'personalize' ? 'text-primary' : 'text-secondary'}`}>
          <Palette size={20} />
        </button>
        <button onClick={() => setPage('collection')} className={`${page === 'collection' ? 'text-primary' : 'text-secondary'}`}>
          <Watch size={20} />
        </button>
        <button onClick={() => setPage('nosotros')} className={`${page === 'nosotros' ? 'text-primary' : 'text-secondary'} flex items-center justify-center`}>
          <span className="font-habibi text-xl leading-none">V</span>
        </button>
      </div>
    </div>
  );
}
