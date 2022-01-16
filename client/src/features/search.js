import {HOME_PLACEHOLDER_PLANT} from '../common/constants'
const SET_SEARCH_PLANT_ID ='ToxicPlantsIdentifier/plants/setSearchPlantID'
const SET_SEARCHBOX_STATUS ='ToxicPlantsIdentifier/plants/setSearchBoxStatus'
const SET_SEARCH_TERM ='ToxicPlantsIdentifier/plants/setSearchTerm'

const initialState = {
    searchedPlantID : HOME_PLACEHOLDER_PLANT,
    searchResultsStatus : false,
    searchTerm :""
};

export default function reducer(state = initialState,{type,payload}) {
    switch(type){
        case SET_SEARCH_PLANT_ID:
            return { ...state , searchedPlantID: payload};
        case SET_SEARCHBOX_STATUS:
            return {...state , searchResultsStatus: payload};
        case SET_SEARCH_TERM:
            return {...state, searchTerm:payload};
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

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term
});


