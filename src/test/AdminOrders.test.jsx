import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminOrders from '../compose/AdminOrders.jsx'

describe('AdminOrders', () => {
  it('muestra un mensaje cuando no hay pedidos', () => {
    render(<AdminOrders orders={[]} onUpdateStatus={() => {}} />)
    expect(screen.getByText(/no hay pedidos registrados/i)).toBeInTheDocument()
  })

  it('permite cambiar el estado de un pedido', async () => {
    const onUpdateStatus = vi.fn()
    const orders = [{ id: 1001, userEmail: 'ana@correo.com', total: 1000, status: 'pagado' }]
    render(<AdminOrders orders={orders} onUpdateStatus={onUpdateStatus} />)
    await userEvent.selectOptions(screen.getByLabelText(/estado del pedido 1001/i), 'enviado')
    expect(onUpdateStatus).toHaveBeenCalledWith(1001, 'enviado')
  })
})
