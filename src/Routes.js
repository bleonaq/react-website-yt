
import { React, useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import './App.css';
import { Redirect } from 'react-router-dom';
// import Navbar from './components/pages/Nav-Button/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import City from './components/pages/CityCrud/City';
import Main from './components/pages/Dashboard/Main';
import Navbar from './components/pages/Nav-Button/Navbar';
import TopNav from './components/pages/Nav-Button/TopNav';
import SignUp from './components/pages/Login/Register/SignUp';
import Login from './components/pages/Login/Register/Login';
import Container from 'react-bootstrap/Container'
import { useAppContext } from "./providers/AppProvider";
import CrudProvider from "./providers/CrudProvider";
import HomeProvider from './providers/HomeProvider';
import Subject from './components/pages/SubjectCrud/Subject'
import Professor from './components/pages/ProfessorCrud/Professor';
import Birthplace from './components/pages/BirthplaceCrud/Birthplace';
import Student from "./components/pages/StudentCrud/Student";
import api from './AxiosCall';
import { createHashHistory } from 'history'

export default function Routes() {

    const { user, dispatch } = useAppContext();
    let roles = [];
    if (user.token != "") {
        const decoded = jwt_decode(user.token);
        if (Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
            roles = [...decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]];
        } else {
            roles.push(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
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
                <Switch>
                    <StudentPrivateRoute path="/City">
                        <div id="wrapper">
                            <Navbar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <TopNav />
                                    <HomeProvider>
                                        <CrudProvider>
                                            <City />
                                        </CrudProvider>
                                    </HomeProvider>
                                </div>
                            </div>
                        </div>
                    </StudentPrivateRoute>


                    <ProfessorPrivateRoute path="/Professor">
                        <div id="wrapper">
                            <Navbar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <HomeProvider>
                                        <CrudProvider>
                                            <Professor />
                                        </CrudProvider>
                                    </HomeProvider>
                                </div>
                            </div>
                        </div>
                    </ProfessorPrivateRoute>
                    <ProfessorPrivateRoute path="/Main">
                        <div id="wrapper">
                            <Navbar />
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <HomeProvider>
                                        <CrudProvider>
                                            <Main />
                                        </CrudProvider>
                                    </HomeProvider>
                                </div>
                            </div>
                        </div>
                    </ProfessorPrivateRoute>
                </Switch>
            </Router >

        </>
    );
}


function PrivateRoute({ children, ...rest }) {
    const { user } = useAppContext();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.token !== "" ? children : <Login />
            }
        />
    );
}

function AdminPrivateRoute({ children, ...rest }) {
    const { user } = useAppContext();
    let roles = [];
    if (user.token != "") {
        const decoded = jwt_decode(user.token);
        if (Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
            roles = [...decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]];
        } else {
            roles.push(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
        }
    }
    if (user.token !== "" && (roles.includes('Admin'))) {
        return (
            <Route children>
                <Home />
            </Route>
        );
    } else {
        return (
            <Login />
        );
    }
    return null;
}

function StudentPrivateRoute({ children, ...rest }) {
    const { user } = useAppContext();
    let roles = [];
    console.log(user);
    if (user.token != "") {
        const decoded = jwt_decode(user.token);
        if (Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
            roles = [...decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]];
        } else {
            roles.push(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
        }
    }
    return (
        <Route
            {...rest}
            render={() =>
                user.token !== "" && (roles.includes('Student')) ? children : <Login />
            }
        />
    );
}

function ProfessorPrivateRoute({ children, ...rest }) {
    const { user } = useAppContext();
    let roles = [];
    if (user.token != "") {
        const decoded = jwt_decode(user.token);
        if (Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
            roles = [...decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]];
        } else {
            roles.push(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
        }
    }
    return (
        <Route
            {...rest}
            render={() =>
                user.token !== "" && (roles.includes('Professor')) ? children : <Login />
            }
        />
    );
    return null;
}

function getSecondsFromDates(dateTime) {
    const fromDate = new Date(dateTime);
    const dateNow = new Date();
    const milliseconds = fromDate.getTime() - dateNow.getTime();
    return milliseconds;
}
