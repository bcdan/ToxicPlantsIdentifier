import {useState,useEffect} from "react"
import Plants from './components/Plants'
import PlantDetails from './components/PlantDetails'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {
  
  const [plantsDB,setPlantsDB] = useState([]);
  const [displayPlants,setDisplayedPlants] = useState([]);

  useEffect(()=>{
    const getPlants = async()=>{
      const plantsFromServer = await fetchPlants();
      setPlantsDB(plantsFromServer);
    }
    getPlants();
  },[]);



  const fetchPlants = async()=>{
      const res = await fetch('/api/plants');
      const data = await res.json();
      return data;
  }

  const onSearch = async(e)=>{
    let matches = plantsDB.filter(plant=>{
      const regex = new RegExp(`^${e.target.value}|${e.target.value}$`,'gi');
      return plant.Name.match(regex);
    });
    if(e.target.value.length === 0)
      matches=[];
    setDisplayedPlants(matches);
  }
  

  return (
    <Router>
      <Switch>
      <Route exact path='/'>
    <div className="container">
      <h2>Search for plants</h2>
      <div className="form-group">
            <input type="text" className="form-control" id="search" placeholder="Enter plant name" onChange={onSearch}/>
        </div>
      <Plants plants={displayPlants}/>
    </div>
    </Route>
    <Route  path='/plants/:id' children={<PlantDetails/>}/>
    </Switch>
    </Router>

  );
}


export default App;