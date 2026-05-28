import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Page } from '../types';

export const Navbar = ({ currentPage, setPage, cartItemCount, onOpenCart }: {
  currentPage: Page;
  setPage: (p: Page) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; value: Page }[] = [
    { label: 'Inicio', value: 'home' },
    { label: 'Personalizar', value: 'personalize' },
    { label: 'Relojes', value: 'collection' },
    { label: 'Nosotros', value: 'nosotros' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 flex justify-between items-center ${isScrolled || currentPage === 'modelo-carajo' ? 'bg-stone-950/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="md:hidden w-8 relative z-50" />

      <div
        className="font-habibi text-2xl tracking-[0.05em] text-on-surface cursor-pointer absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 relative z-50"
        onClick={() => setPage('home')}
      >
        VIGIA
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-12 relative z-50">
        {navLinks.map((link) => (
          <button
            key={link.value}
            onClick={() => setPage(link.value)}
            className={`font-serif tracking-[0.2em] uppercase text-xs transition-colors duration-300 ${
              currentPage === link.value ? 'text-primary' : 'text-secondary hover:text-primary'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 relative z-50">
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

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-screen w-screen bg-stone-950/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-stone-950/80 backdrop-blur-md border-b border-white/10 p-8 flex flex-col gap-6 md:hidden z-50"
          >
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => { setPage(link.value); setIsMobileMenuOpen(false); }}
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
