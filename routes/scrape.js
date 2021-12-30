const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const download = require('image-downloader')
const {mapAllSettled} = require('./fetchLimiter.js');
const PATH = './db.json';
const PLANTS_URL = 'https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list';
const MAX_CONCURRENT_REQUESTS = 15;
let plantsDB = [];
let currentNumOfPlants = 0;

    exports.getPlantsList = (async (req,res) => {
        try {
        if(!fs.existsSync(PATH))  
            await fetchFromSite();  
        else{
            plantsDB =  JSON.parse(fs.readFileSync(PATH,'utf-8'));
            currentNumOfPlants = plantsDB.length;
        }
        return  Promise.resolve(plantsDB);
        } catch (error) {
            return Promise.reject(error);
        }
    });



async function fetchFromSite(){
    console.log("Scraping data now...");
    const $ = await initScrapeSelector(PLANTS_URL);
    const scrapedPlantsList = $('div.view-header,div.view-content');
    let isToxic = true;
    scrapedPlantsList.each((i,scrapedElement)=>{ // even indices are titles and odd are plants list content
            !(i%2) ? isToxic = isNonToxicPlant($,scrapedElement) : getAllPlantsFromList($,scrapedPlantsList,i,isToxic);
         });
    await addAllPlantsDetails();
    fs.writeFileSync('db.json',JSON.stringify(plantsDB),(err,result)=>{
        if(err)
            console.error(err);
    });
    console.log("Finished scraping all data");


}

async function addAllPlantsDetails(){
    const data = await mapAllSettled(plantsDB,async(plant)=>{
        try {
            const extraDetails = await fetchPlantDetails(plant.link,plant.ID);
            return {
                ...plant,
                ...extraDetails
            }
                ;
        } catch (error) {
            return error.message;
        }
    },MAX_CONCURRENT_REQUESTS);
    plantsDB=data.map(item=>item.value);
}


function getAllPlantsFromList($,scrapedPlantsList,plantsListIndex,isToxic){
    $(scrapedPlantsList[plantsListIndex]).find('.field-content').each((j,elem)=>{
            const plantAnchorTag = $(elem).find('a');
            const name = $(plantAnchorTag).text().trim();
            const plantLink = $(plantAnchorTag).attr('href');
        plantsDB.push({
            ID:currentNumOfPlants++,
            name:name,
            link:plantLink,
            toxic:isToxic,
        })
    });
}


function isNonToxicPlant($,scrapedElement){
    let title = $(scrapedElement).text().trim();
    return !title.includes('Non-Toxic');
}

async function fetchPlantDetails(url,id){
     const $ = await initScrapeSelector(`https://www.aspca.org${url}`);
    const image = $('div.pane-node-field-image').find('img').attr('data-echo');
    const imageWithExtension = image.split("?")[0]; 
    const filePath = `./public/plants-images/plant_${id}.jpg`; 
    const options = {
        url:imageWithExtension,
        dest:filePath,
        timeout: 300000
    }
    if(!fs.existsSync(filePath)){
        download.image(options).then(({filename})=>{console.log("Saved to",filename)}).catch((err)=>{console.error(err)});
    }
    const additionalNames = $('div.pane-node-field-additional-common-names span.values').text();
    const scientificName = $('div.pane-node-field-scientific-name span.values').text().trim();
    const family = $('div.pane-node-field-family span.values').text().trim();
    const toxicity = $('div.pane-node-field-toxicity span.values').text().replace(/Toxic to/g,"").toLowerCase().trim();
    const safe = $('div.pane-node-field-non-toxicity span.values').text().replace(/Non-Toxic to/g,"").toLowerCase().trim();
    const details = {
        img:imageWithExtension,
        additionalNames:additionalNames,
        scienceName : scientificName,
        family:family,
        toxicity:toxicity,
        safe:safe
    }
    return details;
}

//Fetches URL and returns '$' as a selector 
async function initScrapeSelector(url){
    const response = await axios.get(url).catch(error=>console.log(error));
    const body = await response.data;
    const $ = cheerio.load(body); // selector
    return $;
}

