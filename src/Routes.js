import { React, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./App.css";
import { Redirect } from "react-router-dom";
// import Navbar from './components/pages/Nav-Button/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import City from "./components/pages/CityCrud/City";
import Main from "./components/pages/Dashboard/Main";
import Navbar from "./components/pages/Nav-Button/Navbar";
import TopNav from "./components/pages/Nav-Button/TopNav";
import SignUp from "./components/pages/Login/Register/SignUp";
import Login from "./components/pages/Login/Register/Login";
import Container from "react-bootstrap/Container";
import { useAppContext } from "./providers/AppProvider";
import CrudProvider from "./providers/CrudProvider";
import HomeProvider from "./providers/HomeProvider";
import Subject from "./components/pages/SubjectCrud/Subject";
import Professor from "./components/pages/ProfessorCrud/Professor";
import NotFound from "./components/pages/NotFound";
import Birthplace from "./components/pages/BirthplaceCrud/Birthplace";
import Student from "./components/pages/StudentCrud/Student";
import api from "./AxiosCall";
import { createHashHistory } from "history";

export default function Routes() {
  const { user, dispatch } = useAppContext();
  let roles = [];
  if (user.token != "") {
    const decoded = jwt_decode(user.token);
    if (
      Array.isArray(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      )
    ) {
      roles = [
        ...decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      ];
    } else {
      roles.push(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }
  useEffect(() => {
    const milliseconds = getSecondsFromDates(user.expiration) - 15000;
    if (user.token !== "" && milliseconds > 0) {
      const timer = setTimeout(() => {
        refreshToken();
      }, milliseconds);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const refreshToken = async () => {
    let userData = {
      userToken: user.token,
    };
    await api
      .post("/authenticate/refresh", userData)
      .then((res) => {
        dispatch({ type: "login", payload: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //     <Route path="/subject">
  //     <Subject />
  // </Route>
  // <Route path="/Birthplace">
  //     <Birthplace />
  // </Route>
  // <Route path="/Main">
  //     <Main />
  // </Route>
  // <Route path="/SignUp">
  //     <SignUp />
  // </Route>
  return (
    <>
      <Router>
      <HomeProvider>

        <Switch>
            <PrivateRoute exact path="/"></PrivateRoute>
          //#region Admin Route
          <AdminPrivateRoute exact path="/Student">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                    <CrudProvider>
                      <Student />
                    </CrudProvider>
                </div>
              </div>
            </div>
          </AdminPrivateRoute>
          {/* <AdminPrivateRoute exact path="/">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                    <CrudProvider>
                      <Home />
                    </CrudProvider>
                </div>
              </div>
            </div>
          </AdminPrivateRoute> */}
          <AdminPrivateRoute exact path="/Main">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                    <CrudProvider>
                      <Home />
                    </CrudProvider>
                </div>
              </div>
            </div>
          </AdminPrivateRoute>
          <AdminPrivateRoute exact path="/Professor">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                    <CrudProvider>
                      <Professor />
                    </CrudProvider>
                </div>
              </div>
            </div>
          </AdminPrivateRoute>
          <AdminPrivateRoute exact path="/Subject">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                    <CrudProvider>
                      <Subject />
                    </CrudProvider>
                </div>
              </div>
            </div>
          </AdminPrivateRoute>
          <AdminPrivateRoute exact path="/City">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                    <CrudProvider>
                      <City />
                    </CrudProvider>
                </div>
              </div>
            </div>
          </AdminPrivateRoute>
          <AdminPrivateRoute exact path="/Birthplace">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                    <CrudProvider>
                      <Birthplace />
                    </CrudProvider>
                </div>
              </div>
            </div>
          </AdminPrivateRoute>
          //#endregion 
          
          //#region Student Route
         {/* <StudentPrivateRoute exact path="/">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                  <HomeProvider>
                    <CrudProvider>
                      <Home />
                    </CrudProvider>
                  </HomeProvider>
                </div>
              </div>
            </div>
          </StudentPrivateRoute> */}
          //#endregion 
          //#region Professor Route
         <ProfessorPrivateRoute path="/">
            <div id="wrapper">
              <Navbar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <TopNav />
                  <HomeProvider>
                    <CrudProvider>
                      <Home />
                    </CrudProvider>
                  </HomeProvider>
                </div>
              </div>
            </div>
          </ProfessorPrivateRoute> 
          //#endregion
        </Switch>
        </HomeProvider>
      </Router>
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { user } = useAppContext();

  return (
    <Route
      {...rest}
      render={() => (user.token !== "" ? <Home/> : <Login />)}
    />
  );
}

function AdminPrivateRoute({ children, ...rest }) {
  const { user } = useAppContext();
  let roles = [];
  if (user.token != "") {
    const decoded = jwt_decode(user.token);
    if (
      Array.isArray(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      )
    ) {
      roles = [
        ...decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      ];
    } else {
      roles.push(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }

  if (user.token !== "") {
    return (
      <Route
        {...rest}
        render={() => (roles.includes("Admin") ? children : <NotFound />)}
      />
    );
  } else {
    return (
      <Route>
        <Login />
      </Route>
    );
  }
}

function StudentPrivateRoute({ children, ...rest }) {
  const { user } = useAppContext();
  let roles = [];
  if (user.token != "") {
    const decoded = jwt_decode(user.token);
    if (
      Array.isArray(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      )
    ) {
      roles = [
        ...decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      ];
    } else {
      roles.push(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }
  console.log(roles);

  if (user.token !== "") {
    return (
      <Route
        {...rest}
        render={() => (roles.includes("Student") ? children : <NotFound />)}
      />
    );
  } else {
    return (
      <Route>
        <Login />
      </Route>
    );
  }
  //   return (
  //     <Route
  //       {...rest}
  //       render={() =>
  //         user.token !== "" && roles.includes("Student") ? children : <Login />
  //       }
  //     />
  //   );
}

function ProfessorPrivateRoute({ children, ...rest }) {
  const { user } = useAppContext();
  let roles = [];
  if (user.token != "") {
    const decoded = jwt_decode(user.token);
    if (
      Array.isArray(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      )
    ) {
      roles = [
        ...decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      ];
    } else {
      roles.push(
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }
  if (user.token !== "") {
    return (
      <Route
        {...rest}
        render={() => (roles.includes("Professor") ? children : <NotFound />)}
      />
    );
  } else {
    return (
      <Route>
        <Login />
      </Route>
    );
  }
}

function getSecondsFromDates(dateTime) {
  const fromDate = new Date(dateTime);
  const dateNow = new Date();
  const milliseconds = fromDate.getTime() - dateNow.getTime();
  return milliseconds;
}
