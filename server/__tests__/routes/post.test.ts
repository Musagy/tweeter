import request from "supertest"
import app from "../../src/app"

const API = request(app)

const user = {
  password: "1234",
  usernameOrEmail: "58042@test.io",
}

const defaultData = async () => {
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
describe("Post Routes test", () => {
  test("should create a new post", async () => {
    const { userId, userToken, countPost} = await defaultData()
    const res = await API.post("/post/create")
    .send({
        content: `Post para Tests N°${countPost + 1}`,
        userId,
      })
      .set("Accept", "application/json")
      .set("Authorization", `${userToken}`)
    expect(res.status).toBe(200)
    expect(res.body.message).toBe("Post creado")
  })
  
  test("should return post's count", async () => {
    const { userToken} = await defaultData()
    const res = await API.post("/post/count/me").set(
      "Authorization",
      `${userToken}`
    )
    expect(res.status).toBe(200)
  })
})