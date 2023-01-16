const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');


const UserSchema = new mongoose.Schema(
    {
        //atributos de nuestra entidad
        name: {
            type:String
        },
        age: {
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            select: false //cuando solicitemos la info del usuario en la db no la retornara
        },
        role:{
            type:["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps:true, //Mongoose nos crea auto reatedAt, updatedAt
        versionKey:false,
    }
)

UserSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("users", UserSchema);