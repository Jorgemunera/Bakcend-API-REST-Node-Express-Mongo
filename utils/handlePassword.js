//este archivo tendra 2 funciones
//1 encriptar los password
//2 comparar el password
const bcryptjs = require('bcryptjs');


const encrypt = async (password)=>{
    const hash = await bcryptjs.hash(password, 10);
    return hash;
}

const compare = async (password, hash)=>{
    return await bcryptjs.compare(password, hash);
}

module.exports = {
    encrypt,
    compare
}