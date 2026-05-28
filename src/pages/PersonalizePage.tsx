import { motion } from 'motion/react';
import { Shield, Quote, UserCheck, Sparkles } from 'lucide-react';
import { Page } from '../types';

export const PersonalizePage = ({ setPage, engravingText, setEngravingText }: {
  setPage: (p: Page) => void;
  engravingText: string;
  setEngravingText: (t: string) => void;
}) => {
  const suggestions = ['PARA SIEMPRE', 'NOSOTROS', '03.02.26'];
  return (
    <motion.div key="personalize-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-24 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col">
      <div className="mb-12 md:mb-20 space-y-4 text-center md:text-left">
        <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block">GRABADO ARTESANAL</span>
        <h1 className="font-serif text-4xl md:text-7xl text-on-surface leading-[1.1] max-w-4xl">Escribe lo que quieres llevar contigo.</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
          <div className="relative w-full aspect-square max-w-[450px] md:max-w-[550px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-surface-low/20 border border-white/5" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs><path d="M 200, 200 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" fill="none" id="engravingPath" /></defs>
                <text className="engraving-text fill-on-surface text-[15px]"><textPath href="#engravingPath" startOffset="25%" textAnchor="middle">{engravingText || 'PRIMERA EDICIÓN DE VIGIA'}</textPath></text>
                <text className="engraving-text fill-on-surface text-[15px]"><textPath href="#engravingPath" startOffset="75%" textAnchor="middle">AUT • JAP • 5 ATM   CARAJO 0010</textPath></text>
                <circle cx="200" cy="200" fill="none" opacity="0.1" r="140" stroke="currentColor" strokeDasharray="4 8" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-outline text-[10px] tracking-[0.2em] uppercase font-medium">Grabado laser personalizado</label>
              <div className="relative group">
                <input className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-xl font-serif tracking-widest text-primary focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/20 uppercase"
                  maxLength={20} placeholder="AQUÍ TU MENSAJE" type="text" value={engravingText} onChange={(e) => setEngravingText(e.target.value.toUpperCase())} />
                <div className="absolute right-0 bottom-4 font-serif text-[10px] tracking-[0.2em] text-outline"><span>{engravingText.length}</span> / 20</div>
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-outline text-[10px] tracking-[0.2em] uppercase block">SUGERENCIAS</span>
              <div className="flex flex-wrap gap-3">
                {suggestions.map((text) => (
                  <button key={text} className="px-6 py-2 rounded-full border border-white/10 bg-surface-low/30 text-secondary text-[10px] tracking-[0.2em] uppercase hover:border-primary/50 hover:text-primary transition-all duration-300" onClick={() => setEngravingText(text)}>{text}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-4 flex flex-col gap-12">
            <button onClick={() => setPage('modelo-carajo')} className="w-full md:w-80 bg-primary text-on-primary py-5 rounded-full font-bold tracking-[0.2em] hover:brightness-110 transition-all uppercase text-xs shadow-glow">CONTINUAR A COMPRA</button>
            <div className="flex gap-4 max-w-md">
              <div className="pt-1"><Sparkles size={24} className="text-primary" /></div>
              <div className="space-y-1">
                <span className="text-on-surface text-[10px] tracking-[0.15em] uppercase font-bold block">PRECISIÓN LÁSER</span>
                <p className="text-outline text-[11px] leading-relaxed tracking-wide font-light">Cada grabado es realizado con tecnología de fibra óptica de alta definición, garantizando legibilidad eterna en el acero.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const AboutPage = () => (
  <motion.div key="about-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
    <section className="pt-24 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
      <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">Nuestra Filosofía</span>
      <h1 className="text-4xl md:text-8xl font-serif text-on-surface leading-tight mb-8 md:mb-12">
        No creemos en el lujo como estatus. Creemos en <span className="italic font-normal">objetos</span> que guardan significado.
      </h1>
      <div className="w-20 md:w-32 h-[1px] bg-primary" />
    </section>
    <section className="py-16 md:py-32 bg-surface-lowest">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative"><img src="https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp" alt="Watch Internal" className="w-full h-auto rounded-3xl shadow-2xl" referrerPolicy="no-referrer" /></div>
        <div>
          <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">El Diferenciador</span>
          <h2 className="text-2xl md:text-6xl font-serif text-on-surface mb-6 md:mb-8">El problema no es el precio alto. Es pagar por algo que no significa nada.</h2>
          <p className="text-secondary text-base md:text-lg font-light leading-relaxed">En un mundo de obsolescencia programada, elegimos la permanencia. Cada pieza VIGIA es un manifiesto contra lo efímero. No vendemos tiempo, vendemos el recipiente para tus recuerdos.</p>
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
          { title: 'Familia', icon: <Shield />, text: 'El reloj no es tuyo; solo lo custodias para la siguiente generación.' },
          { title: 'Amor', icon: <Quote />, text: 'Dedicación obsesiva en cada micro-ajuste, porque lo que se ama se cuida.' },
          { title: 'Integridad', icon: <UserCheck />, text: 'Materiales nobles y procesos transparentes. Sin atajos, sin artificios.' },
          { title: 'Belleza cotidiana', icon: <Sparkles />, text: 'Encontrar lo extraordinario en el segundero que marca el presente.' },
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
      <h2 className="text-4xl md:text-8xl font-serif text-on-surface mb-12 md:mb-16 max-w-5xl mx-auto">Crear objetos que duren más que el tiempo.</h2>
      <button className="border border-outline text-on-surface px-10 md:px-12 py-4 md:py-5 rounded-full font-serif tracking-[0.3em] uppercase text-[10px] md:text-xs hover:bg-white/5 transition-all">COMIENZA TU LEGADO</button>
    </section>
  </motion.div>
);

export const OcasionesPage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const occasions = [
    { id: 'parejas', title: 'Para Parejas', subtitle: 'Un secreto compartido en acero', text: 'Un grabado que sella un compromiso. Coordenadas del lugar donde todo comenzó, iniciales entrelazadas o una fecha que marcó su historia. El acero guarda el secreto de dos personas, resistiendo el paso del tiempo tanto como su vínculo.', image: 'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp' },
    { id: 'hijos', title: 'De Padres a Hijos', subtitle: 'Pasar el testigo del tiempo', text: "Más que un objeto, una herencia. Entregar un reloj es entregar responsabilidad y confianza. Un mensaje en el reverso que dicta 'Siempre contigo' o 'Crea tu propio camino'. Un legado físico que acompañará a la siguiente generación en cada segundo de su vida.", image: 'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp' },
    { id: 'hitos', title: 'Hitos Personales', subtitle: 'El monumento a tu propio esfuerzo', text: 'El premio a la perseverancia. Una graduación, el primer gran logro profesional o la superación de un obstáculo que parecía insuperable. Graba la fecha de tu victoria o la frase que te mantuvo en pie. Un recordatorio constante de tu propia fuerza y resiliencia.', image: 'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp' },
    { id: 'fechas', title: 'Fechas Eternas', subtitle: 'Detener el tiempo en un instante', text: 'El tiempo es efímero, pero los días cruciales pueden ser eternos. Un nacimiento, un aniversario, el día que cambiaste el rumbo de tu vida. Inmortaliza ese momento exacto en el metal, donde las manecillas nunca podrán borrar el recuerdo.', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200' },
    { id: 'regalo', title: 'El Regalo Perfecto', subtitle: 'Cuando lo ordinario no es suficiente', text: 'Cuando las palabras se quedan cortas, el acero habla. Un regalo personalizado demuestra que has pensado en cada detalle. No es solo un reloj de alta relojería y precisión, es una pieza única en el mundo, diseñada exclusivamente para esa persona excepcional.', image: 'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=1000' },
  ];
  return (
    <motion.div key="ocasiones-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col pt-24 md:pt-40 pb-24">
      <section className="px-6 md:px-12 max-w-7xl mx-auto text-center mb-20 md:mb-32">
        <span className="font-serif text-primary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block">Personalización Significativa</span>
        <h1 className="text-4xl md:text-7xl font-serif text-on-surface leading-tight max-w-4xl mx-auto">Un reloj para cada historia. Un grabado para la eternidad.</h1>
      </section>
      <div className="space-y-24 md:space-y-40">
        {occasions.map((occ, i) => (
          <section key={occ.id} id={occ.id} className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border border-white/5">
                <img src={occ.image} alt={occ.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">0{i + 1} — {occ.title}</span>
              <h2 className="text-3xl md:text-5xl font-serif text-on-surface mb-6 leading-tight">{occ.subtitle}</h2>
              <p className="text-secondary text-base md:text-lg font-light leading-relaxed mb-10">{occ.text}</p>
              <button onClick={() => setPage('personalize')} className="self-start px-8 py-4 border border-outline text-on-surface rounded-full font-serif tracking-[0.2em] uppercase text-[10px] transition-all hover:bg-white/5 active:scale-[0.98]">CREAR ESTE REGALO</button>
            </div>
          </section>
        ))}
      </div>
      <section className="mt-32 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-surface-low p-12 rounded-3xl border border-white/5">
          <h3 className="text-2xl md:text-4xl font-serif text-on-surface mb-6">¿Listo para dejar tu marca?</h3>
          <p className="text-secondary mb-10 font-light">Explora nuestra colección y descubre el lienzo de acero perfecto para tu mensaje.</p>
          <button onClick={() => setPage('collection')} className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-glow">VER COLECCIÓN</button>
        </div>
      </section>
    </motion.div>
  );
};
