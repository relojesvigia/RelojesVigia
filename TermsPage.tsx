const domain = (import.meta as any).env.VITE_SHOPIFY_DOMAIN;
const token = (import.meta as any).env.VITE_SHOPIFY_TOKEN;

export async function createCheckout(variantId: string, engravingText: string) {
  const lineItem = {
    merchandiseId: variantId,
    quantity: 1,
    attributes: engravingText ? [{ key: "Grabado", value: engravingText }] : []
  };

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: [lineItem]
    }
  };

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();
  
  if (errors) {
    throw new Error(errors[0].message);
  }
  
  if (data?.cartCreate?.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart.checkoutUrl;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($id: ID!) {
      cart(id: $id) {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              attributes {
                key
                value
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                  }
                  product {
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = { id: cartId };

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0].message);
  return data?.cart;
}

export async function createCart(variantId: string, engravingText: string) {
  const lineItem = {
    merchandiseId: variantId,
    quantity: 1,
    attributes: engravingText ? [{ key: "Grabado", value: engravingText }] : []
  };

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }
  `;

  const variables = {
    input: { lines: [lineItem] }
  };

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0].message);
  if (data?.cartCreate?.userErrors?.length) throw new Error(data.cartCreate.userErrors[0].message);

  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, engravingText: string) {
  const lineItem = {
    merchandiseId: variantId,
    quantity: 1,
    attributes: engravingText ? [{ key: "Grabado", value: engravingText }] : []
  };

  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
        userErrors {
          message
        }
      }
    }
  `;

  const variables = { cartId, lines: [lineItem] };

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0].message);
  if (data?.cartLinesAdd?.userErrors?.length) throw new Error(data.cartLinesAdd.userErrors[0].message);

  return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineId: string) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
        }
        userErrors {
          message
        }
      }
    }
  `;

  const variables = { cartId, lineIds: [lineId] };

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0].message);
  if (data?.cartLinesRemove?.userErrors?.length) throw new Error(data.cartLinesRemove.userErrors[0].message);

  return data.cartLinesRemove.cart;
}

export async function getLiveVariantInfo(variantId: string) {
  const query = `
    query getVariant($id: ID!) {
      node(id: $id) {
        ... on ProductVariant {
          id
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
  `;

  const variables = { id: variantId };

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();
  
  if (errors) {
    console.error(errors);
    return null;
  }

  return data?.node;
}
