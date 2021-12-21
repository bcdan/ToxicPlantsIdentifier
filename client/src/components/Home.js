import SearchBox from './SearchBox'
import PlantDetails from './PlantDetails'
import {useSelector} from 'react-redux'

const Home = () => {
    const searchedPlantID = useSelector((state)=>state.searchBox.searchedPlantID);
    return (
        <div className="home-wrapper">
            <SearchBox/>
            <PlantDetails plantID={searchedPlantID}/>
        </div>
    )
}

export default Home
