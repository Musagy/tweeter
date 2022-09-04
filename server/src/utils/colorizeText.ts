type ConsoleColor =
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | number

const COLORS_CODE = {
  red: 1,
  green: 2,
  yellow: 3,
  blue: 4,
  magenta: 5,
  cyan: 6,
}
export const colorizeText = (text: string | unknown, color: ConsoleColor) => {
  if (typeof color === "string")
    return `\x1b[3${COLORS_CODE[color]}m${text}\x1b[0m`
  return `\x1b[3${color}m${text}\x1b[0m`
}

export const provide = (c: number, minus: number) => (c - minus) / 5 + 1
export const colorFont = (s: string) => {
  const charCode = s[0].charCodeAt(0)
  const result = charCode <= 90 ? provide(charCode, 65) : provide(charCode, 97)
  if (result > 0 && result < 7) return result
  return 0
}

export default colorizeText
