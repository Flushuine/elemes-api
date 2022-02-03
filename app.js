import Express from 'express'
const app = Express()
import conn from './config/database.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//import routes
import AuthRoutes from './routes/auth-routes.js'
import AdminRoutes from './routes/admin-routes.js'
import CourseRoutes from './routes/course-routes.js'
import CourseCategoryRoutes from './routes/course-category-routes.js'
import CourseImageRoutes from './routes/course-image-routes.js'

//parse JSON
app.use(Express.json())

//Enable cors
app.use(cors())

//cookie parser
app.use(cookieParser())

//Auth routes
app.use('/api/auth/', AuthRoutes)

//Admin routes
app.use('/api/admin/', AdminRoutes)

//Course routes
app.use('/api/course/', CourseRoutes)

//Course image routes
app.use('/api/image/', CourseImageRoutes)

//Course Category routes
app.use('/api/course-category/', CourseCategoryRoutes)

//Handling 404
app.use(function(req, res, next) {
    return res.status(404).send("What?? Can't find your request.")
})

//Testing database connection
try {
    await conn.authenticate()
    console.log('Connection has been established successfuly.')
} catch (error) {
    console.log('Unable to connect to the database:', error)
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
