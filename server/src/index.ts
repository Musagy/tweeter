import colorizeText from "./utils/colorizeText"
import app from "./app"
// 
const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log(
    "Server corriendo desde en: " +
      colorizeText(
        `${PORT === 4001 ? "http://localhost:" + PORT : PORT}`,
        "yellow"
      )
  )
  return "0.0.0.0"
})
