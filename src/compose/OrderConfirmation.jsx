import { Button } from 'react-bootstrap'
import { formatCLP } from '../data/products.js'

export default function OrderConfirmation({ order, onBackToCatalog }) {
  if (!order) return null

  return (
    <div className="content-section">
      <div className="form-card confirmation-card">
        <h2 className="section-title">¡Compra realizada!</h2>
        <p>Pedido N° <strong>{order.id}</strong> — Estado: <strong>{order.status}</strong></p>
        <ul className="summary-list">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.size}`}>
              {item.name} (talla {item.size}) × {item.qty} — {formatCLP(item.price * item.qty)}
            </li>
          ))}
        </ul>
        <p className="checkout-total">Total pagado: {formatCLP(order.total)}</p>
        <Button variant="primary" onClick={onBackToCatalog}>Volver al catálogo</Button>
      </div>
    </div>
  )
}
