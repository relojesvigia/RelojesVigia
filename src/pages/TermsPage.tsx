import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function TermsPage({ onBack }: Props) {
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

      <h1 className="text-4xl md:text-5xl font-serif italic text-on-surface mb-6">Términos y Condiciones</h1>
      <div className="h-1 w-24 bg-primary mb-16"></div>

      <div className="prose prose-invert prose-stone max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-secondary">
        <p>
          Este sitio web es operado por Relojes VIGIA ("VIGIA"). En todo el sitio, los términos "nosotros", "nos" y "nuestro" se refieren a VIGIA. Al visitar nuestro sitio y/o comprar algo de nosotros, usted participa en nuestro "Servicio" y acepta estar sujeto a los siguientes términos y condiciones ("Términos de Servicio", "Términos").
        </p>

        <h3 className="text-xl font-serif text-on-surface mt-8 mb-4">1. Condiciones Generales</h3>
        <p>
          Nos reservamos el derecho de rechazar el servicio a cualquier persona, por cualquier motivo y en cualquier momento. Usted comprende que su contenido (sin incluir la información de su tarjeta de crédito) puede transferirse sin encriptar e implicar transmisiones en varias redes. Toda la información de tarjetas de crédito está siempre encriptada mediante la infraestructura de Shopify durante la transferencia.
        </p>

        <h3 className="text-xl font-serif text-on-surface mt-8 mb-4">2. Modificaciones al Servicio y Precios</h3>
        <p>
          Los precios de nuestros productos están sujetos a cambios sin previo aviso. Nos reservamos el derecho en cualquier momento de modificar o discontinuar el Servicio (o cualquier parte o contenido del mismo) sin previo aviso en cualquier momento.
        </p>

        <h3 className="text-xl font-serif text-on-surface mt-8 mb-4">3. Productos y Personalización</h3>
        <p>
          Ciertos productos pueden estar disponibles exclusivamente en línea. Los relojes personalizados mediante grabado no son elegibles para devoluciones, a menos y exclusivamente de que exista un defecto mecánico comprobable de fábrica (Consulte nuestra política de Garantía).
        </p>

        <h3 className="text-xl font-serif text-on-surface mt-8 mb-4">4. Exactitud de Facturación y Cuenta</h3>
        <p>
          Nos reservamos el derecho de rechazar cualquier pedido que realice con nosotros. Nos reservamos el derecho de limitar o cancelar las cantidades compradas por persona, por hogar o por pedido según nuestro exclusivo criterio para evitar fraude. 
        </p>

        <h3 className="text-xl font-serif text-on-surface mt-8 mb-4">5. Propiedad Intelectual</h3>
        <p>
          Todo el contenido gráfico, diseño, copy, fotografía y arquitectura visual de Relojes VIGIA está protegido por derechos de Propiedad Intelectual aplicables en México (INDAUTOR, IMPI) y el extranjero. Queda estrictamente prohibida la copia, reproducción o modificación de nuestro diseño.
        </p>
      </div>
    </motion.div>
  );
}
