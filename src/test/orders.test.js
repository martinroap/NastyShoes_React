import { describe, expect, it } from 'vitest'
import { createOrder, nextOrderId, updateOrderStatus, validatePayment } from '../data/orders.js'

describe('nextOrderId', () => {
  it('empieza en 1001 cuando no hay pedidos', () => {
    expect(nextOrderId([])).toBe(1001)
  })

  it('incrementa a partir del mayor id existente', () => {
    expect(nextOrderId([{ id: 1001 }, { id: 1005 }])).toBe(1006)
  })
})

describe('validatePayment', () => {
  it('no retorna errores con datos válidos', () => {
    const errors = validatePayment({ cardNumber: '1234567890123456', cardExpiry: '08/27', cardCvv: '123' })
    expect(errors).toEqual({})
  })

  it('retorna errores con datos inválidos', () => {
    const errors = validatePayment({ cardNumber: '123', cardExpiry: '13/99', cardCvv: '12' })
    expect(errors.cardNumber).toBeDefined()
    expect(errors.cardExpiry).toBeDefined()
    expect(errors.cardCvv).toBeDefined()
  })
})

describe('createOrder', () => {
  it('crea un pedido con estado pagado', () => {
    const order = createOrder({ id: 1001, user: { email: 'cliente@correo.com' }, items: [], shipping: {}, total: 1000 })
    expect(order.status).toBe('pagado')
    expect(order.userEmail).toBe('cliente@correo.com')
  })
})

describe('updateOrderStatus', () => {
  it('actualiza el estado del pedido indicado', () => {
    const orders = [{ id: 1001, status: 'pagado' }]
    const updated = updateOrderStatus(orders, 1001, 'enviado')
    expect(updated[0].status).toBe('enviado')
  })
})
