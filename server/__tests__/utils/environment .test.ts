import env from "../../src/utils/environment"

describe("Util dotenv tests", () => {
  test('should return this env a "hola chupapis"', () => {
    expect(env.ENV_TEST).toBe("hola chupapis")
  })
})