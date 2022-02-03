import { ModelCourse, ModelCourseCategory, ModelCourseImage } from '../models/assocations.js'
import { validateCourse } from '../utils/joi-validation.js'
import { responseMessage, responseData } from '../utils/response-handler.js'
import uploadFile from '../middleware/courseMiddleware.js'
import { Cloudinary } from '../config/cloudinary.js'

const cloudinary = Cloudinary.v2

const update = async(req, res) => {
    try {
        await uploadFile(req, res)
        const file = req.file

        console.log(file)

        if(typeof file === 'undefined') return res.status(400).json({
            status: res.statusCode,
            message: 'Gambar kosong.',
        })
        
        if(file.mimetype != 'image/png' && file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg') {
            return res.status(400).json({
                status: res.statusCode,
                message: 'Ekstensi file salah.'
            })
        }

        const image = await ModelCourseImage.findOne({
            where: {
                id: req.body.id
            }
        })

        await cloudinary.uploader.destroy(image.courseImage)

        const uploaded = await cloudinary.uploader.upload(file.path, {
            upload_preset: 'elemes'
        })

        const updateImage = await ModelCourseImage.update({ courseImage: uploaded.public_id }, {
            where: {
                id: req.body.id
            }
        })
        
        responseMessage(res, 204, '')
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

export { update }