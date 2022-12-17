import colorizeText from "./utils/colorizeText"
import app from "./app"
// 
const PORT = `${process.env.PORT}`
app.listen(PORT, () => {
  console.log(
    "Server corriendo desde en: " +
      colorizeText(
        `${Number.parseInt(PORT) === 4002 ? "http://localhost:" + PORT : PORT}`,
        "yellow"
      )
  )
  return "0.0.0.0"
})
