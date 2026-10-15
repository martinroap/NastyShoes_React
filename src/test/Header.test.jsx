import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../compose/Header.jsx'

describe('Header', () => {
  it('muestra el conteo del carrito', () => {
    render(<Header view="catalogo" onNavigate={() => {}} cartCount={3} currentUser={null} onLogout={() => {}} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText(/ingresar/i)).toBeInTheDocument()
  })

  it('muestra el enlace de administración solo para administradores', () => {
    render(<Header view="catalogo" onNavigate={() => {}} cartCount={0} currentUser={{ name: 'Admin', role: 'admin' }} onLogout={() => {}} />)
    expect(screen.getByText(/administración/i)).toBeInTheDocument()
  })

  it('no muestra el enlace de administración para clientes', () => {
    render(<Header view="catalogo" onNavigate={() => {}} cartCount={0} currentUser={{ name: 'Ana', role: 'cliente' }} onLogout={() => {}} />)
    expect(screen.queryByText(/administración/i)).not.toBeInTheDocument()
  })

  it('llama a onLogout al hacer clic en salir', async () => {
    const onLogout = vi.fn()
    render(<Header view="catalogo" onNavigate={() => {}} cartCount={0} currentUser={{ name: 'Ana', role: 'cliente' }} onLogout={onLogout} />)
    await userEvent.click(screen.getByRole('button', { name: /salir/i }))
    expect(onLogout).toHaveBeenCalled()
  })

  it('navega al hacer clic en catálogo', async () => {
    const onNavigate = vi.fn()
    render(<Header view="carrito" onNavigate={onNavigate} cartCount={0} currentUser={null} onLogout={() => {}} />)
    await userEvent.click(screen.getByText(/catálogo/i))
    expect(onNavigate).toHaveBeenCalledWith('catalogo')
  })
})
