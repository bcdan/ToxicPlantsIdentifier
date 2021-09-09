import { FaSkull, FaCheck } from 'react-icons/fa'

const Plant = ({plant}) => {
    return (
        <div className={'plant'}>
            <h3>
                {plant.Name}
                {plant.Toxic? <FaSkull style={{color:'red'}}/> : <FaCheck style={{color:'green'}} />}
            </h3>
        </div>
    )
}

export default Plant
