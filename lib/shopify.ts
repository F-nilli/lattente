const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!
const API_VERSION = '2024-01'

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`)
  const { data } = await res.json()
  return data
}

const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          product { title handle }
          image { url altText }
          price { amount currencyCode }
        }
      }
    }
  }
  cost {
    totalAmount { amount currencyCode }
  }
`

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: { title: string; handle: string }
    image: { url: string; altText: string | null } | null
    price: { amount: string; currencyCode: string }
  }
}

export interface Cart {
  id: string
  checkoutUrl: string
  lines: { nodes: CartLine[] }
  cost: { totalAmount: { amount: string; currencyCode: string } }
}

export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(`
    mutation { cartCreate { cart { ${CART_FIELDS} } } }
  `)
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity }] })
  return data.cartLinesAdd.cart
}

export async function removeFromCart(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(`
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
    }
  `, { cartId, lineIds: [lineId] })
  return data.cartLinesRemove.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(`
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] })
  return data.cartLinesUpdate.cart
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<{ cart: Cart | null }>(`
      query GetCart($cartId: ID!) { cart(id: $cartId) { ${CART_FIELDS} } }
    `, { cartId })
    return data.cart
  } catch {
    return null
  }
}

const PRODUCT_FIELDS = `
  id
  title
  handle
  productType
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  images(first: 1) {
    nodes { url altText width height }
  }
  variants(first: 1) {
    nodes { id availableForSale }
  }
`

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      nodes { ${PRODUCT_FIELDS} }
    }
  }
`

const COLLECTIONS_QUERY = `
  query GetCollections {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        products(first: 50) {
          nodes { ${PRODUCT_FIELDS} }
        }
      }
    }
  }
`

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  productType: string
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  images: {
    nodes: Array<{ url: string; altText: string | null; width: number; height: number }>
  }
  variants: {
    nodes: Array<{ id: string; availableForSale: boolean }>
  }
}

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  products: { nodes: ShopifyProduct[] }
}

export async function getProducts(first = 8): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>(
    PRODUCTS_QUERY,
    { first }
  )
  return data.products.nodes
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{ collections: { nodes: ShopifyCollection[] } }>(
    COLLECTIONS_QUERY
  )
  return data.collections.nodes
}

export interface ShopifyProductDetail {
  id: string
  title: string
  handle: string
  descriptionHtml: string
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  images: {
    nodes: Array<{ url: string; altText: string | null; width: number; height: number }>
  }
  variants: {
    nodes: Array<{
      id: string
      title: string
      availableForSale: boolean
      price: { amount: string; currencyCode: string }
      selectedOptions: Array<{ name: string; value: string }>
    }>
  }
  options: Array<{ name: string; values: string[] }>
  collections: { nodes: Array<{ handle: string; title: string }> }
}

export async function getProduct(handle: string): Promise<ShopifyProductDetail | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProductDetail | null }>(`
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          id title handle descriptionHtml
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 10) { nodes { url altText width height } }
          options { name values }
          collections(first: 1) { nodes { handle title } }
          variants(first: 50) {
            nodes {
              id title availableForSale
              price { amount currencyCode }
              selectedOptions { name value }
            }
          }
        }
      }
    `, { handle })
    return data.product
  } catch {
    return null
  }
}

export async function getCollectionProducts(handle: string, first = 8): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ collection: { products: { nodes: ShopifyProduct[] } } | null }>(`
      query GetCollectionProducts($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          products(first: $first) {
            nodes { ${PRODUCT_FIELDS} }
          }
        }
      }
    `, { handle, first })
    return data.collection?.products.nodes ?? []
  } catch {
    return []
  }
}

export function formatPrice(amount: string, _currencyCode: string): string {
  const num = Math.round(Number(amount))
  return '$ ' + num.toLocaleString('en-US').replace(/,/g, '.')
}
