import { Instagram, Facebook } from 'lucide-react';
import { Page } from '../types';

export const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
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
