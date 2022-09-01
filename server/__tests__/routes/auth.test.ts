import request from "supertest"
import app from "../../src/app"

describe("Users Controllers test", () => {
  test("should create a new user", async () => {
    const numberRandom = Math.round(Math.random() * 9999) + ""
    const num5Digits = numberRandom.padStart(4 - numberRandom.length, "0")

    const emailRandom = num5Digits + "@test.io"
    const userNameRandom = "test" + num5Digits

    const req = {
      body: {
        name: "usuarioTest",
        password: "1234",
        email: emailRandom,
        userName: userNameRandom,
      },
    }

    const res = await request(app)
      .post("/user/signup")
      .send(req)

    expect(res.status).toEqual(200)
    expect(res.body.message).toBe("Cuenta creada")
  })
})
