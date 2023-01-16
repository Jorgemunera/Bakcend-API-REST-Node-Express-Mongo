const customHeader = (req,res,next)=>{
    try{
        const apiKey = req.headers.api_key;
        if(apiKey === 'jorge'){
            next()
        }else{
            res.status(403)
            res.send({error: "api_key incorrecta"})
        }
    }catch(err){
        res.status(403)
        res.send({error: "algo ocurrio en el custom header"})
    }
}


module.exports = customHeader;