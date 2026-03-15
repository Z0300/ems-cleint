export interface UserLoginPayload {
  email: string
  password: string
}

export interface UserLoginResponse {
  user: User
  token: string
}

interface User {
  id: string
  fullName: string
  email: string
}
