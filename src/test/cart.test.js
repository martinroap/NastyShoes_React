import { describe, expect, it } from 'vitest'
import { addToCart, getCartDetails, getCartTotal, removeFromCart, updateQuantity } from '../data/cart.js'

const product = { id: 1, name: 'Zapatilla 1', price: 1000, stock: 3 }
const products = [product]

describe('addToCart', () => {
  it('agrega un producto nuevo', () => {
    const cart = addToCart([], product, 40, 2)
    expect(cart).toEqual([{ productId: 1, size: 40, qty: 2 }])
  })

  it('suma cantidades si ya existe el mismo producto y talla', () => {
    const cart = addToCart([{ productId: 1, size: 40, qty: 1 }], product, 40, 1)
    expect(cart[0].qty).toBe(2)
  })

  it('no supera el stock disponible', () => {
    const cart = addToCart([{ productId: 1, size: 40, qty: 2 }], product, 40, 5)
    expect(cart[0].qty).toBe(3)
  })
})

describe('updateQuantity', () => {
  it('actualiza la cantidad respetando el stock', () => {
    const cart = updateQuantity([{ productId: 1, size: 40, qty: 1 }], products, 1, 40, 10)
    expect(cart[0].qty).toBe(3)
  })

  it('no permite cantidades menores a 1', () => {
    const cart = updateQuantity([{ productId: 1, size: 40, qty: 1 }], products, 1, 40, 0)
    expect(cart[0].qty).toBe(1)
  })
})

describe('removeFromCart', () => {
  it('elimina el ítem indicado', () => {
    const cart = removeFromCart([{ productId: 1, size: 40, qty: 1 }], 1, 40)
    expect(cart).toHaveLength(0)
  })
})

describe('getCartDetails y getCartTotal', () => {
  it('calcula subtotales y total', () => {
    const cart = [{ productId: 1, size: 40, qty: 2 }]
    const details = getCartDetails(cart, products)
    expect(details[0].subtotal).toBe(2000)
    expect(getCartTotal(cart, products)).toBe(2000)
  })

  it('ignora ítems de productos eliminados', () => {
    const cart = [{ productId: 99, size: 40, qty: 2 }]
    expect(getCartDetails(cart, products)).toHaveLength(0)
    expect(getCartTotal(cart, products)).toBe(0)
  })
})
