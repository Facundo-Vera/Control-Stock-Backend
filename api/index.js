import app from "../src/app.js";
import { dbConnect } from "../src/config/db.js";


const PORT = process.env.PORT || 3000

await dbConnect()

app.listen(PORT, () => {
    console.log(`Servidor en linea puerto: ${PORT}`)
})