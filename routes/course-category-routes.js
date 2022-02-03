import Express from 'express'
import { store, getPopulars, index } from '../controllers/CourseCategoryController.js'
import { verifyAdmin } from '../middleware/authMiddleware.js'

const route = Express.Router()

route.post('/store', verifyAdmin, store)
route.get('/', index)
route.get('/popular', getPopulars)

export default route