const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const path = './db.json';

let plantsDB = [];
let currentNumOfPlants = 0;

    exports.getPlantsList = (async (req,res) => {
        try {
            if(!fs.existsSync(path))  
            await fetchFromSite();  
        else
            plantsDB =  JSON.parse(fs.readFileSync(path,'utf-8'));
        return  Promise.resolve(plantsDB);
        } catch (error) {
            return Promise.reject(error);
        }
    });





async function fetchFromSite(){
    const url= 'https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list';
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    const scrapedPlantsList = $('div.view-header,div.view-content');
    let isToxic = true;
    scrapedPlantsList.each((i,scrapedElement)=>{ // even indices are titles and odd are plants list content
            !(i%2) ? isToxic = isNonToxicPlant($,scrapedElement) : getAllPlantsFromList($,scrapedPlantsList,i,isToxic);
         });
    fs.writeFileSync('db.json',JSON.stringify(plantsDB),(err,result)=>{
        if(err)
            console.error(err);
    });


}

function getAllPlantsFromList($,scrapedPlantsList,plantsListIndex,isToxic){
    $(scrapedPlantsList[plantsListIndex]).find('a').each((j,elem)=>{
        plantsDB.push({
            ID:currentNumOfPlants++,
            Name:$(elem).text(),
            Link:$(elem).attr('href'),
            Toxic:isToxic
        });
    });
}




function isNonToxicPlant($,scrapedElement){
    let title = $(scrapedElement).text().trim();
    return !title.includes('Non-Toxic');
}

