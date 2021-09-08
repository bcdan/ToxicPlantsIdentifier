const express = require('express');
const { getPlantsList  } = require('./scrape');
const router = express.Router();
let DB;

async function initDB(){
    const data = await getPlantsList();
    return data;
}
initDB()
.then((data)=>DB = data).catch((error)=>console.log(error));


router.get('/',(req,res)=>{
    console.log(DB);
res.send("This is the main window")
});

router.get('/plants',async (req,res)=>{
   res.status(200).json(DB);
});

router.get('/plants/:id',(req,res)=>{
    const _id = req.params.id;
    if(DB == null)
        return res.status(500).json({message:"Server database error"});
    if(_id>=DB.length || _id<0 )
            return res.status(500).json({message:"Couldn't find a plant with this id"});
    res.status(200).json(DB[_id]);
});



module.exports = router;