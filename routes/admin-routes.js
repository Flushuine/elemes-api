import Express from 'express'
import { delUser, getTotalCourse, getTotalUser, getTotalFreeCourse } from '../controllers/AdminController.js'
import { verifyAdmin } from '../middleware/authMiddleware.js'

const route = Express.Router()

route.delete('/delete-user', verifyAdmin, delUser)
route.get('/total-user', verifyAdmin, getTotalUser)
route.get('/total-course', verifyAdmin, getTotalCourse)
route.get('/total-free', verifyAdmin, getTotalFreeCourse)

export default route