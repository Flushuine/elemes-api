import { ModelUser } from  '../models/assocations.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateUser, validateLogin } from '../utils/joi-validation.js'
import { responseData, responseMessage } from '../utils/response-handler.js'
import client from '../config/init_redis.js'

const register = async(req, res) => {
    //validate the register input
    const {error} = validateUser(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    try {
        //check if email already exist
        const isExist = await ModelUser.findOne({ where: {email: req.body.email} })

        if(isExist) return res.status(400).json({
            status: res.statusCode,
            message: 'Email ini sudah terdaftar.'
        })

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        const data = {
            fullName: req.body.fullName,
            roleId: req.body.roleId,
            email: req.body.email,
            password: passwordHash
        }
        const saveUser = await ModelUser.create(data)

        responseMessage(res, 201, 'Registrasi sukses.')
    } catch (err) {
        res.status(500).json({
            message: 'Server error.',
            error: err.message
        })
    }
}

const login = async(req, res) => {
    //validate the login input
    const {error} = validateLogin(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    try {
        const results = await ModelUser.findAll({
            where: {
                email: req.body.email
            }
        })
        
        //check if user is not exist
        if(results.length == 0) {
            return res.status(400).json({
                status: res.statusCode,
                error: 'Email atau password salah.',
                token: null
            })
        }

        const valid = await bcrypt.compare(req.body.password, results[0].password)

        //check if the password is match
        if(!valid){
            return res.status(400).json({
                status: res.statusCode,
                error: 'Email atau password salah.'
            })
        }

        const user = {
            userId: results[0].id,
            roleId: results[0].role_id,
            fullName: results[0].full_name
        }

        const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: '30s'
        })

        if(req.body.remember === true) {
            //const remember = req.body.remember

            const refreshToken = generateRefreshToken(user, true)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            })
    
            return res.status(200).json({
                accessToken: accessToken
            })

        } else {
            const refreshToken = generateRefreshToken(user, false)
    
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 3 * 60 * 60 * 1000
            })
    
            return res.status(200).json({
                accessToken: accessToken
            })
        }

        
    } catch (err) {
        res.status(500).json({
            message: 'Login failed.',
            error: err.message
        })
    }
}

const logout = async(req, res) => {
    try {
        const userId = req.userData.userId
    
        client.del(userId, (err, reply) => {
            if(err) throw err

            return res.sendStatus(204)
        })
    } catch(error) {
        res.status(500).json({
            message: 'Server error.',
            error: error.message
        })
    }
}

//For Token assignment
const getAccessToken = async(req, res) => {
    const data = {
        userId: req.userData.userId,
        roleId: req.userData.roleId,
        fullName: req.userData.fullName

    }
    const accessToken = jwt.sign({
        userId: data.userId,
        roleId: data.roleId,
        fullName: data.fullName
    }, process.env.SECRET_KEY, {
        expiresIn: '30s'
    })

    return res.status(200).json({
        accessToken: accessToken
    })
}

function generateRefreshToken(user, remember) {
    if(remember === true) {
        const refreshToken = jwt.sign({
            userId: user.userId,
            fullName: user.fullName
            }, process.env.REFRESH_KEY, {
                expiresIn: '3d'
        })
        
    
        client.get(user.userId.toString(), (err, data) => {
            if(err) throw err
    
            client.set(user.userId.toString(), JSON.stringify({token: refreshToken}), 'EX', 3 * 24 * 60 * 60)
        })
    
        return refreshToken
    } else {
        const refreshToken = jwt.sign({
            userId: user.userId,
            fullName: user.fullName
            }, process.env.REFRESH_KEY, {
                expiresIn: '3h'
        })
        
    
        client.get(user.userId.toString(), (err, data) => {
            if(err) throw err
    
            client.set(user.userId.toString(), JSON.stringify({token: refreshToken}), 'EX', 3 * 60 * 60)
        })
    
        return refreshToken
    }

}

export { register, login, logout, getAccessToken }