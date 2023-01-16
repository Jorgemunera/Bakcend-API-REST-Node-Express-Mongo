const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./config/mongo');
const loggerStream = require('./utils/handleLogs');
const morganBody = require('morgan-body');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app,{
    noColors: true,
    stream: loggerStream,
    skip:function(req,res){
        return res.statusCode < 400
    }
})

const port = process.env.PORT || 3000;

app.use('/api', require('./routes'));

app.listen(port, ()=>{
    console.log(`Server escuchando en puerto ${port}`);
});

dbConnect();