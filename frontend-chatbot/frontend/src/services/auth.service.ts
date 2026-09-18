export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export async function login(data: LoginRequest) {
  // Kết nối API Backend sau
}

export async function register(data: RegisterRequest) {
  // Kết nối API Backend sau
}

export async function forgotPassword(email: string) {
  // Kết nối API Backend sau
}