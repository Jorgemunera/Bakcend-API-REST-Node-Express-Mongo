const { matchedData } = require('express-validator');
const {tracksModel} = require('../models');
const {handleHttpError} = require('../utils/handleError');

const getItems = async (req,res)=>{
    try{
        const user = req.user;
        const tracks = await tracksModel.find({});
        res.send({tracks, user});
    }catch(err){
        handleHttpError(res,'error en get items');
    }
};

const getItem = async (req,res)=>{
    try{
        const params = matchedData(req)
        const id = params.id;
        const track = await tracksModel.findById(id);
        res.send(track);
    }catch(err){
        handleHttpError(res,'error en get item');
    }
};

const createItem = async (req,res)=>{
    try{
        const body = matchedData(req)
        const newTrack = await tracksModel.create(body);
        res.send({newTrack});
    }catch(err){
        handleHttpError(res,'error en create item');
    }
};

const updateItem = async (req,res)=>{
    try{
        const {id, ...body} = matchedData(req)
        const trackUpdated = await tracksModel.findOneAndUpdate(id, body);
        res.send(trackUpdated);
    }catch(err){
        handleHttpError(res,'error en update item')
    }
};

const deleteItem = async (req,res)=>{
    try{
        req = matchedData(req)
        const {id} = req;
        const track = await tracksModel.delete({_id:id});
        res.send(track);
    }catch(err){
        handleHttpError(res,'error en delete item');
    }
};


module.exports = {getItems, getItem, createItem, updateItem, deleteItem}