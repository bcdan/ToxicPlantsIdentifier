import Plants from './Plants'
import {FaSearch } from 'react-icons/fa'
import {useSelector} from 'react-redux'
import usePlantsFetch from '../hooks/usePlantsFetch'
import {useState} from 'react'

const SearchBox = ({setShowModal,setPlantID}) => {
    const plants = useSelector((state)=>state.fetchedPlants.plants);
    const [filteredPlants,setFilteredPlants] = useState([]);
    usePlantsFetch();

    const onSearch = async(e)=>{
        const specialPatten = /[.*+?^${}()|[\]\\]/g;
        let matches = plants.filter(plant=>{
            const input = e.target.value.replace(specialPatten, '\\$&');
            const regex = new RegExp(`^${input}|${input}$`,'gi'); 
            return plant.Name.match(regex);
        });
        if(e.target.value.length === 0)
          matches=[];
        setFilteredPlants(matches);
      }


    return (
            <div className="wrapper">
                <div className="search-input">
                    <input type="text" placeholder="Search..." onChange={onSearch}/>
                    <div className="autocomplete-box">
                    <Plants plants={filteredPlants} setShowModal={setShowModal} setPlantID={setPlantID}/>
                    </div>
                    <div className="icon"><FaSearch/></div>
                </div>
            </div>

    )
}

export default SearchBox
