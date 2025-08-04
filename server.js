import "dotenv/config"
import express from "express"
import chatRouter from "./routes/chat.js"
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json())

app.use('/chat', chatRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})