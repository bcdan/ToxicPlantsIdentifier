import {useState,useEffect} from "react"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaSkull ,FaShieldAlt} from 'react-icons/fa';
import './plantDetails.css';
import axios from "axios";
import {motion} from 'framer-motion'


const cardAnimationContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const cardItemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

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
                {loading ? 
                <Skeleton style={{
                    borderTopRightRadius:'18px',
                    borderTopLeftRadius:'18px',
                    height:'100%',
                    paddingTop:'5px'
                }}/> 
                :
                <div className="card-img" style={{
                    background:`url('images/plant_${plantID}.jpg')`  ,
                    backgroundSize:'cover',
                    borderTopRightRadius:'18px',
                    borderTopLeftRadius:'18px',
                    gridArea:'image'
                    }} >
                    <div className={plant.toxic? "status-badge badge-toxic" : "status-badge badge-safe"}>
                    {plant.toxic ? 
                        <div className="toxicity-indicator">
                            <FaSkull/>
                            <span>Toxic</span> 
                        </div>
                                 :
                        <div className="toxicity-indicator">
                            <FaShieldAlt/>
                            <span>Safe</span>
                        </div>
                    }
                    </div >
                </div>
                }
                <motion.div
                 className="card-text"
                 variants={cardAnimationContainer}
                 initial="hidden"
                 animate="visible"
                >
                <h2>{loading? <Skeleton style={{width:'80%'}} /> : plant.name }</h2>
                {loading ? <Skeleton count={7} style={{width:'60%',marginTop:'5px'}}/> :
                    <>
                    <motion.h5 variants={cardItemAnimation}>Additional Names:</motion.h5> <motion.p variants={cardItemAnimation}>{plant.additionalNames || "None" }</motion.p>
                    <motion.h5 variants={cardItemAnimation}>Scientific Name:</motion.h5> <motion.p variants={cardItemAnimation}>{plant.scienceName }</motion.p>
                    <motion.h5 variants={cardItemAnimation}>Family:</motion.h5><motion.p variants={cardItemAnimation}>{plant.family || "Unknown"}</motion.p>
                    {plant.toxicity? <><motion.h5 variants={cardItemAnimation}>Toxic to:</motion.h5><motion.p variants={cardItemAnimation}>{plant.toxicity}</motion.p></> : null}
                    {plant.safe? <><motion.h5 variants={cardItemAnimation}>Safe for:</motion.h5><motion.p variants={cardItemAnimation}>{plant.safe}</motion.p></> : null}
                    </>
                }
                </motion.div>
                <div className="card-bottom"/>
            </div>
        )
    }
    return (<Details/> )


}

export default PlantDetails
