
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router , Switch ,Route } from
'react-router-dom';
import Home from './components/pages/Home';
import Students from './components/pages/Students';
import List from './components/pages/List';
import Department from './components/pages/Department';
import Signup from './components/pages/SignUp';

function App() {
  return (
   <>
   <Router>
     <Navbar />
     <Switch>
       <Route path='/' exact component=
       {Home} />
       <Route path='/students' component={Students} />
       <Route path='/List' component={List} />
       <Route path='/Department' component={Department} />
       <Route path='/SignUp' component={Signup} />
     </Switch>
   </Router>
   </>
  );
}

export default App;
