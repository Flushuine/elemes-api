import { ModelCourseCategory, ModelCourse } from '../models/assocations.js'
import { responseData, responseMessage } from '../utils/response-handler.js'
import { validateCourseCategory } from '../utils/joi-validation.js'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const store = async(req, res) => {
    //Validate input
    const { error } = validateCourseCategory(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    try {
        const save = await ModelCourseCategory.create({
            categoryName: req.body.categoryName
        }).then(() => {
            responseMessage(res, 201, 'Data berhasil disimpan.')
        })

    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const index = async(req, res) => {
    try {
        const getCategories = await ModelCourseCategory.findAll()

        responseData(res, 200, getCategories)
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

const getPopulars = async(req, res) => {
    try {
        const getCourse = await ModelCourse.findAll({
            where: {
                sold: {
                    [Op.gt]: 0
                }
            }
        })

        const getCategories = await ModelCourseCategory.findAll()

        let populars = []
        let i = 0

        for(let category of getCategories) {
            let totalSold = 0
            populars[i] = {
                id: category.id,
                totalSold: totalSold
            }
            for(let course of getCourse) {
                if(category.id === course.courseCategoryId) {
                    totalSold = totalSold + course.sold
                    populars[i].totalSold = totalSold
                }
            }

            if(populars[i].totalSold === 0) {
                populars.splice(i)
            } else {
                i++
            }
        }

        await populars.sort((a, b) => {
            return b.totalSold - a.totalSold
        })

        let ids = []
        i = 0

        for(let id of populars) {
            ids[i] = id.id
            i++
        }

        const getPopularCategory = await ModelCourseCategory.findAll({
            where: {
                id: ids
            },
            order: [[Sequelize.fn('FIELD', Sequelize.col('id'), ids)]]
        })

        responseData(res, 200, getPopularCategory)
    } catch(error) {
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

export { store, index, getPopulars }