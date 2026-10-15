function findProduct(products, productId) {
  return products.find((product) => product.id === productId)
}

export function addToCart(cart, product, size, qty) {
  const existing = cart.find((item) => item.productId === product.id && item.size === size)
  if (existing) {
    const newQty = Math.min(existing.qty + qty, product.stock)
    return cart.map((item) => item === existing ? { ...item, qty: newQty } : item)
  }
  return [...cart, { productId: product.id, size, qty: Math.min(qty, product.stock) }]
}

export function updateQuantity(cart, products, productId, size, qty) {
  const product = findProduct(products, productId)
  const stock = product ? product.stock : 0
  const clamped = Math.max(1, Math.min(qty, stock))
  return cart.map((item) => item.productId === productId && item.size === size ? { ...item, qty: clamped } : item)
}

export function removeFromCart(cart, productId, size) {
  return cart.filter((item) => !(item.productId === productId && item.size === size))
}

export function getCartDetails(cart, products) {
  return cart.map((item) => {
    const product = findProduct(products, item.productId)
    return { ...item, product, subtotal: product ? product.price * item.qty : 0 }
  }).filter((item) => item.product)
}

export function getCartTotal(cart, products) {
  return getCartDetails(cart, products).reduce((total, item) => total + item.subtotal, 0)
}
