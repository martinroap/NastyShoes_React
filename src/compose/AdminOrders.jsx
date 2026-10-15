import { Alert, Form, Table } from 'react-bootstrap'
import { ORDER_STATUSES } from '../data/orders.js'
import { formatCLP } from '../data/products.js'

export default function AdminOrders({ orders, onUpdateStatus }) {
  if (orders.length === 0) {
    return (
      <div className="content-section">
        <h2 className="section-title mb-3">Gestión de pedidos</h2>
        <Alert variant="light" className="empty-results">Todavía no hay pedidos registrados.</Alert>
      </div>
    )
  }

  return (
    <div className="content-section">
      <h2 className="section-title mb-3">Gestión de pedidos</h2>
      <Table responsive className="align-middle">
        <thead>
          <tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>N° {order.id}</td>
              <td>{order.userEmail}</td>
              <td>{formatCLP(order.total)}</td>
              <td>
                <Form.Select
                  aria-label={`Estado del pedido ${order.id}`}
                  value={order.status}
                  onChange={(event) => onUpdateStatus(order.id, event.target.value)}
                >
                  {ORDER_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
