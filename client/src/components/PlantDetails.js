import {useParams} from 'react-router-dom'
import {useState,useEffect} from "react"

const PlantDetails = () => {
    const [plant,setPlant] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const getPlantDetails = async()=>{
            const res = await fetch(`/api/plants/${id}`);
            const plant = await res.json();  
            setPlant(plant);
          }
          getPlantDetails();
    },[id]);

    return (
        <div>
            <h1>{plant.Name}</h1>
            <img src={plant.img} alt=""/>
            <h3>{plant.additionalNames}</h3>
            <h3>{plant.scienceName}</h3>
            <h3>{plant.family}</h3>
        </div>
    )
}

export default PlantDetails
