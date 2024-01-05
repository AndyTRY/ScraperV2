const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const {spawn} = require('child_process');
const pythonshell = require('python-shell');
const MAmaProduct = require('../../MongoModels/Amaproduct')
const fs = require("fs");
const insertProducts = require('../../Scraped_data/AmazonMongo');
//root/search


router.post('/', (req,res)=>{
    const searchparam = req.body.search
    const Amaproducts = []
    const AmaScrap = spawn('python3',["./python_scripts/AmaScrap.py", searchparam]); 
    const NeweggScrap = spawn('python3',["./python_scripts/NeweggScrap.py", searchparam]); 
    
    console.log(AmaScrap.pid);
    console.log(NeweggScrap.pid);
    //let first = new Promise((reslove, reject) =>){}
    
    AmaScrap.stdout.on('data', function (data) {
        //console.log('Pipe data from python script ...');
       });

    AmaScrap.on('close', (code) => {
        console.log(`Ama child process close all stdio with code ${code}`);
        res.send('done');
        
    });

    NeweggScrap.on('close', (code) => {
        console.log(`New child process close all stdio with code ${code}`);
        
    });
    

});


module.exports = router;
