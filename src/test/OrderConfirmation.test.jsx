import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrderConfirmation from '../compose/OrderConfirmation.jsx'

const order = { id: 1001, status: 'pagado', total: 1000, items: [{ productId: 1, name: 'Zapatilla 1', size: 40, qty: 1, price: 1000 }] }

describe('OrderConfirmation', () => {
  it('no renderiza nada si no hay pedido', () => {
    const { container } = render(<OrderConfirmation order={null} onBackToCatalog={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('muestra el número de pedido y permite volver al catálogo', async () => {
    const onBackToCatalog = vi.fn()
    render(<OrderConfirmation order={order} onBackToCatalog={onBackToCatalog} />)
    expect(screen.getByText('1001')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /volver al catálogo/i }))
    expect(onBackToCatalog).toHaveBeenCalled()
  })
})
