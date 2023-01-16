const multer = require('multer');

//configuracion del multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function(req,file,cb){
        //los archivos tienen extenciones
        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}`; // file-202301011084600.mp4
        cb(null, filename)
    }
})

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;