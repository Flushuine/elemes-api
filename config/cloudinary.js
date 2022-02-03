import dotenv from 'dotenv'
import Cloudinary from 'cloudinary'

dotenv.config()

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export { Cloudinary }