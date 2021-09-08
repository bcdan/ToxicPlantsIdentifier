import {useState,useEffect} from "react"
import './App.css';
import Plants from './components/plants/Plants'

function App() {

  const [plants,setPlants] = useState([]);


  useEffect(()=>{
    const getPlants = async()=>{
      const plantsFromServer = await fetchPlants();
      setPlants(plantsFromServer);
    }
    getPlants();
  },[]);



  const fetchPlants = async()=>{
      const res = await fetch('/api/plants');
      const data = await res.json();
      return data;
  }



  return (
    <div className="App">
      <Plants/>
    </div>
  );
}

export default App;
