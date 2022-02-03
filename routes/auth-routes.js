import Express from 'express'
import { register, login, logout, getAccessToken } from '../controllers/AuthController.js'
import { verifyRefreshToken } from '../middleware/authMiddleware.js'

const route = Express.Router()

route.post('/register', register)
route.post('/login', login)
route.get('/refresh-token', verifyRefreshToken, getAccessToken)
route.delete('/logout', verifyRefreshToken, logout)

export default route