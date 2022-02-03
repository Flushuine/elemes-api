import jwt from 'jsonwebtoken'
import client from '../config/init_redis.js'

function verifyRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken

    if(refreshToken == null) return res.status(401).json({
        status: false,
        message: 'Invalid request.'
    })

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY)
        req.userData = decoded
        
        //verify the redis
        client.get(decoded.userId, (err, data) => {
            if(err) throw err

            if(data === null) return res.status(401).json({
                status: false,
                message: 'Invalid request. The token is not in the store.'
            })

            if(JSON.parse(data).token != refreshToken) return res.status(401).json({
                status: false,
                message: 'Invalid token.'
            })

            next()
        })
    
    } catch(error) {
        return res.status(401).json({
            status: res.statusCode,
            message: 'Your session is not valid.'
        })
    }
}

function verifyAccessToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.status(401).json({
        status: res.statusCode,
        message: 'Invalid request.'
    })

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(403).json({
            status: res.statusCode,
            message: err
        })
        req.email = decoded.email
        req.userId = decoded.userId
        req.roleId = decoded.roleId,
        req.isVerified = decoded.isVerified,
        req.fullName = decoded.fullName

        next()
    })
}

function verifyAdmin(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.status(401).json({
        status: false,
        message: 'Invalid request.'
    })

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(403).json({
            status: res.statusCode,
            message: err
        })

        if(decoded.roleId == 2) return res.status(403).json({
            status: res.statusCode,
            message: 'Forbidden.'
        })

        req.email = decoded.email
        req.userId = decoded.userId
        req.roleId = decoded.roleId,
        req.isVerified = decoded.isVerified,
        req.fullName = decoded.fullName

        next()
    })
}

export { verifyRefreshToken, verifyAccessToken, verifyAdmin }