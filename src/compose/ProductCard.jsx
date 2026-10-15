import { Badge, Button, Card } from 'react-bootstrap'
import { formatCLP, isAvailable } from '../data/products.js'

export default function ProductCard({ product, onViewDetail }) {
  const available = isAvailable(product)

  return (
    <Card className="product-card h-100 border-0">
      <div className="product-image" aria-hidden="true">
        {product.image ? <img src={product.image} alt="" /> : <span>👟</span>}
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between mb-2">
          <span className="product-brand">{product.brand}</span>
          <Badge bg={available ? 'light' : 'secondary'} text={available ? 'dark' : undefined} className="stock-badge">
            {available ? `${product.stock} disponibles` : 'Agotado'}
          </Badge>
        </div>
        <Card.Title as="h3" className="product-title">{product.name}</Card.Title>
        <p className="product-price">{formatCLP(product.price)}</p>
        <Button
          variant="primary"
          size="sm"
          className="mt-auto"
          disabled={!available}
          onClick={() => onViewDetail(product)}
          aria-label={`Ver detalle de ${product.name}`}
        >
          {available ? 'Ver detalle' : 'No disponible'}
        </Button>
      </Card.Body>
    </Card>
  )
}
