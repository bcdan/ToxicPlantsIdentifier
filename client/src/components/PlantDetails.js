import {useState,useEffect} from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaSkullCrossbones ,FaShieldAlt} from 'react-icons/fa';
import './plantDetails.css';
import axios from "axios";
import {motion} from 'framer-motion'


const PlantDetails = ({plantID}) => {
    const [plant,setPlant] = useState([]);
    const [loading,setLoading] = useState(true);


    useEffect(() => {
        const getPlantDetails = async()=>{
            setLoading(true);
            const response = await axios
                .get(`/api/plants/${plantID}`)
                .catch(
                    (err) => {console.log(err)});
            setPlant(response.data);
            setLoading(false);
          }
          getPlantDetails();
    },[plantID]);



    const Details = ()=>{
        return (
            <div className="plant-card" >
                {loading ? <Skeleton style={{
                                        borderTopRightRadius:'15px',
                                        borderTopLeftRadius:'15px',
                                        height:'100%',
                                        paddingTop:'5px'
                                    }}/> 
                                    :
                <div className="card-img" style={{
                    background:`url(${plant.img})`  ,
                    backgroundSize:'cover',
                    borderTopRightRadius:'15px',
                    borderTopLeftRadius:'15px',
                    gridArea:'image'
                    }} >
                    <div className={plant.Toxic? "ribbon red" : "ribbon"}>
                        <span>
                        {plant.Toxic ? 
                            <p
                            >
                            Toxic 
                            </p>
                                 :
                            <motion.p>
                            Not Toxic
                            </motion.p>}
                        </span>
                    </div>
                </div>
                }
                <div className="card-text">
                    <h2>{loading? <Skeleton /> : plant.Name }</h2>
                {loading ? <Skeleton count={6} style={{marginTop:'5px'}}/> :
                    <>
                    <p><strong>Additional Names:</strong> {plant.additionalNames }</p>
                    <p><strong>Scientific Name:</strong> {plant.scienceName }</p>
                    <p><strong>Family:</strong> {plant.family}</p>
                    </>
                }
                </div>
                <div className={loading ? "card-toxicity" :plant.Toxic? "card-toxicity toxic" : "card-toxicity not-toxic" }>
                    <div className="toxicity">
                        {loading ?  <Skeleton/> : plant.Toxic ? <FaSkullCrossbones/> : <FaShieldAlt/>}
                    </div>
                </div>
            </div>
        )
    }
    return (<Details/> )


}

export default PlantDetails
