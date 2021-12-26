const express = require('express');
const { getPlantsList ,fetchPlantDetails } = require('./scrape');
const router = express.Router();
let DB;

async function initDB(){
    const data = await getPlantsList();
    return data;
}
initDB()
.then((data)=>DB = data).catch((error)=>console.log(error));


router.get('/plants',async (req,res)=>{
   res.status(200).json(DB);
});

router.get('/plants/:id',async (req,res)=>{
    const _id = req.params.id;
    if(DB == null)
        return res.status(500).json({message:"Server database error"});
    if(_id>=DB.length || _id<0 )
        return res.status(500).json({message:"Couldn't find a plant with this id"});
    try{
        const details = await fetchPlantDetails(DB[_id].Link);
        const plantDetails = {...DB[_id],...details};
        res.status(200).json(plantDetails);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Couldn't get this plant's details"});
    }
});



module.exports = router;