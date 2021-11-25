import Plants from './Plants'
import {FaSearch } from 'react-icons/fa'

const SearchBox = ({plants,onSearch,setShowModal,setPlantID}) => {

    return (
            <div className="wrapper">
                <div className="search-input">
                    <input type="text" placeholder="Search..." onChange={onSearch}/>
                    <div className="autocomplete-box">
                    <Plants plants={plants} setShowModal={setShowModal} setPlantID={setPlantID}/>
                    </div>
                    <div className="icon"><FaSearch/></div>
                </div>
            </div>

    )
}

export default SearchBox

