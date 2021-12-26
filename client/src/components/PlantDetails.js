import {useState,useEffect,useRef} from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaSkull ,FaShieldAlt} from 'react-icons/fa';
import './plantDetails.css';
import axios from "axios";
import {motion} from 'framer-motion'


const PlantDetails = ({plantID}) => {
    const [plant,setPlant] = useState([]);
    const [loading,setLoading] = useState(true);
    const constraintsRef = useRef(null)

    useEffect(() => {
        const getPlantDetails = async()=>{
            setLoading(true);
            const response = await axios
                .get(`/api/plants/${plantID}`)
                .catch(
                    (err) => {console.log(err)});
            setPlant(response.data);
            setLoading(false);
            console.log(response.data);
          }
          getPlantDetails();
    },[plantID]);



    const Details = ()=>{
        return (
            <motion.div ref={constraintsRef}div className="plant-card" >
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
                    <motion.div drag dragConstraints={constraintsRef} className={plant.Toxic? "status-badge badge-toxic" : "status-badge badge-safe"}>
                    {plant.Toxic ? 
                        <div className="toxicity-indicator">
                            Toxic 
                            <FaSkull/>
                        </div>
                                 :
                        <div className="toxicity-indicator">
                            Safe
                            <FaShieldAlt/>
                        </div>
                    }
                    </motion.div >
                </div>
                }
                <div className="card-text">
                    <h2>{loading? <Skeleton /> : plant.Name }</h2>
                {loading ? <Skeleton count={6} style={{marginTop:'5px'}}/> :
                    <>
                    <h5>Additional Names:</h5> <p>{plant.additionalNames || "None" }</p>
                    <h5>Scientific Name:</h5> <p>{plant.scienceName }</p>
                    <h5>Family:</h5><p>{plant.family || "Unknown"}</p>
                    {plant.toxicity? <><h5>Toxic to:</h5><p>{plant.toxicity}</p></> : null}
                    {plant.safe? <><h5>Safe for:</h5><p>{plant.safe}</p></> : null}
                    </>
                }
                </div>
                <div className="card-bottom">
                </div>
            </motion.div>
        )
    }
    return (<Details/> )


}

export default PlantDetails
