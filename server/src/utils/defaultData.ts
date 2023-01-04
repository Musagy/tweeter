import request from "supertest"
import app from "../app"

export const API = request(app)

const user = {
  password: "1234",
  usernameOrEmail: "58042@test.io",
}

export async function userTestWithPostCount() {
  let { _body: userRes }: any = await API.post("/auth/signin").send(user)
  const userId = await userRes.user.id
  const userToken = await userRes.token

  const { _body: countRes }: any = await API.post("/post/count/me").set(
    "Authorization",
    `${userRes.token}`
  )
  const countPost = countRes.count
  return { userId, userToken, countPost }
}
export async function userTest() {
  let { _body: userRes }: any = await API.post("/auth/signin").send(user)
  const userId = await userRes.user.id
  const userToken = await userRes.token

  return { userId, userToken }
}
