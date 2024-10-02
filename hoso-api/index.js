import Express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './router/router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = Express()
app.use(Router())
dotenv.config()
app.get("/", (request, response) => {
    return response.send('hello world')
})
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    method: 'GET,POST,PUT,DELETE',
    credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(Express.json())
app.use('', router)
//Kết nối CSDL
mongoose.connect(process.env.MONGO_URL).then(() => console.log(`Connected MongoDB`))
app.listen(process.env.PORT, () => {
    console.log(`Server đang chạy ở trang: http://localhost:${process.env.PORT}`);
})
