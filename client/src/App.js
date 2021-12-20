import {useState} from "react"
import SearchBox from './components/SearchBox'
import About from './components/About'
import Contact from './components/Contact'
import Modal from './components/Modal/Modal'
import TestDetails from './components/TestDetails'
import {Route,Switch} from 'react-router-dom'

function App() {

  const [showModal, setShowModal] = useState(false);
  const [plantModalID,setPlantModalID] = useState(-1);

  return (
      <Switch>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/'>
          <div>
          <SearchBox plasetShowModal={setShowModal} setPlantID={setPlantModalID} />
        <TestDetails/>
          </div>

        </Route>
      </Switch>
  );
}


export default App;
