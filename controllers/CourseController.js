import { ModelCourse, ModelCourseCategory, ModelCourseImage } from '../models/assocations.js'
import { validateCourse } from '../utils/joi-validation.js'
import { responseMessage, responseData } from '../utils/response-handler.js'
import uploadFile from '../middleware/courseMiddleware.js'
import { Cloudinary } from '../config/cloudinary.js'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const cloudinary = Cloudinary.v2

//Insert course
const store = async(req, res) => {

    try {
        await uploadFile(req, res)
        const file = req.file

        if(typeof file === 'undefined') return res.status(400).json({
            status: res.statusCode,
            message: 'Gambar kosong.',
        })
        
        if(file.mimetype != 'image/png' && file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg') {
            return res.status(400).json({
                status: res.statusCode,
                message: 'Ekstensi file tidak sesuai.'
            })
        }

        //Validate input
        const { error } = validateCourse(req.body)
        if(error) return res.status(400).json({
            status: res.statusCode,
            message: error.details[0].message
        })

        const uploaded = await cloudinary.uploader.upload(file.path, {
            upload_preset: 'elemes'
        })
        
        const data = {
            courseName: req.body.courseName,
            courseCategoryId: req.body.courseCategoryId,
            courseDescription: req.body.courseDescription,
            coursePrice: req.body.coursePrice
        }

        const saveCourse = await ModelCourse.create(data)

        const saveImage = await ModelCourseImage.create({
            courseId: saveCourse.dataValues.id,
            courseImage: uploaded.public_id,
        })

        responseMessage(res, 201, 'Data berhasil disimpan.')

    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const index = async(req, res) => {
    var where = {}
    var order = []
    var keywords = ''
    if(req.query.orderBy) {
        if(req.query.orderBy.toLowerCase() !== 'free') {
            order = [['coursePrice', req.query.orderBy]]
        } else {
            where = {
                coursePrice: 0
            }
        }
    }
    if(req.query.keywords) {
        keywords = req.query.keywords.replace(/\s+/g, ' ').trim()
        where = {
            courseName: {
                [Op.like]: '%'+keywords+'%'
            }
        }
    }
    try {
        const getCourses = await ModelCourse.findAll({
            where,
            attributes: ['id', 'courseName', 'coursePrice'],
            include: [
                {
                    model: ModelCourseImage
                },
                {
                    model: ModelCourseCategory
                }
            ],
            order
        })

        responseData(res, 200, getCourses)
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const show = async(req, res) => {
    try {
        const getDetail = await ModelCourse.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: ModelCourseCategory
                },
                {
                    model: ModelCourseImage
                }
            ]
        })

        responseData(res, 200, getDetail)
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const update = async(req, res) => {
    try {
        //Validate input
        const { error } = validateCourse(req.body)
        if(error) return res.status(400).json({
            status: res.statusCode,
            message: error.details[0].message
        })

        
        const getCourse = await ModelCourse.findOne({
            where: {
                id: req.body.id
            },
            include: [{
                model: ModelCourseImage
            }]
        })

        if(getCourse.length < 1) return res.status({
            status: res.statusCode,
            message: 'Data tidak ditemukan.'
        })

        const data = {
            courseName: req.body.courseName,
            courseCategoryId: req.body.courseCategoryId,
            courseDescription: req.body.courseDescription,
            coursePrice: req.body.coursePrice
        }

        const updateCourse = await ModelCourse.update(data, {
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

const destroy = async(req, res) => {
    try {
        const getCourse = await ModelCourse.findOne({
            where: {
                id: req.body.id
            },
            include: [{
                model: ModelCourseImage
            }]
        })

        await cloudinary.uploader.destroy(getCourse.course_images[0].courseImage)

        const destroyImage = await ModelCourseImage.destroy({
            where: {
                id: getCourse.course_images[0].id
            }
        })

        const destroyCourse = await ModelCourse.destroy({
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

export { store, index, show, update, destroy }