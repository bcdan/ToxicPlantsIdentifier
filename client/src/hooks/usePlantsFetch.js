import { useEffect } from "react";
import {useDispatch} from 'react-redux'
import {setPlants} from '../features/plants'
import axios from "axios";

 const usePlantsFetch = ()=>{
      const dispatch = useDispatch();

      useEffect(()=>{
        const fetchPlants = async()=>{
          const res = await axios
          .get('/api/plants')
          .catch(
            (err)=>console.log(err));
          dispatch(setPlants(res.data));
      }
      fetchPlants();
      },[dispatch]);
      
}

export default usePlantsFetch;
