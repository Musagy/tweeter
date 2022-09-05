import request from "supertest"
import app from "../../src/app"

describe("Auth Routes test", () => {
  test("should create a new user", async () => {
    const numberRandom = Math.round(Math.random() * 99999) + ""
    const num = "00000" + numberRandom
    const num5Digits = num.slice(num.length - 5, num.length)

    const emailRandom = num5Digits + "@test.io"
    const userNameRandom = "test_" + num5Digits

    const req = {
      name: "testUser",
      password: "1234",
      email: emailRandom,
      username: userNameRandom,
    }

    const res = await request(app).post("/auth/signup").send(req)

    expect(res.status).toEqual(200)
    expect(res.headers["content-type"]).toContain("application/json")
    expect(res.body.message).toBe("Cuenta creada")
  })

  test("should login and return a token", async () => {
    const req = {
      password: "1234",
      usernameOrEmail: "9877@test.io",
    }

    const res = await request(app).post("/auth/signin").send(req)

    expect(res.status).toEqual(200)
    expect(res.headers["content-type"]).toContain("application/json")
    expect(res.body.token).toContain("Bearer")
  })
})
