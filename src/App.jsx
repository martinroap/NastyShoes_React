import { useMemo, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import Header from './compose/Header.jsx'
import ProductFilters from './compose/ProductFilters.jsx'
import ProductCard from './compose/ProductCard.jsx'
import ProductDetailModal from './compose/ProductDetailModal.jsx'
import CartView from './compose/CartView.jsx'
import CheckoutForm from './compose/CheckoutForm.jsx'
import OrderConfirmation from './compose/OrderConfirmation.jsx'
import AccountPanel from './compose/AccountPanel.jsx'
import AdminProducts from './compose/AdminProducts.jsx'
import AdminOrders from './compose/AdminOrders.jsx'
import { allSizes, categories, products as initialProducts } from './data/products.js'
import { users as initialUsers, createUser, findUser } from './data/users.js'
import { addToCart, getCartDetails, getCartTotal, removeFromCart, updateQuantity } from './data/cart.js'
import { createOrder, nextOrderId, updateOrderStatus } from './data/orders.js'

const initialFilters = { query: '', brand: 'Todas', size: 'Todas', category: 'Todas', maxPrice: '', onlyAvailable: false }

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [users, setUsers] = useState(initialUsers)
  const [currentUser, setCurrentUser] = useState(null)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [view, setView] = useState('catalogo')
  const [filters, setFilters] = useState(initialFilters)
  const [detailProduct, setDetailProduct] = useState(null)
  const [lastOrder, setLastOrder] = useState(null)

  const brands = useMemo(() => [...new Set(products.map((product) => product.brand))], [products])

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.brand}`.toLocaleLowerCase('es').includes(filters.query.trim().toLocaleLowerCase('es'))
    const matchesBrand = filters.brand === 'Todas' || product.brand === filters.brand
    const matchesSize = filters.size === 'Todas' || product.sizes.includes(Number(filters.size))
    const matchesCategory = filters.category === 'Todas' || product.category === filters.category
    const matchesPrice = !filters.maxPrice || product.price <= Number(filters.maxPrice)
    const matchesAvailability = !filters.onlyAvailable || product.stock > 0
    return matchesQuery && matchesBrand && matchesSize && matchesCategory && matchesPrice && matchesAvailability
  }), [products, filters])

  const cartDetails = useMemo(() => getCartDetails(cart, products), [cart, products])
  const cartTotal = useMemo(() => getCartTotal(cart, products), [cart, products])
  const myOrders = useMemo(() => orders.filter((order) => currentUser && order.userEmail === currentUser.email), [orders, currentUser])

  function navigate(nextView) {
    setView(nextView)
  }

  function handleLogin(email, password) {
    const user = findUser(users, email, password)
    if (!user) return { ok: false, error: 'Correo o contraseña incorrectos.' }
    setCurrentUser(user)
    setView('catalogo')
    return { ok: true }
  }

  function handleRegister(values) {
    const result = createUser(values, users)
    if (result.error) return { ok: false, error: result.error }
    setUsers((current) => [...current, result.user])
    setCurrentUser(result.user)
    setView('catalogo')
    return { ok: true }
  }

  function handleLogout() {
    setCurrentUser(null)
    setView('catalogo')
  }

  function handleAddToCart(product, size, qty) {
    setCart((current) => addToCart(current, product, size, qty))
  }

  function handleUpdateQty(productId, size, qty) {
    setCart((current) => updateQuantity(current, products, productId, size, qty))
  }

  function handleRemove(productId, size) {
    setCart((current) => removeFromCart(current, productId, size))
  }

  function handleCheckoutStart() {
    setView(currentUser ? 'checkout' : 'cuenta')
  }

  function handleConfirmOrder(shipping) {
    const items = cartDetails.map((item) => ({ productId: item.productId, name: item.product.name, size: item.size, qty: item.qty, price: item.product.price }))
    const order = createOrder({ id: nextOrderId(orders), user: currentUser, items, shipping, total: cartTotal })

    setProducts((current) => current.map((product) => {
      const soldQty = items.filter((item) => item.productId === product.id).reduce((sum, item) => sum + item.qty, 0)
      return soldQty > 0 ? { ...product, stock: Math.max(0, product.stock - soldQty) } : product
    }))
    setOrders((current) => [...current, order])
    setCart([])
    setLastOrder(order)
    setView('confirmacion')
  }

  function handleSaveProduct(productData) {
    setProducts((current) => {
      if (productData.id) {
        return current.map((product) => product.id === productData.id ? { ...product, ...productData } : product)
      }
      const nextId = current.reduce((max, product) => Math.max(max, product.id), 0) + 1
      return [...current, { ...productData, id: nextId, image: productData.image || '' }]
    })
  }

  function handleDeleteProduct(id) {
    setProducts((current) => current.filter((product) => product.id !== id))
    setCart((current) => current.filter((item) => item.productId !== id))
  }

  function handleUpdateOrderStatus(orderId, status) {
    setOrders((current) => updateOrderStatus(current, orderId, status))
  }

  return (
    <>
      <Header view={view} onNavigate={navigate} cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} currentUser={currentUser} onLogout={handleLogout} />

      <main>
        {view === 'catalogo' && (
          <section className="hero">
            <Container>
              <span className="hero-kicker">NASTYSHOES</span>
              <h1>Zapatillas para cada paso.</h1>
              <p>Encuentra tu próximo par entre nuestras marcas destacadas.</p>
            </Container>
          </section>
        )}

        <Container className="content-section">
          {view === 'catalogo' && (
            <>
              <ProductFilters filters={filters} onChange={setFilters} brands={brands} sizes={allSizes} categories={categories} />
              <p className="results-label mt-4 mb-3">{filteredProducts.length} {filteredProducts.length === 1 ? 'zapatilla encontrada' : 'zapatillas encontradas'}</p>
              {filteredProducts.length === 0 ? (
                <Alert variant="light" className="empty-results">No encontramos zapatillas con esos filtros.</Alert>
              ) : (
                <Row className="g-3">
                  {filteredProducts.map((product) => (
                    <Col key={product.id} sm={6} md={4} lg={3}>
                      <ProductCard product={product} onViewDetail={setDetailProduct} />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}

          {view === 'carrito' && (
            <CartView cartDetails={cartDetails} total={cartTotal} onUpdateQty={handleUpdateQty} onRemove={handleRemove} onCheckout={handleCheckoutStart} />
          )}

          {view === 'checkout' && (
            <CheckoutForm cartDetails={cartDetails} total={cartTotal} onConfirm={handleConfirmOrder} />
          )}

          {view === 'confirmacion' && (
            <OrderConfirmation order={lastOrder} onBackToCatalog={() => navigate('catalogo')} />
          )}

          {view === 'cuenta' && (
            <AccountPanel currentUser={currentUser} onLogin={handleLogin} onRegister={handleRegister} myOrders={myOrders} />
          )}

          {view === 'admin' && currentUser?.role === 'admin' && (
            <>
              <AdminProducts products={products} onSave={handleSaveProduct} onDelete={handleDeleteProduct} />
              <AdminOrders orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
            </>
          )}
        </Container>
      </main>

      <ProductDetailModal product={detailProduct} show={Boolean(detailProduct)} onClose={() => setDetailProduct(null)} onAddToCart={handleAddToCart} />

      <footer className="site-footer">
        <Container className="d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span><strong>NastyShoes.</strong> Tu tienda de zapatillas.</span>
          <span>Tus datos se usan solo para procesar tu compra.</span>
        </Container>
      </footer>
    </>
  )
}
