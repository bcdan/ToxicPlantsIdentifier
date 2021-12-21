import {HOME_PLACEHOLDER_PLANT} from '../common/constants'
const SET_SEARCH_PLANT_ID ='ToxicPlantsIdentifier/plants/setSearchPlantID'
const SET_SEARCHBOX_STATUS ='ToxicPlantsIdentifier/plants/setSearchBoxStatus'

const initialState = {
    searchedPlantID : HOME_PLACEHOLDER_PLANT,
    searchResultsStatus : false
};

export default function reducer(state = initialState,{type,payload}) {
    switch(type){
        case SET_SEARCH_PLANT_ID:
            return { ...state , searchedPlantID: payload};
        case SET_SEARCHBOX_STATUS:
            return {...state , searchResultsStatus: payload}
        default:
            return state;
    }
};

export const setSearchPlantID = (plantSearchID) => ({
    type: SET_SEARCH_PLANT_ID,
    payload: plantSearchID
});

export const setSearchBoxStatus = (status) => ({
    type: SET_SEARCHBOX_STATUS,
    payload: status
});


