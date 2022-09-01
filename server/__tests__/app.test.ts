import request from "supertest"
import app from "../src/app"

describe("App module test", () => {
  test("Should return server's info", async () => {
    const res = await request(app).get("/")
    expect(res.body).toEqual({
      "name": "server",
      "author": "Musagy",
      "description": "tweeter server",
      "version": "1.0.0",
      "message": "hola chupapis"
    })
  })
})