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
  // console.log(userRes, userToken, userId)

  const { _body: countRes }: any = await API.post("/post/count/me").set(
    "Authorization",
    `${userRes.token}`
  )
  const countPost = countRes.count
  return { userId, userToken, countPost }
}

describe("Post Routes test", () => {
  test("should create a new post", async () => {
    const { userId, userToken, countPost } = await defaultData()
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
    const { userToken } = await defaultData()
    const res = await API.post("/post/count/me").set(
      "Authorization",
      `${userToken}`
    )
    expect(res.status).toBe(200)
  })

  test("should get my posts", async () => {
    const userId = 126
    const res = await API.post(`/post/userId/${userId}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].content).toContain("Post del usuario de ID 3")
  })

  test("should get a post", async () => {
    const res = await API.post("/post/12")
    expect(res.status).toBe(200)
    expect(res.body.content).toContain("Primer Post")
  })

  test("should edit a post", async () => {
    const { userToken } = await defaultData()
    const postToEdit = 25
    const { _body: post }: any = await API.post(`/post/${postToEdit}`)
    const editNumber = +post.content.split("°").at(-1) + 1
    const content = `post editado N°${editNumber}`
    const res = await API.put(`/post/${postToEdit}`)
      .send({ content })
      .set("Authorization", `${userToken}`)
    expect(res.status).toBe(200)
    expect(res.body.content).toContain(content)
  })
  // afterAll(() => {
  //   test("should delete a post", async () => {
  //     const { userToken } = await defaultData()
  //     const { _body: post }: any = await API.post(`/post/${postToEdit}`)
  //   })
  // })
})
