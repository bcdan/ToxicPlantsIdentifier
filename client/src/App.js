import {useState,useEffect} from "react"
import SearchBox from './components/SearchBox'
import About from './components/About'
import Contact from './components/Contact'
import Modal from './components/Modal/Modal'
import {Route,Switch,useLocation} from 'react-router-dom'



function App() {

  const [plantsDB,setPlantsDB] = useState([]);
  const [displayPlants,setDisplayedPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [plantModalID,setPlantModalID] = useState(-1);

  const usePageViews = ()=> {
    let location = useLocation();
    useEffect(() => {
      if(location.pathname==='/')
        setDisplayedPlants([]);
    }, [location]);
  }
  usePageViews();



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
      <Switch>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/'>
          <SearchBox onSearch={onSearch} plants={displayPlants} setShowModal={setShowModal} setPlantID={setPlantModalID} />
          <Modal showModal={showModal} setShowModal={setShowModal} plantID={plantModalID}/>
        </Route>
      </Switch>
  );
}


export default App;
