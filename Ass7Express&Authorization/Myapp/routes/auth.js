const express = require('express');
const router = express.Router();
const jwtManager = require('../jwt/jwtManager');
const fs = require('fs');
const readfile = require('./readFile');
let jwtobj = new jwtManager();

router.post('/',(req,res)=>{
    let authUsers = readfile('./authUsers.txt');
    console.log(authUsers)
    for(let elem of authUsers){
        console.log(elem.username+"  "+elem.password)
        if(req.body.username=== elem.username && req.body.password === elem.password){ //   
            const data = {};
            data.id = elem.id;
            data.username = elem.username;
            data.creadtedAt = Date.now();
            const token = jwtobj.generate(data);
            res.json({Result:token,status:'Success'});
        }else{
            res.json({status:'Invalid credentials'});
        }
    }
})





module.exports=router