import express from 'express'
import protect_route from '../middleware/auth.middleware.js'
import {signup,signin,logout,updateProfile,checkAuth} from '../controllers/auth.controller.js'
const router=express.Router()


router.post('/signup',signup)

router.post('/signin',signin)

router.post('/logout',logout)

router.get('/checkAuth',protect_route,checkAuth)

router.put('/update-profile',protect_route,updateProfile)
export default router;