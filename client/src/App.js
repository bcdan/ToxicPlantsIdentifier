import {useState,useEffect} from "react"
import SearchBox from './components/SearchBox'
import PlantDetails from './components/PlantDetails'
import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'
import About from './components/About'
import Contact from './components/Contact'
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
      <Navbar/>
      <Switch>
      <Route exact path='/about' component={About}/>
      <Route exact path='/contact' component={Contact}/>
      <Route exact path='/'>
      <SearchBox onSearch={onSearch} plants={displayPlants}/>
    </Route>
    <Route  path='/plants/:id' children={<PlantDetails/>}/>
    </Switch>
    <Footer/>
    </Router>
    

  );
}


export default App;