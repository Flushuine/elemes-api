import Joi from 'joi'

const validateUser = (data) => {
    const Schema = Joi.object({
        fullName: Joi.string().max(30).required(),
        roleId: Joi.number(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.any().equal(Joi.ref('password'))
            .required()
            .options({ messages: { 'any.only': 'Confirm password does not match' } })
    })
    return Schema.validate(data)
}

const validateUpdateUser = (data) => {
    const Schema = Joi.object({
        full_name: Joi.string().max(30),
        email: Joi.string().email(),
        password: Joi.string(),
        password_confirmation: Joi.any().equal(Joi.ref('password'))
            .required()
            .options({ messages: { 'any.only': 'Confirm password does not match' } })
    })
    return Schema.validate(data)
}

const validateLogin = (data) => {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        remember: Joi.boolean()
    })
    return Schema.validate(data)
}

const validateCourse = (data) => {
    const Schema = Joi.object({
        id: Joi.number(),
        courseName: Joi.string().max(70).required(),
        courseDescription: Joi.string().required(),
        courseCategoryId: Joi.number().required(),
        coursePrice: Joi.number().required()
    })
    return Schema.validate(data)
}

const validateCourseCategory = (data) => {
    const Schema = Joi.object({
        categoryName: Joi.string().required()
    })
    return Schema.validate(data)
}

export { validateUser, validateLogin, validateCourse, validateUpdateUser, validateCourseCategory }