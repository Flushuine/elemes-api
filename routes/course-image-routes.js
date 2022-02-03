import Express from 'express'
import { update } from '../controllers/CourseImageController.js'
import { verifyAdmin } from '../middleware/authMiddleware.js'

const route = Express.Router()

route.put('/update', verifyAdmin, update)

export default route