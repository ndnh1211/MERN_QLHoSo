import express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './router/router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from "path"

const app = express()
app.use(Router())
dotenv.config()

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    method: 'GET,POST,PUT,DELETE',
    credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use('', router)

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/hoso-ui/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "hoso-ui", "build", "index.html"))
    });
}

//Kết nối CSDL
mongoose.connect(process.env.MONGO_URL).then(() => console.log(`Connected MongoDB`))
app.listen(process.env.PORT, () => {
    console.log(`Server đang chạy ở trang: http://localhost:${process.env.PORT}`);
})
