export const ORDER_STATUSES = ['pagado', 'preparado', 'enviado', 'entregado']

export function nextOrderId(orders) {
  return orders.reduce((max, order) => Math.max(max, order.id), 1000) + 1
}

export function validatePayment({ cardNumber, cardExpiry, cardCvv }) {
  const errors = {}
  if (!/^\d{16}$/.test(cardNumber.trim())) errors.cardNumber = 'La tarjeta debe tener 16 dígitos.'
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.trim())) errors.cardExpiry = 'Usa el formato MM/AA.'
  if (!/^\d{3}$/.test(cardCvv.trim())) errors.cardCvv = 'El CVV debe tener 3 dígitos.'
  return errors
}

export function createOrder({ id, user, items, shipping, total }) {
  return {
    id,
    userEmail: user.email,
    items,
    shipping,
    total,
    status: 'pagado',
    createdAt: new Date().toISOString(),
  }
}

export function updateOrderStatus(orders, orderId, status) {
  return orders.map((order) => order.id === orderId ? { ...order, status } : order)
}
