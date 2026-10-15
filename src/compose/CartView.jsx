import { Alert, Button, Table } from 'react-bootstrap'
import { formatCLP } from '../data/products.js'

export default function CartView({ cartDetails, total, onUpdateQty, onRemove, onCheckout }) {
  if (cartDetails.length === 0) {
    return (
      <div className="content-section">
        <Alert variant="light" className="empty-results">Tu carrito está vacío. Explora el catálogo para agregar zapatillas.</Alert>
      </div>
    )
  }

  return (
    <div className="content-section">
      <h2 className="section-title mb-3">Tu carrito</h2>
      <Table responsive className="cart-table align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Talla</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartDetails.map((item) => (
            <tr key={`${item.productId}-${item.size}`}>
              <td>{item.product.name}</td>
              <td>{item.size}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  max={item.product.stock}
                  value={item.qty}
                  aria-label={`Cantidad de ${item.product.name}`}
                  className="qty-input"
                  onChange={(event) => onUpdateQty(item.productId, item.size, Number(event.target.value) || 1)}
                />
              </td>
              <td>{formatCLP(item.subtotal)}</td>
              <td>
                <Button variant="link" className="remove-button" onClick={() => onRemove(item.productId, item.size)}>Quitar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center cart-total">
        <strong>Total: {formatCLP(total)}</strong>
        <Button variant="primary" onClick={onCheckout}>Ir a pagar</Button>
      </div>
    </div>
  )
}
