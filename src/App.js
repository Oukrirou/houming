import './App.css';
import React from 'react'

import Login from './Compenents/login'

import {BrowserRouter as Router , Switch, Route} from 'react-router-dom'

function App() {
  return (
     <Router>
     <Switch>
          <Route path="/login">
             <Login/>
          </Route>

     </Switch>
     
     </Router>
   //   <Router>
   //              {/* <Liberer/> */}
   //              {/* <Nav/>
   //              <div className="content">
   //                 <Sidbar/>
   //                 <Profile/>
   //              </div> */}
   //              <Login/>
                
                
   //   </Router>
    
  );
}

export default App;
