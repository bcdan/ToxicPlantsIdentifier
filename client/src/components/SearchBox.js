import Plants from './Plants'
import {FaSearch } from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import usePlantsFetch from '../common/hooks/usePlantsFetch'
import {setSearchBoxStatus} from '../features/search'
import {useState,useRef,useEffect} from 'react'

const SearchBox = () => {
    const plants = useSelector((state)=>state.fetchedPlants.plants);
    const searchBoxOpen = useSelector((state)=>state.searchBox.searchResultsStatus);
    const [filteredPlants,setFilteredPlants] = useState([]);
    const inputRef = useRef();
    const dispatch = useDispatch();
    usePlantsFetch();

    const onSearch = async(e)=>{
       dispatch(setSearchBoxStatus(true));
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

    useEffect(()=>{
        if(!searchBoxOpen)
            inputRef.current.value="";

    },[searchBoxOpen])

    return (
            <div className="wrapper">
                <div className="search-input">
                    <input type="text" placeholder="Search..." ref={inputRef} onChange={onSearch}/>
                    {
                    searchBoxOpen &&
                    <div className="autocomplete-box">
                    <Plants plants={filteredPlants}/>
                    </div>
                    }       
                    <div className="icon"><FaSearch/></div>
                </div>
            </div>

    )
}

export default SearchBox
