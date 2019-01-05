const express = require('express')
const config = require('./config/server')
const mongoose = require('mongoose')
const app = express()


mongoose.connect(config.mongoUri,{useMongoClient:true});

require('./server/middleware')(app)
require('./server/routes')(app)
app.use(express.static('build'));

app.get('*',(req,res)=>{
  res.sendFile(`${__dirname}/build/index.html`)
})

const server = app.listen(config.port, () => {
  console.log('app listening on', config.port);
});
