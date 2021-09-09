const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const PATH = './db.json';
const PLANTS_URL = 'https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list';
let plantsDB = [];
let currentNumOfPlants = 0;

    exports.getPlantsList = (async (req,res) => {
        try {
            if(!fs.existsSync(PATH))  
            await fetchFromSite();  
        else
            plantsDB =  JSON.parse(fs.readFileSync(PATH,'utf-8'));
        return  Promise.resolve(plantsDB);
        } catch (error) {
            return Promise.reject(error);
        }
    });





async function fetchFromSite(){
    const $ = await initScrapeSelector(PLANTS_URL);
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

exports.fetchPlantDetails= async (url)=>{
    const $ = await initScrapeSelector(`https://www.aspca.org${url}`);
    const image = $('div.pane-node-field-image').find('img').attr('data-echo');
    const additionalNames = $('div.pane-node-field-additional-common-names span.values').text();
    const scientificName = $('div.pane-node-field-scientific-name span.values').text().trim();
    const family = $('div.pane-node-field-family span.values').text().trim();
    const toxicity = $('div.pane-node-field-toxicity span.values').text().trim();
    const non_toxicity = $('div.pane-node-field-non-toxicity span.values').text().trim();
    const details = {
        img:image,
        additionalNames:additionalNames,
        scienceName : scientificName,
        family:family,
        toxicity:toxicity,
        non_toxicity:non_toxicity
    }
    return details;
}

//Fetches URL and returns '$' as a selector 
async function initScrapeSelector(url){
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body); // selector
    return $;
}

