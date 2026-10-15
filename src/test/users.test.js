import { describe, expect, it } from 'vitest'
import { createUser, findUser, hashPassword, isValidEmail, users } from '../data/users.js'

describe('hashPassword', () => {
  it('no retorna la contraseña en texto plano', () => {
    expect(hashPassword('admin123')).not.toBe('admin123')
  })

  it('es determinístico para la misma entrada', () => {
    expect(hashPassword('clave')).toBe(hashPassword('clave'))
  })
})

describe('isValidEmail', () => {
  it('acepta un correo válido', () => {
    expect(isValidEmail('cliente@correo.com')).toBe(true)
  })

  it('rechaza un correo inválido', () => {
    expect(isValidEmail('no-es-correo')).toBe(false)
  })
})

describe('createUser', () => {
  it('crea un usuario nuevo con rol cliente', () => {
    const result = createUser({ name: 'Ana', email: 'ana@correo.com', phone: '123', password: 'secreta' }, users)
    expect(result.user).toBeDefined()
    expect(result.user.role).toBe('cliente')
    expect(result.user.password).not.toBe('secreta')
  })

  it('rechaza un correo duplicado', () => {
    const result = createUser({ name: 'Admin 2', email: 'admin@nastyshoes.cl', phone: '123', password: 'secreta' }, users)
    expect(result.error).toBeDefined()
  })
})

describe('findUser', () => {
  it('encuentra al usuario con credenciales correctas', () => {
    const user = findUser(users, 'admin@nastyshoes.cl', 'admin123')
    expect(user).toBeDefined()
    expect(user.role).toBe('admin')
  })

  it('no encuentra al usuario con contraseña incorrecta', () => {
    expect(findUser(users, 'admin@nastyshoes.cl', 'incorrecta')).toBeUndefined()
  })
})
