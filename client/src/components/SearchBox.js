import Plants from './Plants'
import {FaSearch,FaTimes} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import usePlantsFetch from '../common/hooks/usePlantsFetch'
import {setSearchBoxStatus, setSearchTerm} from '../features/search'
import {useState,useRef,useEffect} from 'react'
import {motion} from 'framer-motion'

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
        const input = e.target.value.replace(specialPatten, '\\$&');
        if(input === ""){
          clearSearchBox();
          return;
        }
        let matches = plants.filter(plant=>{
            const regex = new RegExp(`^${input}`,'gi'); 
            return plant.name.match(regex) || 
              plant?.additionalNames.some(name=>name.match(regex)) ||
              plant?.scienceName.match(regex);
        });
        if(e.target.value.length === 0)
          matches=[];
        dispatch(setSearchTerm(input))
        setFilteredPlants(matches);
      }

    useEffect(()=>{
        if(!searchBoxOpen){
          inputRef.current.value="";
        }
    },[searchBoxOpen])

    const clearSearchBox = ()=>{
      dispatch(setSearchTerm(""));
      dispatch(setSearchBoxStatus(false));
    }

    return (
            <div className="wrapper">
                <motion.div
                 className="search-input"
                 initial={{ scale: 0 }}
                 animate={{ rotate: 360, scale: 1 }}
                 transition={{
                   type: "spring",
                   stiffness: 250,
                   damping: 30
                 }}
                 >
                    <input type="text" placeholder="Search..." ref={inputRef} onChange={onSearch}/>
                    {
                    searchBoxOpen &&
                    <div className="autocomplete-box">
                    <Plants plants={filteredPlants}/>
                    </div>
                    }       
                    <div className="icon">
                      {searchBoxOpen? <FaTimes onClick={()=>clearSearchBox()}/>:<FaSearch/>}
                      </div>
                </motion.div>
            </div>

    )
}

export default SearchBox
