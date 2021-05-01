import './App.css';
import React from 'react'
import Etudiant from './Compenents/etudiant'
import Nav from './Compenents/navbar'
import Profile from './Compenents/profile'
import Sidbar from './Compenents/sidbar'
import {BrowserRouter as Router,Switch ,Route} from 'react-router-dom'

function App() {
  return (
     <Router>
          <Switch>
                <Route path="/etudiant">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Etudiant/>
                  </div>
                </Route> 
                <Route path="/profiter/:id">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Profile/>
                  </div>
                </Route> 
              
          </Switch>
     </Router>
  );
}

export default App;
