import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function FAQPage({ onBack }: Props) {
  const faqs = [
    {
      q: "¿De qué material están hechos los relojes VIGIA?",
      a: "El chasis está construido con acero inoxidable 316L, el estándar más alto en la relojería. Además, integramos un cristal de zafiro con revestimiento antirreflejante y utilizamos movimientos mecánicos automáticos (Calibre V-12) para una precisión absoluta."
    },
    {
      q: "¿Cuánto tiempo tarda el envío?",
      a: "Ofrecemos entrega a toda la República Mexicana. Los tiempos estándar de paquetería van de 2 a 5 días hábiles dependiendo la zona. Todos nuestros envíos van asegurados por el 100% del valor del reloj."
    },
    {
      q: "¿Qué métodos de pago aceptan?",
      a: "Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, American Express) procesadas de manera ultra segura a través de la plataforma encriptada de Shopify."
    },
    {
      q: "¿Tienen devoluciones?",
      a: "Sí. Tienes un límite de 14 días naturales a partir de la recepción para devolver el reloj siempre y cuando no haya sido usado, modificado y conserve todos sus plásticos de origen. Los relojes con grabados personalizados son ventas finales y no aplican para devolución."
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-20 px-6 max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-12 text-[10px] tracking-[0.2em] uppercase"
      >
        <ArrowLeft size={14} /> Volver a la Tienda
      </button>

      <h1 className="text-4xl md:text-5xl font-serif italic text-on-surface mb-6">Preguntas Frecuentes</h1>
      <div className="h-1 w-24 bg-primary mb-16"></div>

      <div className="space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-surface-low p-8 border border-white/5 rounded-2xl">
            <h3 className="text-xl font-serif text-primary mb-4">{faq.q}</h3>
            <p className="text-secondary font-light leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
