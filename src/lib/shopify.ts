const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_TOKEN;

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
