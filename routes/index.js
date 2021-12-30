const express = require('express');
const { getPlantsList  } = require('./scrape');
const router = express.Router();
let DB;
let serverBusy = false;

async function initDB(){
    serverBusy = true;
    const data = await getPlantsList();
    serverBusy = false;
    return data;
}
initDB()
.then((data)=>DB = data).catch((error)=>console.log(error));


router.get('/plants',async (req,res)=>{
   res.status(200).json(DB);
});

router.get('/plants/:id',async (req,res)=>{
    const _id = req.params.id;
    console.log(serverBusy);
    if(serverBusy)
        res.status(429).json({message:"Server is loading data"});
    if(DB == null)
        return res.status(500).json({message:"Server database error"});
    if(_id>=DB.length || _id<0 )
        return res.status(500).json({message:"Couldn't find a plant with this id"});
    try{
        const plantDetails = {...DB[_id]};
        res.status(200).json(plantDetails);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Couldn't get this plant's details"});
    }
});



module.exports = router;