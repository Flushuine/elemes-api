import Express from 'express'
import { store, index, update, destroy, show } from '../controllers/CourseController.js'
import { verifyAdmin, verifyAccessToken } from '../middleware/authMiddleware.js'

const route = Express.Router()

route.get('/', index)
route.get('/show/:id', verifyAccessToken, show)
route.post('/store', verifyAdmin, store)
route.put('/update', verifyAdmin, update)
route.delete('/destroy', verifyAdmin, destroy)

export default route