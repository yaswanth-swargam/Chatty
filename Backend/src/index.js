import express from 'express'
import authRoutes from './routes/auth.route.js'
import pool from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import messagesRoutes from './routes/message.route.js'
const app=express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/api/auth',authRoutes)
app.use('/api/messages',messagesRoutes)

app.listen(3000,()=>{
    console.log('server running at 3000')
})