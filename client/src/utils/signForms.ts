export type Input = {
  icon: string
  placeholder: string
  state: string
  type?: string
}

export const signIn: Input[] = [
  {
    icon: "person",
    placeholder: "Username o email",
    state: "usernameOrEmail",
  },
  {
    icon: "lock",
    placeholder: "Contraseña",
    state: "password",
    type: "password",
  },
]

export const signUp: Input[] = [
  {
    icon: "person",
    placeholder: "Nombre",
    state: "name",
  },
  {
    placeholder: "Nomber de usuario",
    icon: "account_circle",
    state: "username",
  },
  {
    placeholder: "Email",
    icon: "mail",
    state: "email",
    type: "email"
  },
  {
    placeholder: "Contraseña",
    icon: "lock",
    state: "pasword",
    type: "password",
  },
  {
    placeholder: "Confirmar contraseña",
    icon: "key",
    state: "verifyPassword",
    type: "password",
  },
]
