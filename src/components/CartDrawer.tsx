import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose, cart, onRemoveItem }: {
  isOpen: boolean;
  onClose: () => void;
  cart: any;
  onRemoveItem: (lineId: string) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-surface-low">
              <h2 className="font-serif text-xl tracking-widest text-on-surface uppercase">Tu Carrito</h2>
              <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {!cart || !cart.lines?.edges?.length ? (
                <div className="h-full flex flex-col items-center justify-center text-secondary space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="font-serif tracking-widest uppercase text-xs">Tu carrito está vacío</p>
                  <button onClick={onClose} className="text-primary text-xs tracking-widest uppercase hover:underline">Continuar comprando</button>
                </div>
              ) : (
                cart.lines.edges.map(({ node }: any) => {
                  const engraving = node.attributes?.find((a: any) => a.key === 'Grabado')?.value;
                  return (
                    <div key={node.id} className="flex gap-4 bg-surface-lowest p-4 rounded-2xl border border-white/5 relative group">
                      <div className="w-24 h-24 bg-surface-low rounded-xl overflow-hidden shrink-0">
                        <img src={node.merchandise.image?.url} alt={node.merchandise.product.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-grow">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-on-surface uppercase text-sm">{node.merchandise.product.title}</h3>
                            <button onClick={() => onRemoveItem(node.id)} className="text-secondary hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-secondary tracking-widest uppercase mt-1">{node.merchandise.title}</p>
                          {engraving && (
                            <p className="text-[10px] text-primary tracking-widest uppercase mt-2">Grabado: "{engraving}"</p>
                          )}
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-xs text-secondary">Cant: {node.quantity}</span>
                          <span className="font-serif text-on-surface">
                            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: node.merchandise.price.currencyCode }).format(node.merchandise.price.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart && cart.lines?.edges?.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-surface-low space-y-6">
                <div className="flex justify-between items-center text-on-surface">
                  <span className="text-xs tracking-widest uppercase text-secondary">
                    Subtotal <span className="text-[9px] tracking-[0.1em] opacity-60 lowercase">(impuestos incluidos)</span>
                  </span>
                  <span className="font-serif text-xl">
                    {new Intl.NumberFormat('es-MX', { style: 'currency', currency: cart.cost.totalAmount.currencyCode }).format(cart.cost.totalAmount.amount)}
                  </span>
                </div>
                <p className="text-[10px] text-secondary tracking-widest uppercase text-center">El costo de envío se calculará en la pantalla de pago</p>
                <a
                  href={cart.checkoutUrl}
                  className="w-full block text-center py-5 bg-primary text-on-primary rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-glow"
                >
                  Proceder al Pago
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
