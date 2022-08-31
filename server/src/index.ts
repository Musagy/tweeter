import app from "./app"
import colorizeText from "./utils/colorizeText";

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
  console.log("Server corriendo desde en: " + colorizeText(`${PORT === 4000 ? "http://localhost:" + PORT : PORT}`, "yellow"));
})