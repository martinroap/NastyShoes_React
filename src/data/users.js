export function hashPassword(password) {
  return btoa(unescape(encodeURIComponent(password))).split('').reverse().join('')
}

export const users = [
  { id: 1, name: 'Administrador', email: 'admin@nastyshoes.cl', phone: '+56 9 0000 0000', password: hashPassword('admin123'), role: 'admin' },
]

export function createUser({ name, email, phone, password }, existingUsers) {
  const normalizedEmail = email.trim().toLowerCase()
  if (existingUsers.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return { error: 'Ese correo ya está registrado.' }
  }
  const nextId = existingUsers.reduce((max, user) => Math.max(max, user.id), 0) + 1
  return {
    user: { id: nextId, name: name.trim(), email: normalizedEmail, phone: phone.trim(), password: hashPassword(password), role: 'cliente' },
  }
}

export function findUser(users, email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  return users.find((user) => user.email.toLowerCase() === normalizedEmail && user.password === hashPassword(password))
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
