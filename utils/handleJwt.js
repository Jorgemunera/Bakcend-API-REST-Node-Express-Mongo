//este documento tendra 2 funciones
//1. generar-firmar token
//2. verificar el token
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user)=>{
    const sign = jwt.sign(
        //payload
        {
            _id:user._id,
            role: user.role
        },
        //secreto
        JWT_SECRET,
        //expiracion
        {
            expiresIn: "2h"
        }
    )
    return sign;
}

const verifyToken = async (token)=>{
    try{
        return jwt.verify(token, JWT_SECRET)
    }catch(err){
        return null
    }
}

module.exports = {
    tokenSign,
    verifyToken
}