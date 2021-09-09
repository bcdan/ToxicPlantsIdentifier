import {useParams} from 'react-router-dom'
import {useState,useEffect} from "react"
import Loader from "react-loader-spinner";

const PlantDetails = () => {
    const [plant,setPlant] = useState([]);
    const [loading,setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const getPlantDetails = async()=>{
            const res = await fetch(`/api/plants/${id}`);
            const plant = await res.json();  
            setPlant(plant);
            setLoading(false);
          }
          getPlantDetails();
    },[id]);

    const Details = ()=>{
        return (
            <div className="container">
                <h1>{plant.Name}</h1>
                <img src={plant.img} alt=""/>
                <h3>{plant.additionalNames}</h3>
                <h3>{plant.scienceName}</h3>
                <h3>{plant.family}</h3>
            </div>
        )
    }
    return (loading ? <Loader type="BallTriangle" color="#00BFFF" height={80} width={80}/> : <Details/> 

    )


}

export default PlantDetails
