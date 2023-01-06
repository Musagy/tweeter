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

export default colorizeText
