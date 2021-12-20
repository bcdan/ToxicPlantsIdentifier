import {useState,useEffect} from "react"
import Loader from "react-loader-spinner";
import { FaSkullCrossbones ,FaCheck} from 'react-icons/fa';
import './plantDetails.css';



const PlantDetails = ({plantID}) => {
    const [plant,setPlant] = useState([]);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        const getPlantDetails = async()=>{
            const res = await fetch(`/api/plants/${plantID}`);
            const plant = await res.json();  
            setPlant(plant);
            setLoading(false);
          }
          getPlantDetails();
    },[plantID]);



    const Details = ()=>{
        return (
            <div className="plant-card" >
                <div className="card-img" style={{
                    background:`url(${plant.img})` ,
                    backgroundSize:'cover',
                    borderTopRightRadius:'15px',
                    borderTopLeftRadius:'15px',
                    gridArea:'image'
                    }} >
                </div>
                <div className="card-text">
                    <h2>{plant.Name}</h2>
                    <p><strong>Additional Names:</strong> {plant.additionalNames}</p>
                    <p><strong>Scientific Name:</strong> {plant.scienceName}</p>
                    <p><strong>Family:</strong> {plant.family}</p>
                </div>
                <div className="card-toxicity">
                    <div className="toxicity">
                    {plant.Toxic?<p>Toxic <FaSkullCrossbones/></p> :<p>Non Toxic <FaCheck/></p>}
                    </div>
                </div>
            </div>
        )
    }
    return (loading ? <Loader type="TailSpin" color="#00BFFF" height={200} width={200}/> : <Details/> 

    )


}

export default PlantDetails
