import React from "react";
import "../../../App.css";
// react plugin used to create charts
// reactstrap components

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import { Helmet } from "react-helmet";
import Typekit from 'react-typekit';
import Navbar from '../Nav-Button/Navbar';
import TopNav from '../Nav-Button/TopNav';
import { useAppContext } from "../../../providers/AppProvider";


function Home() {
  const { user } = useAppContext();
    return (
      <>
      
      </>
    );
}
export default Home;