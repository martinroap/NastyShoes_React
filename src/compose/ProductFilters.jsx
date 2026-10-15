import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'

export default function ProductFilters({ filters, onChange, brands, sizes, categories }) {
  function set(field, value) {
    onChange({ ...filters, [field]: value })
  }

  function clearFilters() {
    onChange({ query: '', brand: 'Todas', size: 'Todas', category: 'Todas', maxPrice: '', onlyAvailable: false })
  }

  return (
    <div className="filters-panel">
      <p className="eyebrow mb-1">ENCUENTRA TU PAR</p>
      <h2 className="section-title mb-3">Explora el catálogo</h2>
      <Row className="g-2 align-items-end">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text aria-hidden="true">⌕</InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Buscar zapatilla..."
              aria-label="Buscar zapatillas"
              value={filters.query}
              onChange={(event) => set('query', event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={2}>
          <Form.Select aria-label="Filtrar por marca" value={filters.brand} onChange={(event) => set('brand', event.target.value)}>
            <option value="Todas">Todas las marcas</option>
            {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select aria-label="Filtrar por talla" value={filters.size} onChange={(event) => set('size', event.target.value)}>
            <option value="Todas">Todas las tallas</option>
            {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select aria-label="Filtrar por categoría" value={filters.category} onChange={(event) => set('category', event.target.value)}>
            <option value="Todas">Todas las categorías</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            min="0"
            placeholder="Precio máx."
            aria-label="Precio máximo"
            value={filters.maxPrice}
            onChange={(event) => set('maxPrice', event.target.value)}
          />
        </Col>
      </Row>
      <div className="d-flex align-items-center justify-content-between mt-3">
        <Form.Check
          type="checkbox"
          id="only-available"
          label="Solo disponibles"
          checked={filters.onlyAvailable}
          onChange={(event) => set('onlyAvailable', event.target.checked)}
        />
        <Button variant="link" className="clear-filters" onClick={clearFilters}>Limpiar filtros</Button>
      </div>
    </div>
  )
}
