const express = require('express');
const userRouter=require("./user")
 
// Single routing
const router = express.Router();

app.use('/user',userRouter);
module.exports=router;