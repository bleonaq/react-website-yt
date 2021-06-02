
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router , Switch ,Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Students from './components/pages/Students';
import List from './components/pages/List';
import Department from './components/pages/Department';
// import Signup from './components/pages/SignUp';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Container from 'react-bootstrap/Container'


function App() {
  return (
 <>
   <Container maxWidth="sm">
     <Switch>
      {/* < Route path="\signup" exact component={Singup}/> */}
      < Route path="\login" exact component={Login}/>
      <Route path="\SignUp" exact component={SignUp}/> 
     </Switch>
   </Container>
   <Router>
     <Navbar />
     <Switch>
       <Route path='/' exact component=
       {Home} />
       <Route path='/students' component={Students} />
       <Route path='/List' component={List} />
       <Route path='/Department' component={Department} />
       {/* <Route path='/SignUp' component={Signup} /> */}
       <Route path='/SignUp' component={SignUp} />
       <Route path="/login" component={Login}></Route>
     </Switch>
   </Router>
   </>
  );
}

export default App;
