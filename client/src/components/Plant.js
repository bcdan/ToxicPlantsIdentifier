import { FaSkull, FaCheck } from 'react-icons/fa'
import {Link} from 'react-router-dom'
const Plant = ({plant}) => {
    return (
        <div className="plant">
            <Link to={`/plants/${plant.ID}`} >
            <h3>
                {plant.Name}
                {plant.Toxic? <FaSkull style={{color:'red'}}/> : <FaCheck style={{color:'green'}} />}
            </h3>
            </Link>
        </div>
    )
}

export default Plant
