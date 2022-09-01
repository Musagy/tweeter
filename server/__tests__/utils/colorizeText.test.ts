import colorizeText from "../../src/utils/colorizeText"

describe("Util colorizeText tests", () => {
  const textExample = "Hola chupapis"

  test("should color a text to blue", () => {
    const textInBlue = colorizeText(textExample, "blue")
    expect(textInBlue).toEqual("\x1b[34mHola chupapis\x1b[0m")
  })

  test("should color a text to red", () => {
    const textInRed = colorizeText(textExample, "red")
    expect(textInRed).toEqual("\x1b[31mHola chupapis\x1b[0m")
  })
})
