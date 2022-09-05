import { routes } from "../../src/router/index"

describe("router test", () => {
  test("should have routes auth", () => {
    expect(routes).toContainEqual("auth.routes.ts")
  })

  test("should have routes user", () => {
    expect(routes).toContainEqual("user.routes.ts")
  })
})
