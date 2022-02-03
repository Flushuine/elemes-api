import path from 'path'
import multer from 'multer'
import util from 'util'

//multer middleware
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname))
    },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
}).single('courseImage')

const uploadFileMiddleware = util.promisify(upload)

export default uploadFileMiddleware