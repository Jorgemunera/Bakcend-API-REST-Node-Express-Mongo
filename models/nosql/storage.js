const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


const StorageSchema = new mongoose.Schema(
    {
        //atributos de nuestra entidad
        url: {
            type:String
        },
        filename: {
            type:String
        }
    },
    {
        timestamps:true, //Mongoose nos crea auto reatedAt, updatedAt
        versionKey:false,
    }
)

module.exports = mongoose.model("storages", StorageSchema);