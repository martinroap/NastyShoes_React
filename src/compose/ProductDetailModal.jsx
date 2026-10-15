import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { formatCLP } from '../data/products.js'

export default function ProductDetailModal({ product, show, onClose, onAddToCart }) {
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [feedback, setFeedback] = useState('')

  if (!product) return null

  function handleClose() {
    setSize('')
    setQty(1)
    setFeedback('')
    onClose()
  }

  function handleAdd() {
    if (!size) {
      setFeedback('Selecciona una talla.')
      return
    }
    onAddToCart(product, Number(size), qty)
    setFeedback('¡Agregado al carrito!')
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-image modal-image" aria-hidden="true">
          {product.image ? <img src={product.image} alt="" /> : <span>👟</span>}
        </div>
        <p className="product-brand mb-1">{product.brand}</p>
        <p className="product-price">{formatCLP(product.price)}</p>
        <p>{product.description}</p>
        {feedback && <Alert variant={feedback.includes('talla') ? 'warning' : 'success'} role="status">{feedback}</Alert>}
        <Form.Group className="mb-3" controlId="detail-size">
          <Form.Label>Talla</Form.Label>
          <Form.Select value={size} onChange={(event) => setSize(event.target.value)}>
            <option value="">Elige tu talla</option>
            {product.sizes.map((item) => <option key={item} value={item}>{item}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="detail-qty">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={product.stock}
            value={qty}
            onChange={(event) => setQty(Math.max(1, Math.min(Number(event.target.value) || 1, product.stock)))}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleAdd}>Agregar al carrito</Button>
      </Modal.Footer>
    </Modal>
  )
}
