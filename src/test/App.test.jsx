import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'

async function login(email, password) {
  await userEvent.click(screen.getByText(/ingresar/i))
  await userEvent.type(screen.getByLabelText(/correo electrónico/i), email)
  await userEvent.type(screen.getByLabelText(/contraseña/i), password)
  const submitButton = screen.getAllByRole('button', { name: /^ingresar$/i }).find((button) => button.type === 'submit')
  await userEvent.click(submitButton)
}

async function addFirstProductToCart() {
  const [firstDetailButton] = screen.getAllByRole('button', { name: /ver detalle/i })
  await userEvent.click(firstDetailButton)
  await userEvent.selectOptions(screen.getByLabelText(/^talla$/i), '39')
  await userEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }))
  await userEvent.click(screen.getByRole('button', { name: /cerrar/i }))
}

describe('App', () => {
  it('muestra el catálogo con zapatillas disponibles', () => {
    render(<App />)
    expect(screen.getByText(/zapatillas para cada paso/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /ver detalle/i }).length).toBeGreaterThan(0)
  })

  it('filtra el catálogo por texto de búsqueda', async () => {
    render(<App />)
    await userEvent.type(screen.getByLabelText(/buscar zapatillas/i), 'zapatilla 1')
    expect(screen.getByText(/1 zapatilla encontrada/i)).toBeInTheDocument()
  })

  it('agrega un producto al carrito y actualiza el contador', async () => {
    render(<App />)
    await addFirstProductToCart()
    const cartLink = screen.getByText(/carrito/i).closest('a')
    expect(cartLink).toHaveTextContent('1')
  })

  it('pide iniciar sesión antes de pagar', async () => {
    render(<App />)
    await addFirstProductToCart()
    await userEvent.click(screen.getByText(/^carrito/i))
    await userEvent.click(screen.getByRole('button', { name: /ir a pagar/i }))
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
  })

  it('permite iniciar sesión como administrador y ver el panel de administración', async () => {
    render(<App />)
    await login('admin@nastyshoes.cl', 'admin123')
    expect(screen.getByText(/hola, administrador/i)).toBeInTheDocument()
    await userEvent.click(screen.getByText(/administración/i))
    expect(screen.getByText(/gestión de productos/i)).toBeInTheDocument()
  })

  it('completa el flujo de compra de punta a punta', async () => {
    render(<App />)
    await addFirstProductToCart()
    await login('admin@nastyshoes.cl', 'admin123')
    await userEvent.click(screen.getByText(/^carrito/i))
    await userEvent.click(screen.getByRole('button', { name: /ir a pagar/i }))

    await userEvent.type(screen.getByLabelText(/dirección/i), 'Av. Siempre Viva 123')
    await userEvent.type(screen.getByLabelText(/comuna/i), 'Santiago')
    await userEvent.type(screen.getByLabelText(/teléfono/i), '+56912345678')
    await userEvent.type(screen.getByLabelText(/número de tarjeta/i), '1234567890123456')
    await userEvent.type(screen.getByLabelText(/vencimiento/i), '08/27')
    await userEvent.type(screen.getByLabelText(/cvv/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /confirmar y pagar/i }))

    expect(screen.getByText(/compra realizada/i)).toBeInTheDocument()
  })
})
