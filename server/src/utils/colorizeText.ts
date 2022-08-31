type ConsoleColor = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan"

const COLORS_CODE = {
  red: 1,
  green: 2,
  yellow: 3,
  blue: 4,
  magenta: 5,
  cyan: 6,
}
const colorizeText = (text: string | unknown, color:ConsoleColor) => {
  let colorCode = color && COLORS_CODE[color]
  return `\x1b[3${colorCode}m${text}\x1b[0m`;
}

export default colorizeText