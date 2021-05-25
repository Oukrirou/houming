import './App.css';
import React from 'react'
import Etudiant from './Compenents/etudiant'
import Nav from './Compenents/navbar'
import Profile from './Compenents/profile'
import Addbatiment from './Compenents/addbatiment'
import Sidbar from './Compenents/sidbar'
import Affectation from './Compenents/affectation'
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
                <Route path="/addbatiment">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Addbatiment/>
                  </div>
                </Route> 
                <Route path="/liberer">
                  <Nav/>
                  <div className="content">
                   <Sidbar/>
                   <Affectation/>
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
