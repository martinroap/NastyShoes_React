export const categories = ['Urbano', 'Running', 'Basketball', 'Skate', 'Casual']

export const allSizes = [38, 39, 40, 41, 42, 43, 44]

export const products = [
  { id: 1, name: 'Zapatilla 1', brand: 'Nike', category: 'Urbano', price: 59990, stock: 12, sizes: [39, 40, 41, 42], description: 'Zapatilla urbana liviana, ideal para uso diario.', image: '' },
  { id: 2, name: 'Zapatilla 2', brand: 'Adidas', category: 'Running', price: 64990, stock: 8, sizes: [38, 39, 40, 41, 42, 43], description: 'Amortiguación suave pensada para trote y running.', image: '' },
  { id: 3, name: 'Zapatilla 3', brand: 'Puma', category: 'Basketball', price: 72990, stock: 0, sizes: [41, 42, 43, 44], description: 'Soporte en el tobillo y suela de alta tracción.', image: '' },
  { id: 4, name: 'Zapatilla 4', brand: 'Vans', category: 'Skate', price: 49990, stock: 15, sizes: [38, 39, 40, 41], description: 'Diseño clásico de skate, suela plana resistente.', image: '' },
  { id: 5, name: 'Zapatilla 5', brand: 'New Balance', category: 'Casual', price: 54990, stock: 6, sizes: [39, 40, 41, 42, 43], description: 'Estilo casual cómodo para uso todo el día.', image: '' },
  { id: 6, name: 'Zapatilla 6', brand: 'Nike', category: 'Running', price: 68990, stock: 10, sizes: [38, 39, 40, 41, 42], description: 'Malla transpirable y entresuela flexible.', image: '' },
  { id: 7, name: 'Zapatilla 7', brand: 'Adidas', category: 'Urbano', price: 57990, stock: 0, sizes: [40, 41, 42, 43], description: 'Línea urbana con terminaciones en cuero sintético.', image: '' },
  { id: 8, name: 'Zapatilla 8', brand: 'Puma', category: 'Casual', price: 45990, stock: 20, sizes: [38, 39, 40, 41, 42, 43, 44], description: 'Opción económica y versátil para el día a día.', image: '' },
]

export function formatCLP(value) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value)
}

export function isAvailable(product) {
  return product.stock > 0
}
