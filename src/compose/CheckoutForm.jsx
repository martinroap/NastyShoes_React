import { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { formatCLP } from '../data/products.js'
import { validatePayment } from '../data/orders.js'

const initialShipping = { address: '', city: '', phone: '' }
const initialPayment = { cardNumber: '', cardExpiry: '', cardCvv: '' }

export default function CheckoutForm({ cartDetails, total, onConfirm }) {
  const [shipping, setShipping] = useState(initialShipping)
  const [payment, setPayment] = useState(initialPayment)
  const [errors, setErrors] = useState({})
  const [paymentFailed, setPaymentFailed] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const paymentErrors = validatePayment(payment)
    const shippingErrors = {}
    if (shipping.address.trim().length < 5) shippingErrors.address = 'Ingresa una dirección válida.'
    if (shipping.city.trim().length < 2) shippingErrors.city = 'Ingresa tu comuna o ciudad.'
    if (!/^[0-9+\s]{6,}$/.test(shipping.phone.trim())) shippingErrors.phone = 'Ingresa un teléfono válido.'

    const allErrors = { ...shippingErrors, ...paymentErrors }
    setErrors(allErrors)

    if (Object.keys(allErrors).length > 0) {
      setPaymentFailed(Object.keys(paymentErrors).length > 0)
      return
    }
    setPaymentFailed(false)
    onConfirm(shipping)
  }

  return (
    <div className="content-section">
      <h2 className="section-title mb-3">Confirmar compra</h2>
      <Row className="g-4">
        <Col lg={7}>
          <Form noValidate onSubmit={handleSubmit} className="form-card">
            <h3 className="mb-3">Datos de despacho</h3>
            <Form.Group className="mb-3" controlId="checkout-address">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                value={shipping.address}
                onChange={(event) => setShipping({ ...shipping, address: event.target.value })}
                isInvalid={Boolean(errors.address)}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="checkout-city">
              <Form.Label>Comuna / ciudad</Form.Label>
              <Form.Control
                value={shipping.city}
                onChange={(event) => setShipping({ ...shipping, city: event.target.value })}
                isInvalid={Boolean(errors.city)}
              />
              <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="checkout-phone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                value={shipping.phone}
                onChange={(event) => setShipping({ ...shipping, phone: event.target.value })}
                isInvalid={Boolean(errors.phone)}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <h3 className="mb-3">Medio de pago</h3>
            {paymentFailed && <Alert variant="danger" role="alert">El pago no pudo procesarse. Revisa los datos de tu tarjeta.</Alert>}
            <Form.Group className="mb-3" controlId="checkout-card-number">
              <Form.Label>Número de tarjeta</Form.Label>
              <Form.Control
                value={payment.cardNumber}
                placeholder="16 dígitos"
                onChange={(event) => setPayment({ ...payment, cardNumber: event.target.value })}
                isInvalid={Boolean(errors.cardNumber)}
              />
              <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-4" controlId="checkout-card-expiry">
                  <Form.Label>Vencimiento</Form.Label>
                  <Form.Control
                    value={payment.cardExpiry}
                    placeholder="MM/AA"
                    onChange={(event) => setPayment({ ...payment, cardExpiry: event.target.value })}
                    isInvalid={Boolean(errors.cardExpiry)}
                  />
                  <Form.Control.Feedback type="invalid">{errors.cardExpiry}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-4" controlId="checkout-card-cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    value={payment.cardCvv}
                    placeholder="3 dígitos"
                    onChange={(event) => setPayment({ ...payment, cardCvv: event.target.value })}
                    isInvalid={Boolean(errors.cardCvv)}
                  />
                  <Form.Control.Feedback type="invalid">{errors.cardCvv}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="w-100 submit-button">Confirmar y pagar</Button>
          </Form>
        </Col>
        <Col lg={5}>
          <div className="summary-card">
            <h3 className="mb-3">Resumen del pedido</h3>
            <ul className="summary-list">
              {cartDetails.map((item) => (
                <li key={`${item.productId}-${item.size}`}>
                  {item.product.name} (talla {item.size}) × {item.qty} — {formatCLP(item.subtotal)}
                </li>
              ))}
            </ul>
            <p className="checkout-total">Total: {formatCLP(total)}</p>
          </div>
        </Col>
      </Row>
    </div>
  )
}
