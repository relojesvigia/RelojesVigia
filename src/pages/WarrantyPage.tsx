import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, AlertTriangle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function WarrantyPage({ onBack }: Props) {
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

      <h1 className="text-4xl md:text-5xl font-serif italic text-on-surface mb-6">Garantía Limitada</h1>
      <div className="h-1 w-24 bg-primary mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-surface-low p-8 border border-white/5 rounded-2xl">
          <ShieldCheck size={32} className="text-primary mb-6" />
          <h3 className="text-xl font-serif text-on-surface mb-4">Qué está cubierto</h3>
          <ul className="space-y-3 text-secondary font-light text-sm list-disc pl-5">
            <li>Defectos de manufactura en el movimiento mecánico.</li>
            <li>Fallo en la reserva de marcha del calibre V-12 en condiciones normales.</li>
            <li>Desprendimiento de índices o manecillas en condiciones de trato normal.</li>
            <li>Garantía válida por un periodo de <strong className="text-primary font-normal">24 meses</strong> a partir de la fecha de entrega.</li>
          </ul>
        </div>
        
        <div className="bg-surface-low p-8 border border-white/5 rounded-2xl">
          <AlertTriangle size={32} className="text-red-500 mb-6" />
          <h3 className="text-xl font-serif text-on-surface mb-4">Qué NO está cubierto</h3>
          <ul className="space-y-3 text-secondary font-light text-sm list-disc pl-5">
            <li>Daños intencionales o por golpes severos contundentes (caídas libres).</li>
            <li>Desgaste normal de la correa o banda.</li>
            <li>Filtraciones de agua por superar el límite de tolerancia al agua estipulado (5 ATM / 50 Metros).</li>
            <li>Daños cosméticos producidos por fricción en el PVD y el acero en un uso prolongado.</li>
          </ul>
        </div>
      </div>

      <div className="prose prose-invert prose-stone max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-secondary mt-8">
        <p>
          En Relojes VIGIA sometemos cada pieza a un control de calidad exhaustivo de horología. Si experimenta problemas con el funcionamiento interno de su reloj debido a un defecto en sus materiales o ensamblaje durante los primeros 24 meses desde la recepción, VIGIA se hará cargo de los costos de reparación mediante nuestros talleres especializados.
        </p>
        <p>
          Para ejercer su garantía, es imperativo que conserve el correo en donde se demuestre la fecha y número de orden original de su reloj. Puede contactarnos enviando las evidencias y su número de orden al correo de soporte oficial.
        </p>
      </div>
    </motion.div>
  );
}
