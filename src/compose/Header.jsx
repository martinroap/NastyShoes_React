import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'

export default function Header({ view, onNavigate, cartCount, currentUser, onLogout }) {
  return (
    <header className="site-header">
      <Navbar expand="md" className="py-3">
        <Container>
          <Navbar.Brand href="#" onClick={() => onNavigate('catalogo')} className="brand">
            Nasty<span>Shoes</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navigation" />
          <Navbar.Collapse id="main-navigation">
            <Nav className="ms-auto align-items-md-center gap-md-3">
              <Nav.Link active={view === 'catalogo'} onClick={() => onNavigate('catalogo')}>Catálogo</Nav.Link>
              <Nav.Link active={view === 'carrito'} onClick={() => onNavigate('carrito')}>
                Carrito <Badge bg="secondary">{cartCount}</Badge>
              </Nav.Link>
              {currentUser?.role === 'admin' && (
                <Nav.Link active={view === 'admin'} onClick={() => onNavigate('admin')}>Administración</Nav.Link>
              )}
              {currentUser ? (
                <>
                  <Nav.Link active={view === 'cuenta'} onClick={() => onNavigate('cuenta')}>Hola, {currentUser.name}</Nav.Link>
                  <Button size="sm" variant="outline-secondary" onClick={onLogout}>Salir</Button>
                </>
              ) : (
                <Nav.Link active={view === 'cuenta'} onClick={() => onNavigate('cuenta')}>Ingresar</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
