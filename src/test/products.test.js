import { describe, expect, it } from 'vitest'
import { formatCLP, isAvailable, products } from '../data/products.js'

describe('formatCLP', () => {
  it('formatea un número como moneda chilena', () => {
    expect(formatCLP(59990)).toContain('59.990')
  })
})

describe('isAvailable', () => {
  it('retorna true cuando hay stock', () => {
    expect(isAvailable({ stock: 5 })).toBe(true)
  })

  it('retorna false cuando el stock es cero', () => {
    expect(isAvailable({ stock: 0 })).toBe(false)
  })

  it('el catálogo inicial tiene al menos un producto agotado y uno disponible', () => {
    expect(products.some((product) => product.stock === 0)).toBe(true)
    expect(products.some((product) => product.stock > 0)).toBe(true)
  })
})
