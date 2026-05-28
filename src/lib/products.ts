import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'carajo',
    name: 'Modelo Carajo',
    description: 'El “carajo” era originalmente una parte del barco: una pequeña canastilla en lo alto del mástil donde se colocaba el vigía. Desde ahí, su función era observar el horizonte, detectar peligros, anunciar tierra o anticipar tormentas. Era un punto solitario, expuesto al viento y al mar, reservado para quien tenía la responsabilidad de ver más allá que los demás.',
    price: '$2,450.00',
    variants: [
      {
        color: 'NEGRO',
        shopifyId: 'gid://shopify/ProductVariant/50679276503287',
        images: [
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp',
          'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000',
          'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000',
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
        ]
      },
      {
        color: 'BLANCO',
        shopifyId: 'gid://shopify/ProductVariant/50679276536055',
        images: [
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White3.webp',
          'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=1000',
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White1.webp',
          'https://x5ue9cp6zjzexrab.public.blob.vercel-storage.com/Carajo%20Blanco%20imagenes/White2.webp',
          'https://images.unsplash.com/photo-1539533331302-7eb39159f5d8?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1549463591-14cc58e15c3e?auto=format&fit=crop&q=80&w=1200'
        ]
      }
    ]
  }
];

