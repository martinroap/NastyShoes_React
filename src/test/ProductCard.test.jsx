import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '../compose/ProductCard.jsx'

const product = { id: 1, name: 'Zapatilla 1', brand: 'Nike', price: 59990, stock: 5, image: '' }

describe('ProductCard', () => {
  it('muestra la información del producto', () => {
    render(<ProductCard product={product} onViewDetail={() => {}} />)
    expect(screen.getByText('Zapatilla 1')).toBeInTheDocument()
    expect(screen.getByText('Nike')).toBeInTheDocument()
    expect(screen.getByText('5 disponibles')).toBeInTheDocument()
  })

  it('llama a onViewDetail al hacer clic en el botón', async () => {
    const onViewDetail = vi.fn()
    render(<ProductCard product={product} onViewDetail={onViewDetail} />)
    await userEvent.click(screen.getByRole('button', { name: /ver detalle/i }))
    expect(onViewDetail).toHaveBeenCalledWith(product)
  })

  it('deshabilita el botón cuando no hay stock', () => {
    render(<ProductCard product={{ ...product, stock: 0 }} onViewDetail={() => {}} />)
    expect(screen.getByRole('button', { name: /ver detalle/i })).toBeDisabled()
    expect(screen.getByText('Agotado')).toBeInTheDocument()
  })
})
