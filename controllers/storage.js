const {storageModel} = require('../models');
const { matchedData } = require('express-validator');
const {handleHttpError} = require('../utils/handleError');
//requerimos el fs
const fs = require('fs');
const PUBLIC_URL = process.env.PUBLIC_URL;
//ruta absoluta en el servidor donde vive el archivo
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req,res)=>{
    try{
        const data = await storageModel.find({});
        res.send({data})
    }catch(err){
        handleHttpError(res,'error en get items');
    }
};

const getItem = async (req,res)=>{
    try{
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data})
    }catch(err){
        handleHttpError(res,'error en get item');
    }
};

const createItem = async (req,res)=>{
    try{
        const {file} = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en create item');
    }
};

const deleteItem = async (req,res)=>{
    try{
        const {id} = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.deleteOne({_id:id});//eliminar el registro de la DB
        const {filename} = dataFile; //tomamos el filename (asi esta guardado en la DB)
        const filePath = `${MEDIA_PATH}/${filename}`; //c:/miproyecto/file-1234.png
        fs.unlinkSync(filePath);//eliminar el archivo fisico en el servidor
        const data = {
            filePath,
            deeted: 1
        }
        res.send({data})
    }catch(err){
        handleHttpError(res,'error en delete item');
    }
};


module.exports = {getItems, getItem, createItem, deleteItem}