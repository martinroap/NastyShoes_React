import { useState } from 'react'
import { Alert, Button, Form, Table } from 'react-bootstrap'
import { isValidEmail } from '../data/users.js'
import { formatCLP } from '../data/products.js'

const initialLogin = { email: '', password: '' }
const initialRegister = { name: '', email: '', phone: '', password: '' }

export default function AccountPanel({ currentUser, onLogin, onRegister, myOrders }) {
  const [mode, setMode] = useState('login')
  const [loginValues, setLoginValues] = useState(initialLogin)
  const [registerValues, setRegisterValues] = useState(initialRegister)
  const [error, setError] = useState('')

  if (currentUser) {
    return (
      <div className="content-section">
        <h2 className="section-title mb-3">Mi cuenta</h2>
        <p>{currentUser.name} — {currentUser.email}</p>
        <h3 className="mt-4 mb-3">Mis pedidos</h3>
        {myOrders.length === 0 ? (
          <Alert variant="light" className="empty-results">Aún no tienes pedidos.</Alert>
        ) : (
          <Table responsive className="align-middle">
            <thead><tr><th>Pedido</th><th>Total</th><th>Estado</th></tr></thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order.id}>
                  <td>N° {order.id}</td>
                  <td>{formatCLP(order.total)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    )
  }

  function handleLogin(event) {
    event.preventDefault()
    setError('')
    const result = onLogin(loginValues.email, loginValues.password)
    if (!result.ok) setError(result.error)
  }

  function handleRegister(event) {
    event.preventDefault()
    setError('')
    if (registerValues.name.trim().length < 2) return setError('Ingresa tu nombre completo.')
    if (!isValidEmail(registerValues.email)) return setError('Ingresa un correo válido.')
    if (registerValues.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')

    const result = onRegister(registerValues)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setRegisterValues(initialRegister)
  }

  return (
    <div className="content-section">
      <div className="form-card account-card">
        <div className="d-flex gap-2 mb-4">
          <Button variant={mode === 'login' ? 'primary' : 'outline-secondary'} onClick={() => { setMode('login'); setError('') }}>Iniciar sesión</Button>
          <Button variant={mode === 'register' ? 'primary' : 'outline-secondary'} onClick={() => { setMode('register'); setError('') }}>Registrarme</Button>
        </div>
        {error && <Alert variant="danger" role="alert">{error}</Alert>}

        {mode === 'login' ? (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="login-email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" value={loginValues.email} onChange={(event) => setLoginValues({ ...loginValues, email: event.target.value })} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="login-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={loginValues.password} onChange={(event) => setLoginValues({ ...loginValues, password: event.target.value })} />
            </Form.Group>
            <Button type="submit" className="w-100 submit-button">Ingresar</Button>
          </Form>
        ) : (
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="register-name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={registerValues.name} onChange={(event) => setRegisterValues({ ...registerValues, name: event.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="register-email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" value={registerValues.email} onChange={(event) => setRegisterValues({ ...registerValues, email: event.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="register-phone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control value={registerValues.phone} onChange={(event) => setRegisterValues({ ...registerValues, phone: event.target.value })} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="register-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={registerValues.password} onChange={(event) => setRegisterValues({ ...registerValues, password: event.target.value })} />
            </Form.Group>
            <Button type="submit" className="w-100 submit-button">Crear cuenta</Button>
          </Form>
        )}
      </div>
    </div>
  )
}
