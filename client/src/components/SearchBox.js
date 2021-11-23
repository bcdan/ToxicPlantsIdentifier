import Plants from './Plants'
const SearchBox = ({plants,onSearch}) => {
    return (
        <div className="container">
            <div className="container-search">
                <div className="form-group">
                 <input type="text" className="form-control" id="search" placeholder="Search For A Plant ..." onChange={onSearch}/>
                </div>
                <div className="search-results">
                    <Plants plants={plants}/>
                </div>
            </div>
        </div>

    )
}

export default SearchBox
