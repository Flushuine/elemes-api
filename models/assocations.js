import ModelUser from './user.js'
import ModelRole from './role.js'
import ModelCourse from './course.js'
import ModelCourseCategory from './course_category.js'
import ModelCourseImage from './course_image.js'

ModelRole.hasMany(ModelUser, {
    foreignKey: 'roleId'
})

ModelUser.belongsTo(ModelRole, {
    foreignKey: 'roleId'
})

ModelCourseCategory.hasMany(ModelCourse, {
    foreignKey: 'courseCategoryId'
})

ModelCourse.belongsTo(ModelCourseCategory, {
    foreignKey: 'courseCategoryId'
})

ModelCourse.hasMany(ModelCourseImage, {
    foreignKey: 'courseId'
})

ModelCourseImage.belongsTo(ModelCourse, {
    foreignKey: 'courseId'
})

export { ModelUser, ModelRole, ModelCourseCategory, ModelCourse, ModelCourseImage }