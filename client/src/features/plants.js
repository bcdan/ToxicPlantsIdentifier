const SET_PLANTS = 'ToxicPlantsIdentifier/plants/setPlants'

const initialState = {
    plants : [],
};

export default function reducer(state = initialState,{type,payload}) {
    switch(type){
        case SET_PLANTS:
            return { ...state , plants: payload};
        default:
            return state;
    }
};

export const setPlants = (plants) => ({
    type: SET_PLANTS,
    payload: plants
});


