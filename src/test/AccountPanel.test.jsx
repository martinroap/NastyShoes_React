import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountPanel from '../compose/AccountPanel.jsx'

describe('AccountPanel', () => {
  it('muestra el formulario de ingreso por defecto', () => {
    render(<AccountPanel currentUser={null} onLogin={() => ({ ok: true })} onRegister={() => ({ ok: true })} myOrders={[]} />)
    expect(screen.getByRole('button', { name: /^ingresar$/i })).toBeInTheDocument()
  })

  it('muestra el error cuando el login falla', async () => {
    const onLogin = vi.fn(() => ({ ok: false, error: 'Correo o contraseña incorrectos.' }))
    render(<AccountPanel currentUser={null} onLogin={onLogin} onRegister={() => ({ ok: true })} myOrders={[]} />)
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'a@a.com')
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'malapass')
    await userEvent.click(screen.getByRole('button', { name: /^ingresar$/i }))
    expect(screen.getByText(/correo o contraseña incorrectos/i)).toBeInTheDocument()
  })

  it('permite cambiar a crear cuenta y valida el nombre', async () => {
    render(<AccountPanel currentUser={null} onLogin={() => ({ ok: true })} onRegister={() => ({ ok: true })} myOrders={[]} />)
    await userEvent.click(screen.getByRole('button', { name: /registrarme/i }))
    await userEvent.click(screen.getByRole('button', { name: /crear cuenta/i }))
    expect(screen.getByText(/nombre completo/i)).toBeInTheDocument()
  })

  it('muestra los pedidos del cliente cuando hay sesión activa', () => {
    const currentUser = { name: 'Ana', email: 'ana@correo.com' }
    const myOrders = [{ id: 1001, total: 1000, status: 'pagado' }]
    render(<AccountPanel currentUser={currentUser} onLogin={() => {}} onRegister={() => {}} myOrders={myOrders} />)
    expect(screen.getByText(/N° 1001/)).toBeInTheDocument()
  })

  it('muestra mensaje cuando el cliente no tiene pedidos', () => {
    const currentUser = { name: 'Ana', email: 'ana@correo.com' }
    render(<AccountPanel currentUser={currentUser} onLogin={() => {}} onRegister={() => {}} myOrders={[]} />)
    expect(screen.getByText(/aún no tienes pedidos/i)).toBeInTheDocument()
  })
})
