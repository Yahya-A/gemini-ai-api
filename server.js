import "dotenv/config"
import express from "express"
import chatRouter from "./routes/chat.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/chat', chatRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})