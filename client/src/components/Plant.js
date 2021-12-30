import {useDispatch} from 'react-redux'
import {setSearchPlantID,setSearchBoxStatus} from '../features/search'

const Plant = ({plant}) => {
  const dispatch = useDispatch();

  const handleClickedPlant=()=>{
    dispatch(setSearchPlantID(plant.ID));
   dispatch(setSearchBoxStatus(false));
  }
      return (
        <div className="plant">
                <li onClick={handleClickedPlant}>
                {plant.name}
                </li>
        </div>

    )
}

export default Plant
