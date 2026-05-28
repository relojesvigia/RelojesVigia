import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Loader2, Shield, UserCheck, MapPin, Truck } from 'lucide-react';
import { Page } from '../types';
import { PRODUCTS } from '../lib/products';
import { getLiveVariantInfo } from '../lib/shopify';

export const ProductDetailPage = ({ 
  productId, 
  initialVariant, 
  setPage, 
  engravingText, 
  setEngravingText, 
  onAddToCart 
}: { 
  productId: string, 
  initialVariant: 'NEGRO' | 'BLANCO', 
  setPage: (p: Page) => void, 
  engravingText: string, 
  setEngravingText: (t: string) => void, 
  onAddToCart: (variantId: string, text: string) => Promise<void> 
}) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedColor, setSelectedColor] = useState<'NEGRO' | 'BLANCO'>(initialVariant);
  const currentVariant = product.variants.find(v => v.color === selectedColor) || product.variants[0];
  const [mainImage, setMainImage] = useState(currentVariant.images[0]);
  const [showModal, setShowModal] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [livePrice, setLivePrice] = useState<string | null>("Calculando...");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isTabExpanded, setIsTabExpanded] = useState(false);
  const suggestions = ['PARA SIEMPRE', 'NOSOTROS', '03.02.26'];

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      await onAddToCart(currentVariant.shopifyId as string, engravingText);
      setIsCheckingOut(false);
      setShowModal(false);
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Error al agregar al carrito. Por favor intenta de nuevo.");
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
      className="min-h-screen bg-[#0d0c0c] text-on-surface flex flex-col pt-16 md:pt-24"
    >
      {/* ========================================================== */}
      {/*                       MOBILE VERSION                       */}
      {/* ========================================================== */}
      <div className="md:hidden flex flex-col relative w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Main Pinned Static Image */}
        <div className="absolute top-4 left-4 right-4 bottom-[200px] z-0 flex items-center justify-center">
          <motion.img 
            key={mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-2xl shadow-glow"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c0c]/10 via-transparent to-[#0d0c0c]/40 rounded-2xl"></div>
        </div>

        {/* Floating Vertical Previews Tray */}
        <div className="absolute right-8 top-[8%] z-10 py-3.5 px-2 bg-stone-950/60 backdrop-blur-md border border-white/10 rounded-full flex flex-col gap-3 items-center shadow-2xl">
          {currentVariant.images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                mainImage === img ? 'border-[#e4bfaa] scale-110 shadow-glow' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>

        {/* Sliding Card Drawer (Uneven Corners: rounded-tl-[1.8rem] rounded-tr-[5.8rem]) */}
        <div className={`fixed bottom-0 left-0 right-0 z-40 bg-[#141211]/98 backdrop-blur-xl border-t border-r border-[#e4bfaa]/20 shadow-[0_-12px_45px_rgba(0,0,0,0.92)] transition-all duration-500 ease-in-out flex flex-col rounded-tl-[1.8rem] rounded-tr-[5.8rem] ${
          isTabExpanded ? 'h-[82vh]' : 'h-[220px]'
        }`}>
          {/* Minimalist Toggle Chevron indicator */}
          <div 
            onClick={() => setIsTabExpanded(!isTabExpanded)}
            className="w-full py-4 flex flex-col items-center justify-center cursor-pointer select-none shrink-0"
          >
            <div className="text-[#e4bfaa]/60 hover:text-[#e4bfaa] transition-colors">
              {isTabExpanded ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 transition-transform duration-300"><polyline points="18 15 12 9 6 15"></polyline></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300"><polyline points="18 15 12 9 6 15"></polyline></svg>
              )}
            </div>
          </div>

          {/* Collapsed Top Info Header */}
          <div 
            onClick={() => setIsTabExpanded(!isTabExpanded)}
            className="px-8 pb-5 flex justify-between items-start cursor-pointer select-none shrink-0 border-b border-white/10"
          >
            <div>
              <h2 className="text-2xl font-serif tracking-tight text-on-surface uppercase font-bold">{product.name}</h2>
              <span className={`font-serif text-sm italic block mt-1 ${livePrice === "Calculando..." ? "text-stone-400" : "text-[#e4bfaa]"}`}>{livePrice}</span>
            </div>
            <div className="text-right flex flex-col items-end justify-center pt-1">
              <span className={`text-[9px] tracking-[0.2em] uppercase font-bold block ${isAvailable ? 'text-[#e4bfaa]' : 'text-stone-400'}`}>
                {isAvailable ? 'En Stock' : 'Agotado'}
              </span>
              <span className="text-[8px] text-stone-500 tracking-[0.1em] uppercase block mt-1">Próxima producción</span>
            </div>
          </div>

          {/* Scrollable Contents (revealed when expanded) */}
          <div className="flex-grow overflow-y-auto px-8 pb-36 pt-6 space-y-8">
            {/* CONFIGURACIÓN DE CAJA */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold block">CONFIGURACIÓN DE CAJA</span>
              <div className="flex justify-between items-center bg-[#1a1817] p-3 rounded-2xl border border-white/12">
                <div className="bg-[#e4bfaa] text-[#422b1d] rounded-xl px-5 py-2.5 font-sans font-bold text-xs tracking-wider border border-[#e4bfaa]/20">
                  40 mm
                </div>
                
                {/* Swatches pill */}
                <div className="bg-[#242120] border border-white/15 py-1.5 px-3.5 flex gap-3.5 rounded-full items-center">
                  <button 
                    onClick={() => setSelectedColor('NEGRO')}
                    className={`w-6 h-6 rounded-full bg-black transition-all ${
                      selectedColor === 'NEGRO' ? 'ring-2 ring-[#e4bfaa] ring-offset-2 ring-offset-[#242120]' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                  <button 
                    onClick={() => setSelectedColor('BLANCO')}
                    className={`w-6 h-6 rounded-full bg-stone-200 transition-all ${
                      selectedColor === 'BLANCO' ? 'ring-2 ring-[#e4bfaa] ring-offset-2 ring-offset-[#242120]' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* TAPA POSTERIOR */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold block">TAPA POSTERIOR</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => {}}
                  className="bg-[#e4bfaa] text-[#422b1d] font-serif font-bold text-xs tracking-wider rounded-xl py-3.5 px-4 flex-1 text-center border border-[#e4bfaa]/20"
                >
                  Tapa de Cristal (Zafiro)
                </button>
                <button 
                  disabled
                  className="bg-[#1a1817] border border-white/10 text-stone-600 font-serif text-xs tracking-wider rounded-xl py-3.5 px-4 flex-1 text-center cursor-not-allowed"
                >
                  Tapa de Acero Sólido
                </button>
              </div>
            </div>

            {/* GRABADO LÁSER (OPCIONAL) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold">GRABADO LÁSER (OPCIONAL)</span>
                <span className="border border-white/15 px-2.5 py-0.5 rounded-[4px] text-[8px] text-[#e4bfaa] tracking-widest uppercase font-serif font-bold">GRATIS</span>
              </div>
              
              <div className="bg-[#1a1817] border border-white/12 rounded-2xl p-4 flex justify-between items-center relative group focus-within:border-primary/45 transition-all">
                <input 
                  className="w-full bg-transparent pr-16 text-base font-serif tracking-[0.15em] text-[#e4bfaa] focus:outline-none placeholder:text-white/15 uppercase" 
                  maxLength={20} 
                  placeholder="ESCRIBE TU LEGADO AQUÍ" 
                  type="text"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                />
                <div className="absolute right-5 font-serif text-xs tracking-widest text-stone-500">
                  <span>{engravingText.length}</span> / 20
                </div>
              </div>

              {/* Suggestions pills */}
              <div className="flex gap-2 flex-wrap pt-1">
                {suggestions.map((text) => (
                  <button 
                    key={text}
                    onClick={() => setEngravingText(text)}
                    className="px-3.5 py-1.5 border border-white/10 bg-[#201d1c] text-stone-300 text-[9px] tracking-wider rounded-lg uppercase hover:border-[#e4bfaa]/50 hover:text-[#e4bfaa] transition-all duration-300"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            {/* ESPECIFICACIONES TÉCNICAS */}
            <div className="space-y-4 pt-2">
              <h3 className="text-2xl font-serif italic text-on-surface font-semibold">Especificaciones Técnicas</h3>
              <div className="space-y-2">
                {[
                  { label: "Diámetro de caja", value: "40mm" },
                  { label: "Caja y correa", value: "Acero inoxidable 316-L" },
                  { label: "Tipo de cristal", value: "Zafiro" },
                  { label: "Tipo de movimiento", value: "Automático japonés" },
                  { label: "Resistencia al agua", value: "5 ATM" },
                  { label: "Reserva de marcha", value: "41 horas" },
                  { label: "Ancho de correa", value: "20mm" },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-3.5 px-4 bg-[#1a1817] border border-white/10 rounded-xl">
                    <span className="text-[10px] tracking-widest uppercase text-stone-400 font-medium">{spec.label}</span>
                    <span className="text-xs font-serif text-on-surface">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EL SIGNIFICADO COLECTIVO */}
            <div className="pt-4 pb-2 space-y-4">
              <span className="text-[#e4bfaa] font-bold tracking-[0.3em] uppercase text-[9px] block">EL SIGNIFICADO COLECTIVO</span>
              <h3 className="text-3xl font-serif italic text-on-surface font-semibold">¿Qué es un Carajo?</h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed italic border-l border-[#e4bfaa]/25 pl-4 py-1.5 bg-[#1a1817]/40 rounded-r-xl pr-2">
                "{product.description}"
              </p>
            </div>

            {/* FEATURES 2x2 GRID */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: <Shield size={16} />, text: "24 MESES DE GARANTÍA" },
                { icon: <UserCheck size={16} />, text: "TRATO DIRECTO TALLER" },
                { icon: <MapPin size={16} />, text: "ENSAMBLADO EN MÉXICO" },
                { icon: <Truck size={16} />, text: "ENVÍOS ASEGURADOS" },
              ].map((badge, i) => (
                <div key={i} className="border border-white/10 bg-[#1a1817] p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center shadow-sm">
                  <span className="text-[#e4bfaa]">{badge.icon}</span>
                  <span className="text-[8px] tracking-widest uppercase text-stone-300 font-semibold leading-normal">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Bottom Floating CTA Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-950 via-[#161413] to-transparent z-[90] flex gap-4 items-center shrink-0">
            <button 
              onClick={() => setShowModal(true)}
              disabled={isCheckingOut || !isAvailable}
              className="flex-1 py-4 bg-[#7a6859] hover:bg-[#8d7969] text-white rounded-full font-serif font-bold tracking-[0.15em] uppercase text-xs shadow-glow transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCheckingOut ? <Loader2 size={14} className="animate-spin" /> : null}
              {isCheckingOut ? 'AGREGANDO...' : (isAvailable ? 'Agregar al Carrito' : 'AGOTADO')}
            </button>
            <a 
              href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center text-white shadow-lg shrink-0 transition-all active:scale-[0.98]"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/*                      DESKTOP VERSION                       */}
      {/* ========================================================== */}
      <div className="hidden md:flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex-1 gap-16">
        {/* Top Section: side-by-side (Gallery & Options/Purchase UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full">
          {/* Left Gallery Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 sticky top-28 select-none">
            <div className="aspect-[4/5] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-white/5">
              {/* Back Button */}
              <button 
                onClick={() => setPage('collection')} 
                className="absolute top-6 left-6 z-10 px-4 py-2 border border-white/10 bg-black/40 hover:bg-white/10 rounded-full text-[10px] tracking-widest uppercase font-serif text-secondary hover:text-white transition-all flex items-center gap-1.5 backdrop-blur-sm"
              >
                ← atrás
              </button>

              {/* Slider Navigation Chevrons */}
              <button 
                onClick={() => {
                  const currentIdx = currentVariant.images.indexOf(mainImage);
                  const prevIdx = currentIdx === 0 ? currentVariant.images.length - 1 : currentIdx - 1;
                  setMainImage(currentVariant.images[prevIdx]);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 flex items-center justify-center text-secondary hover:text-white transition-all z-10 backdrop-blur-sm"
              >
                ‹
              </button>
              <button 
                onClick={() => {
                  const currentIdx = currentVariant.images.indexOf(mainImage);
                  const nextIdx = currentIdx === currentVariant.images.length - 1 ? 0 : currentIdx + 1;
                  setMainImage(currentVariant.images[nextIdx]);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-black/30 hover:bg-white/10 flex items-center justify-center text-secondary hover:text-white transition-all z-10 backdrop-blur-sm"
              >
                ›
              </button>

              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            
            {/* Horizontal Thumbnails Row */}
            <div className="flex gap-4 justify-center">
              {currentVariant.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    mainImage === img ? 'border-[#e4bfaa] scale-105 shadow-glow' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Details Column (Options / Purchase Panel) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-10">
            {/* Header Info */}
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#e4bfaa] font-bold">Primera Edición de Vigía</span>
              <h1 className="text-5xl font-serif tracking-tighter text-on-surface uppercase font-bold mt-2">{product.name}</h1>
              <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 block mb-1">Precio</span>
                  <span className={`font-serif text-3xl ${livePrice === "Calculando..." ? "text-stone-400 italic" : "text-[#e4bfaa]"}`}>{livePrice}</span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] tracking-[0.2em] uppercase font-bold block ${isAvailable ? 'text-[#e4bfaa]' : 'text-stone-500'}`}>
                    {isAvailable ? 'En Stock' : 'Agotado'}
                  </span>
                  <span className="text-xs text-stone-500 mt-1 block font-serif">Próxima producción</span>
                </div>
              </div>
            </div>

            {/* Options UI Card Container */}
            <div className="bg-[#1a1817] p-8 rounded-2xl border border-white/12 space-y-8 shadow-sm">
              {/* CONFIGURACIÓN DE CAJA */}
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold block">CONFIGURACIÓN DE CAJA</span>
                <div className="flex justify-between items-center bg-[#201d1c] p-3 rounded-2xl border border-white/10">
                  <div className="bg-[#e4bfaa] text-[#422b1d] rounded-xl px-5 py-2.5 font-sans font-bold text-xs tracking-wider border border-[#e4bfaa]/20 shadow-sm">
                    40 mm
                  </div>
                  
                  {/* Swatches pill */}
                  <div className="bg-[#2a2625] border border-white/15 py-1.5 px-3.5 flex gap-3.5 rounded-full items-center">
                    <button 
                      onClick={() => setSelectedColor('NEGRO')}
                      className={`w-6 h-6 rounded-full bg-black transition-all ${
                        selectedColor === 'NEGRO' ? 'ring-2 ring-[#e4bfaa] ring-offset-2 ring-offset-[#2a2625]' : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                    <button 
                      onClick={() => setSelectedColor('BLANCO')}
                      className={`w-6 h-6 rounded-full bg-stone-200 transition-all ${
                        selectedColor === 'BLANCO' ? 'ring-2 ring-[#e4bfaa] ring-offset-2 ring-offset-[#2a2625]' : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* TAPA POSTERIOR */}
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold block">TAPA POSTERIOR</span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {}}
                    className="bg-[#e4bfaa] text-[#422b1d] font-serif font-bold text-xs tracking-wider rounded-xl py-3.5 px-6 flex-1 text-center border border-[#e4bfaa]/20 shadow-sm"
                  >
                    Tapa de Cristal (Zafiro)
                  </button>
                  <button 
                    disabled
                    className="bg-[#201d1c] border border-white/10 text-stone-600 font-serif text-xs tracking-wider rounded-xl py-3.5 px-6 flex-1 text-center cursor-not-allowed"
                  >
                    Tapa de Acero Sólido
                  </button>
                </div>
              </div>

              {/* GRABADO LÁSER (OPCIONAL) */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-semibold">GRABADO LÁSER (OPCIONAL)</span>
                  <span className="border border-white/15 px-3 py-1 rounded-[6px] text-[9px] text-[#e4bfaa] tracking-widest uppercase font-serif font-bold">GRATIS</span>
                </div>
                
                <div className="bg-[#201d1c] border border-white/10 rounded-2xl p-4 flex justify-between items-center relative group focus-within:border-primary/45 transition-all shadow-inner">
                  <input 
                    className="w-full bg-transparent pr-16 text-base font-serif tracking-[0.15em] text-[#e4bfaa] focus:outline-none placeholder:text-white/15 uppercase" 
                    maxLength={20} 
                    placeholder="ESCRIBE TU LEGADO AQUÍ" 
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                  />
                  <div className="absolute right-5 font-serif text-xs tracking-widest text-stone-500">
                    <span>{engravingText.length}</span> / 20
                  </div>
                </div>

                {/* Suggestions pills */}
                <div className="flex gap-2 flex-wrap pt-1">
                  {suggestions.map((text) => (
                    <button 
                      key={text}
                      onClick={() => setEngravingText(text)}
                      className="px-4 py-2 border border-white/10 bg-[#282423] text-stone-300 text-[10px] tracking-wider rounded-lg uppercase hover:border-[#e4bfaa]/50 hover:text-[#e4bfaa] transition-all duration-300"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sticky Action CTA Bar */}
              <div className="pt-6 border-t border-white/12 flex gap-4 items-center">
                <button 
                  onClick={() => setShowModal(true)}
                  disabled={isCheckingOut || !isAvailable}
                  className="flex-1 py-4.5 bg-[#7a6859] hover:bg-[#8d7969] text-white rounded-full font-serif font-bold tracking-[0.15em] uppercase text-sm shadow-glow transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isCheckingOut ? 'AGREGANDO...' : (isAvailable ? 'Agregar al Carrito' : 'AGOTADO')}
                </button>
                <a 
                  href="https://wa.me/4422553528?text=Hola,%20tengo%20una%20duda%20acerca%20de%20los%20relojes%20Vigia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center text-white shadow-lg shrink-0 transition-all active:scale-[0.98]"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Full width specifications and info underneath */}
        <div className="mt-12 pt-16 border-t border-white/10 space-y-16 w-full">
          {/* Specifications Table (2-column layout for horizontal balance) */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif italic text-on-surface font-semibold">Especificaciones del reloj</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-12 bg-[#1a1817] p-10 rounded-2xl border border-white/12 shadow-sm">
              {[
                { label: "Diámetro de caja", value: "40mm" },
                { label: "Caja y correa", value: "Acero inoxidable 316-L" },
                { label: "Tipo de cristal", value: "Safiro" },
                { label: "Tipo de movimiento", value: "Automático japonés" },
                { label: "Resistencia al agua", value: "5 ATM" },
                { label: "Reserva de marcha", value: "41 horas" },
                { label: "Ancho de correa", value: "20mm" },
                { label: "Tipo de cierre", value: "Buckle" },
                { label: "Grabado", value: "Láser permanente" },
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0 md:[&:nth-last-child(2)]:border-b-0">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-bold">{spec.label}</span>
                  <span className="text-base font-serif text-on-surface">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EL SIGNIFICADO COLECTIVO (Full-width custom banner) */}
          <div className="bg-[#1a1817] p-12 rounded-2xl border border-white/12 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#e4bfaa]/5 blur-3xl rounded-full"></div>
            <div className="relative z-10 max-w-4xl space-y-6">
              <span className="text-[#e4bfaa] font-bold tracking-[0.3em] uppercase text-xs block">EL SIGNIFICADO COLECTIVO</span>
              <h3 className="text-5xl font-serif italic text-on-surface font-semibold">¿Qué es un Carajo?</h3>
              <p className="text-stone-200 text-lg font-light leading-relaxed italic border-l-2 border-[#e4bfaa]/35 pl-6 py-2">
                "{product.description}"
              </p>
            </div>
          </div>

          {/* Badges 4-Column Row Grid (Full Horizontal balance) */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: <Shield size={20} />, text: "24 MESES DE GARANTÍA" },
              { icon: <UserCheck size={20} />, text: "TRATO DIRECTO TALLER" },
              { icon: <MapPin size={20} />, text: "ENSAMBLADO EN MÉXICO" },
              { icon: <Truck size={20} />, text: "ENVÍOS ASEGURADOS" },
            ].map((badge, i) => (
              <div key={i} className="border border-white/12 bg-[#1a1817] p-6 rounded-2xl flex flex-col items-center justify-center gap-3 text-center shadow-sm">
                <span className="text-[#e4bfaa] shrink-0">{badge.icon}</span>
                <span className="text-[10px] tracking-widest uppercase text-stone-300 font-bold leading-snug">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/*                    COMMON CHECKOUT MODAL                   */}
      {/* ========================================================== */}
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
              className="relative bg-[#161413] border border-white/10 p-8 md:p-12 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col items-center text-center"
            >
              <div className="absolute -top-12 opacity-50">
                <Sparkles size={32} className="text-[#e4bfaa]" />
              </div>
              <span className="text-[#e4bfaa] font-bold tracking-[0.4em] uppercase text-[10px] block mb-6">Confirmación</span>
              
              {engravingText.trim() === '' ? (
                <>
                  <h3 className="text-2xl md:text-3xl font-serif text-on-surface mb-4 font-bold">¿Quieres agregar un grabado personalizado sin costo?</h3>
                  <p className="text-stone-400 text-sm font-light leading-relaxed mb-10">
                    Si no escribes nada, tu reloj llevará el grabado predeterminado del modelo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="w-full py-4 border border-white/10 text-on-surface rounded-full font-serif tracking-[0.1em] uppercase text-[10px] transition-all hover:bg-white/5 active:scale-[0.98]"
                    >
                      ← Agregar grabado
                    </button>
                    <button 
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-4 bg-[#7a6859] text-white rounded-full font-serif font-bold uppercase tracking-[0.1em] text-[10px] transition-all hover:bg-[#8d7969] active:scale-[0.98] shadow-glow flex justify-center items-center gap-2"
                    >
                      {isCheckingOut ? <Loader2 size={14} className="animate-spin" /> : null}
                      {isCheckingOut ? 'AGREGANDO...' : 'Continuar sin personalizar →'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-serif text-on-surface mb-4 font-bold">Confirma tu grabado:</h3>
                  <div className="bg-stone-950/60 border border-white/5 w-full py-6 rounded-2xl mb-6 shadow-inner">
                    <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-[#e4bfaa] break-words px-4 font-bold">
                      "{engravingText.toUpperCase()}"
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm font-light leading-relaxed mb-10">
                    ¿Deseas continuar con este mensaje?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="w-full py-4 border border-white/10 text-on-surface rounded-full font-serif tracking-[0.1em] uppercase text-[10px] transition-all hover:bg-white/5 active:scale-[0.98]"
                    >
                      ← Editar grabado
                    </button>
                    <button 
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-4 bg-[#7a6859] text-white rounded-full font-serif font-bold uppercase tracking-[0.1em] text-[10px] transition-all hover:bg-[#8d7969] active:scale-[0.98] shadow-glow flex justify-center items-center gap-2"
                    >
                      {isCheckingOut ? <Loader2 size={14} className="animate-spin" /> : null}
                      {isCheckingOut ? 'AGREGANDO...' : 'Confirmar y agregar →'}
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
