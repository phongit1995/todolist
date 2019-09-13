require('dotenv').config()
const express = require('express');
let bodyParser = require('body-parser');
let router = require("./routers/index");
let path = require('path');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use("/",router);
app.listen(process.env.PORT||3000,function(){
    console.log("App running");
})