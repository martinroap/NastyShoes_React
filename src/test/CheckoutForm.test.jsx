import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutForm from '../compose/CheckoutForm.jsx'

const cartDetails = [{ productId: 1, size: 40, qty: 1, subtotal: 1000, product: { id: 1, name: 'Zapatilla 1' } }]

describe('CheckoutForm', () => {
  it('muestra errores cuando los datos son inválidos', async () => {
    const onConfirm = vi.fn()
    render(<CheckoutForm cartDetails={cartDetails} total={1000} onConfirm={onConfirm} />)
    await userEvent.click(screen.getByRole('button', { name: /confirmar y pagar/i }))
    expect(onConfirm).not.toHaveBeenCalled()
    expect(screen.getByText(/dirección válida/i)).toBeInTheDocument()
  })

  it('confirma el pedido cuando los datos son válidos', async () => {
    const onConfirm = vi.fn()
    render(<CheckoutForm cartDetails={cartDetails} total={1000} onConfirm={onConfirm} />)
    await userEvent.type(screen.getByLabelText(/dirección/i), 'Av. Siempre Viva 123')
    await userEvent.type(screen.getByLabelText(/comuna/i), 'Santiago')
    await userEvent.type(screen.getByLabelText(/teléfono/i), '+56912345678')
    await userEvent.type(screen.getByLabelText(/número de tarjeta/i), '1234567890123456')
    await userEvent.type(screen.getByLabelText(/vencimiento/i), '08/27')
    await userEvent.type(screen.getByLabelText(/cvv/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /confirmar y pagar/i }))
    expect(onConfirm).toHaveBeenCalledWith({ address: 'Av. Siempre Viva 123', city: 'Santiago', phone: '+56912345678' })
  })
})
