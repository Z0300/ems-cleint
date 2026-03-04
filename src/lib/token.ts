import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp?: number
  [key: string]: any
}

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true

  try {
    const decodedToken: DecodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000

    if (!decodedToken.exp) return true

    return decodedToken.exp < currentTime
  } catch (error) {
    console.error('Error decoding token:', error)
    return true
  }
}
