import { Users } from "./Model"

export interface LoginData {
  usernameOrEmail: string
  password: string
}

export interface LoginResponse {
  token: string
  user: Users | null
}
