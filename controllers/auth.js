//cosas relacionadas con el jwt
const { matchedData } = require('express-validator');
const {encrypt, compare} = require('../utils/handlePassword');
const {usersModel} = require('../models');
const {tokenSign, verifyToken} = require('../utils/handleJwt');
const {handleHttpError} = require('../utils/handleError');

const registerCrtl = async (req,res)=>{
    try{
        req =matchedData(req);//recibimos la informacion validada y curada
        const password = await encrypt(req.password);//encriptamos el password
        const body = {...req, password};//agregamos o sobreescribimos el password a la info si no viene
        const newUser = await usersModel.create(body);//registramos el usuario en la base de datos
        newUser.set("password", undefined, {strict:false})//quitamos el password de la informacion en la res por seguridad
        
        const data = {
            token: await tokenSign(newUser),
            user: newUser
        }
        
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en register user');
    }
}

//controlador para login
const loginCtrl = async (req,res)=>{
    try{
        req =matchedData(req);
        const user = await usersModel.findOne({email: req.email})
            .select("password email role name ");
        if(!user){
            handleHttpError(res,'user not exist', 404);
            return
        }

        const hashPassword = user.get("password");
        const check = await compare(req.password, hashPassword);
        if(!check){
            handleHttpError(res,'password invalido', 401);
            return
        }

        user.set("password", undefined, {strict:false});
        const data = {
            token: await tokenSign(user),
            user: user
        }

        res.send({data});
    }catch(err){
        handleHttpError(res,'error en login user');
    }
}

module.exports = {registerCrtl, loginCtrl};