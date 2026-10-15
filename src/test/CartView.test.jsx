import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartView from '../compose/CartView.jsx'

const cartDetails = [{ productId: 1, size: 40, qty: 2, subtotal: 2000, product: { id: 1, name: 'Zapatilla 1', stock: 5 } }]

describe('CartView', () => {
  it('muestra un mensaje cuando el carrito está vacío', () => {
    render(<CartView cartDetails={[]} total={0} onUpdateQty={() => {}} onRemove={() => {}} onCheckout={() => {}} />)
    expect(screen.getByText(/carrito está vacío/i)).toBeInTheDocument()
  })

  it('lista los productos y permite quitar uno', async () => {
    const onRemove = vi.fn()
    render(<CartView cartDetails={cartDetails} total={2000} onUpdateQty={() => {}} onRemove={onRemove} onCheckout={() => {}} />)
    expect(screen.getByText('Zapatilla 1')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /quitar/i }))
    expect(onRemove).toHaveBeenCalledWith(1, 40)
  })

  it('llama a onCheckout al continuar al pago', async () => {
    const onCheckout = vi.fn()
    render(<CartView cartDetails={cartDetails} total={2000} onUpdateQty={() => {}} onRemove={() => {}} onCheckout={onCheckout} />)
    await userEvent.click(screen.getByRole('button', { name: /ir a pagar/i }))
    expect(onCheckout).toHaveBeenCalled()
  })
})
