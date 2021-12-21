import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import {Route,Switch} from 'react-router-dom'

function App() {

  return (
      <Switch>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/' component={Home}/>
      </Switch>
  );
}


export default App;
