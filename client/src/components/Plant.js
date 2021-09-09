import { FaSkull, FaCheck } from 'react-icons/fa'
import {Link} from 'react-router-dom'
const Plant = ({plant}) => {
    return (
        <div className={'plant'}>
            <h3>
                {plant.Name}
                {plant.Toxic? <FaSkull style={{color:'red'}}/> : <FaCheck style={{color:'green'}} />}
            </h3>
            <Link to={`/plants/${plant.ID}`} >More details</Link>
        </div>
    )
}

export default Plant
