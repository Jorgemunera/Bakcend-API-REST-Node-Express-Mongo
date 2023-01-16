const {handleHttpError}= require('../utils/handleError');
const {verifyToken} = require('../utils/handleJwt');
const {usersModel} = require('../models');

const authMiddleware = async (req,res,next)=>{
    try {
        if(!req.headers.authorization){
            handleHttpError(res, "not token", 401);
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            handleHttpError(res, "not id token", 401);
        }

        const user = await usersModel.findById(dataToken._id);//buscamos el usuario correspondiente en nuestra db
        req.user = user;//agregamos la propiedad user y le asignamos ese usuario, de esta manera cuando la peticion req llegue al controlador respectivo, en ese controlador podremos saber exactamente quien es el usuario que tiene la sesion

        next();

    } catch (err) {
        handleHttpError(res, "not session", 401);
    }
}

module.exports = authMiddleware;