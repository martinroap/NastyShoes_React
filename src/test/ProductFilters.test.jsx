import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductFilters from '../compose/ProductFilters.jsx'

const filters = { query: '', brand: 'Todas', size: 'Todas', category: 'Todas', maxPrice: '', onlyAvailable: false }

describe('ProductFilters', () => {
  it('actualiza la búsqueda por texto', async () => {
    const onChange = vi.fn()
    render(<ProductFilters filters={filters} onChange={onChange} brands={['Nike']} sizes={[40]} categories={['Urbano']} />)
    await userEvent.type(screen.getByLabelText(/buscar zapatillas/i), 'a')
    expect(onChange).toHaveBeenCalledWith({ ...filters, query: 'a' })
  })

  it('restablece los filtros al limpiar', async () => {
    const onChange = vi.fn()
    render(<ProductFilters filters={{ ...filters, query: 'algo' }} onChange={onChange} brands={['Nike']} sizes={[40]} categories={['Urbano']} />)
    await userEvent.click(screen.getByRole('button', { name: /limpiar filtros/i }))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ query: '', brand: 'Todas' }))
  })

  it('permite marcar solo disponibles', async () => {
    const onChange = vi.fn()
    render(<ProductFilters filters={filters} onChange={onChange} brands={['Nike']} sizes={[40]} categories={['Urbano']} />)
    await userEvent.click(screen.getByLabelText(/solo disponibles/i))
    expect(onChange).toHaveBeenCalledWith({ ...filters, onlyAvailable: true })
  })
})
