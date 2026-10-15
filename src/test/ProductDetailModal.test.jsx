import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductDetailModal from '../compose/ProductDetailModal.jsx'

const product = { id: 1, name: 'Zapatilla 1', brand: 'Nike', price: 59990, stock: 5, sizes: [40, 41], description: 'Cómoda', image: '' }

describe('ProductDetailModal', () => {
  it('no renderiza nada si no hay producto', () => {
    const { container } = render(<ProductDetailModal product={null} show={false} onClose={() => {}} onAddToCart={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('pide seleccionar una talla antes de agregar al carrito', async () => {
    render(<ProductDetailModal product={product} show onClose={() => {}} onAddToCart={() => {}} />)
    await userEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }))
    expect(screen.getByText(/selecciona una talla/i)).toBeInTheDocument()
  })

  it('agrega al carrito cuando hay talla seleccionada', async () => {
    const onAddToCart = vi.fn()
    render(<ProductDetailModal product={product} show onClose={() => {}} onAddToCart={onAddToCart} />)
    await userEvent.selectOptions(screen.getByLabelText(/talla/i), '41')
    await userEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }))
    expect(onAddToCart).toHaveBeenCalledWith(product, 41, 1)
    expect(screen.getByText(/agregado al carrito/i)).toBeInTheDocument()
  })
})
