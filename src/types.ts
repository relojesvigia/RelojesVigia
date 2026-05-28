export type Page = 'home' | 'collection' | 'nosotros' | 'personalize' | 'modelo-carajo' | 'faq' | 'terms' | 'warranty' | 'ocasiones';

export interface ProductVariant {
  color: 'NEGRO' | 'BLANCO';
  shopifyId?: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  variants: ProductVariant[];
}
