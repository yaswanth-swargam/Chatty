import express from 'express'
import protect_route from '../middleware/auth.middleware.js'
import {getUsersForSidebar,getMessages,sendMessage} from '../controllers/message.controller.js'
const router=express.Router()

router.get('/users',protect_route,getUsersForSidebar)

router.get('/:id',protect_route,getMessages)

router.post('/send/:id',protect_route,sendMessage)
export default router;