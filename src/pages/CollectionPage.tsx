import { motion } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { Page } from '../types';

export const CollectionPage = ({ setPage, setSelectedVariant }: { setPage: (p: Page) => void, setSelectedVariant: (v: 'NEGRO' | 'BLANCO') => void, key?: string }) => {
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
        <h1 className="text-5xl md:text-8xl font-serif text-on-surface leading-none">Nuestros Relojes</h1>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12 mb-16 md:mb-32">
        {/* Product 1 */}
        <div 
          onClick={() => {
            setSelectedVariant('NEGRO');
            setPage('modelo-carajo');
          }}
          className="group bg-surface-low rounded-2xl p-4 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-white/5 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4 md:mb-12">
            <div>
              <span className="text-[10px] md:text-xs font-serif tracking-widest text-primary mb-1 md:mb-2 block uppercase">VIGIA 01</span>
              <h2 className="text-sm md:text-4xl font-serif text-on-surface mb-1 md:mb-2">Modelo Carajo</h2>
              <p className="text-secondary text-[10px] md:text-xs tracking-widest uppercase">NEGRO</p>
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
          className="group bg-surface-low rounded-2xl p-4 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-white/5 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4 md:mb-12">
            <div>
              <span className="text-[10px] md:text-xs font-serif tracking-widest text-primary mb-1 md:mb-2 block uppercase">VIGIA 01</span>
              <h2 className="text-sm md:text-4xl font-serif text-on-surface mb-1 md:mb-2">Modelo Carajo</h2>
              <p className="text-secondary text-[10px] md:text-xs tracking-widest uppercase">BLANCO</p>
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
