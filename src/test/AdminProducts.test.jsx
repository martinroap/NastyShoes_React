import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminProducts from '../compose/AdminProducts.jsx'

const products = [{ id: 1, name: 'Zapatilla 1', brand: 'Nike', category: 'Urbano', price: 1000, stock: 5, sizes: [40, 41], description: 'Cómoda', image: '' }]

describe('AdminProducts', () => {
  it('lista los productos existentes', () => {
    render(<AdminProducts products={products} onSave={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Zapatilla 1')).toBeInTheDocument()
  })

  it('permite eliminar un producto', async () => {
    const onDelete = vi.fn()
    render(<AdminProducts products={products} onSave={() => {}} onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button', { name: /eliminar/i }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('crea un producto nuevo con los datos del formulario', async () => {
    const onSave = vi.fn()
    render(<AdminProducts products={[]} onSave={onSave} onDelete={() => {}} />)
    await userEvent.type(screen.getByLabelText(/^nombre$/i), 'Zapatilla 2')
    await userEvent.type(screen.getByLabelText(/^marca$/i), 'Adidas')
    await userEvent.type(screen.getByLabelText(/^categoría$/i), 'Running')
    await userEvent.type(screen.getByLabelText(/^precio$/i), '2000')
    await userEvent.type(screen.getByLabelText(/^stock$/i), '3')
    await userEvent.type(screen.getByLabelText(/tallas/i), '40, 41')
    await userEvent.click(screen.getByRole('button', { name: /agregar zapatilla/i }))
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ name: 'Zapatilla 2', brand: 'Adidas', price: 2000, stock: 3, sizes: [40, 41] }))
  })

  it('carga los datos del producto al editar', async () => {
    render(<AdminProducts products={products} onSave={() => {}} onDelete={() => {}} />)
    await userEvent.click(screen.getByRole('button', { name: /editar/i }))
    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument()
  })
})
