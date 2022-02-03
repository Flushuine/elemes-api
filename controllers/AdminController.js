import { ModelUser, ModelCourse, ModelCourseCategory } from '../models/assocations.js'
import { responseData } from '../utils/response-handler.js'

//Delete user
const delUser = async(req, res) => {
    try {
        const getUser = await ModelUser.findOne({
            where: {
                id: req.body.userId
            }
        })

        if(!getUser) return res.status(400).json({
            status: res.statusCode,
            message: 'User tidak ditemukan.'
        })

        const updateUser = await ModelUser.update({activeFlag: 0}, {
            where: {
                id: req.body.userId
            }
        })

        return res.status(200).json({
            status: res.statusCode,
            message: 'User berhasil dihapus'
        })
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const getTotalUser = async(req, res) => {
    try {
        const getUsers = await ModelUser.count({
            where: {
                activeFlag: 1
            }
        })

        responseData(res, 200, getUsers)
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const getTotalCourse = async(req, res) => {
    try {
        const getCourses = await ModelCourse.count()

        responseData(res, 200, getCourses)
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const getTotalFreeCourse = async(req, res) => {
    try {
        const getFreeCourses = await ModelCourse.count({
            where: {
                coursePrice: 0
            }
        })

        responseData(res, 200, getFreeCourses)
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}


export { delUser, getTotalUser, getTotalCourse, getTotalFreeCourse }