import {useDispatch,useSelector} from 'react-redux'
import Highlighter from "react-highlight-words";
import {setSearchBoxStatus,setSearchPlantID} from '../features/search'

const Plant = ({plant}) => {
  const searchTerm = useSelector((state)=>state.searchBox.searchTerm);
  const dispatch = useDispatch();

  const handleClickedPlant=()=>{
    dispatch(setSearchPlantID(plant.ID));
   dispatch(setSearchBoxStatus(false));
  }
      return (
        <div className="plant">
                <li onClick={handleClickedPlant}>
                  <Highlighter
                    highlightClassName="plant-highlight"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={plant.name}
                  />
                </li>
        </div>

    )
}

export default Plant
