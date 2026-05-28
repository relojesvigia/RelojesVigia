import { motion } from 'motion/react';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { Page } from '../types';

export const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
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
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
            <source src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/HeroVideo" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start md:items-center text-left md:text-center pt-12 md:pt-0">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-serif text-primary tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block"
          >
            Horología de Precisión
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-4xl md:text-8xl font-serif text-on-surface leading-[1.1] md:leading-tight mb-6 md:mb-8 max-w-4xl"
          >
            VIGIA: <span className="italic font-normal">El Legado</span> que se Lleva en la Muñeca
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-secondary text-sm md:text-xl max-w-xl md:mx-auto mb-10 md:mb-12 font-light leading-relaxed"
          >
            No es solo un reloj, es la historia de tus momentos más valiosos capturada en acero y zafiro. Una pieza diseñada para trascender generaciones.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
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
              target="_blank" rel="noopener noreferrer"
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
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp" alt="Craftsmanship" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
            <img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp" alt="Modelo Carajo" className="w-full h-auto rounded-xl shadow-2xl" referrerPolicy="no-referrer" />
          </div>
          <div>
            <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">Colección Principal</span>
            <h2 className="text-4xl md:text-7xl font-serif text-on-surface mb-8 md:mb-12">Modelo Carajo</h2>
            <div className="grid grid-cols-2 gap-y-8 md:gap-y-12 gap-x-6 md:gap-x-8 mb-10 md:mb-16">
              <div><span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Material</span><span className="text-xl font-serif text-on-surface">Acero 316L</span></div>
              <div><span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Cristal</span><span className="text-xl font-serif text-on-surface">Zafiro</span></div>
              <div><span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Movimiento</span><span className="text-xl font-serif text-on-surface">Automático Japonés</span></div>
              <div><span className="text-[10px] tracking-[0.2em] uppercase text-secondary block mb-2">Resistencia</span><span className="text-xl font-serif text-on-surface">5 ATM</span></div>
            </div>
            <button onClick={() => setPage('modelo-carajo')} className="bg-primary text-on-primary px-8 md:px-12 py-4 md:py-5 rounded-full font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all hover:scale-105 hover:shadow-glow shadow-2xl">
              VER PRODUCTO
            </button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-12 md:mb-20">Hazlo personal. <span className="text-primary font-normal">Hazlo permanente.</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {[
            { n: '01', title: 'Elige tu reloj', text: 'Selecciona uno de nuestros modelos de reloj de acero.' },
            { n: '02', title: 'Define el mensaje', text: 'Nombres, fechas o coordenadas. Grabado con precisión láser en el reverso o corona.' },
            { n: '03', title: 'Forja la herencia', text: 'Recibe una pieza única que guardará tu historia para las próximas generaciones.' },
          ].map((step) => (
            <div key={step.n} className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-serif text-white/20 mb-4 md:mb-6">{step.n}</span>
              <h3 className="text-lg md:text-xl font-serif tracking-[0.1em] uppercase mb-2 md:mb-4">{step.title}</h3>
              <p className="text-secondary text-xs md:text-sm leading-relaxed max-w-xs">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 h-auto md:h-[800px]">
          {[
            { id: 'parejas', label: 'Para Parejas', img: 'White3', span: 'md:col-span-1' },
            { id: 'hijos', label: 'De Padres a Hijos', img: 'White1', span: 'md:col-span-1 md:row-span-2' },
            { id: 'hitos', label: 'Hitos Personales', img: 'White2', span: 'md:col-span-2' },
            { id: 'fechas', label: 'Fechas Eternas', img: 'White3', span: 'md:col-span-1' },
            { id: 'regalo', label: 'El Regalo Perfecto', img: 'White1', span: 'md:col-span-2' },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => { setPage('ocasiones'); setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className={`${item.span} relative group overflow-hidden rounded-2xl cursor-pointer`}
            >
              <img src={`https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/${item.img}.webp`} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <span className="font-serif tracking-[0.2em] uppercase text-xs">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { name: 'Carlos M.', text: 'La calidad del acero y el acabado del grabado superaron mis expectativas. Es una pieza que mi hijo heredará.', stars: 5 },
            { name: 'Elena R.', text: 'El minimalismo absoluto. Buscaba algo sobrio pero con alma, y el servicio de personalización fue impecable.', stars: 5 },
            { name: 'Javier L.', text: 'Un regalo de aniversario que emocionó hasta las lágrimas. Gracias por cuidar tanto los detalles del empaque.', stars: 5 },
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
