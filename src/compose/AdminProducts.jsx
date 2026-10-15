import { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { formatCLP } from '../data/products.js'

const emptyForm = { id: null, name: '', brand: '', category: '', price: '', stock: '', sizes: '', description: '', image: '' }

export default function AdminProducts({ products, onSave, onDelete }) {
  const [form, setForm] = useState(emptyForm)

  function startEdit(product) {
    setForm({ ...product, sizes: product.sizes.join(', ') })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const sizes = form.sizes.split(',').map((item) => Number(item.trim())).filter((item) => !Number.isNaN(item))
    onSave({
      id: form.id,
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category.trim(),
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      sizes,
      description: form.description.trim(),
      image: form.image.trim(),
    })
    setForm(emptyForm)
  }

  return (
    <div className="content-section">
      <h2 className="section-title mb-3">Gestión de productos</h2>
      <Form onSubmit={handleSubmit} className="form-card admin-form mb-4">
        <h3 className="mb-3">{form.id ? 'Editar zapatilla' : 'Nueva zapatilla'}</h3>
        <div className="admin-form-grid">
          <Form.Group controlId="admin-name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </Form.Group>
          <Form.Group controlId="admin-brand">
            <Form.Label>Marca</Form.Label>
            <Form.Control value={form.brand} onChange={(event) => setForm({ ...form, brand: event.target.value })} required />
          </Form.Group>
          <Form.Group controlId="admin-category">
            <Form.Label>Categoría</Form.Label>
            <Form.Control value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required />
          </Form.Group>
          <Form.Group controlId="admin-price">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} required />
          </Form.Group>
          <Form.Group controlId="admin-stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" min="0" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} required />
          </Form.Group>
          <Form.Group controlId="admin-sizes">
            <Form.Label>Tallas (separadas por coma)</Form.Label>
            <Form.Control value={form.sizes} onChange={(event) => setForm({ ...form, sizes: event.target.value })} placeholder="39, 40, 41" required />
          </Form.Group>
          <Form.Group controlId="admin-image">
            <Form.Label>URL de imagen (opcional)</Form.Label>
            <Form.Control value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} />
          </Form.Group>
        </div>
        <Form.Group className="mt-3 mb-3" controlId="admin-description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={2} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button type="submit" className="submit-button">{form.id ? 'Guardar cambios' : 'Agregar zapatilla'}</Button>
          {form.id && <Button variant="outline-secondary" onClick={() => setForm(emptyForm)}>Cancelar</Button>}
        </div>
      </Form>

      <Table responsive className="align-middle">
        <thead>
          <tr><th>Nombre</th><th>Marca</th><th>Precio</th><th>Stock</th><th></th></tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{formatCLP(product.price)}</td>
              <td>{product.stock}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={() => startEdit(product)}>Editar</Button>
                <Button size="sm" variant="outline-danger" onClick={() => onDelete(product.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
