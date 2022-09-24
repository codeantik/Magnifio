import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function App() {

  // const fetchData = async () => {
  //   axios.get('http://34.223.255.47/retrieve')
  //       .then(res => {
  //         console.log(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

    return (
      <div className="homepage-container">
        <Helmet>
          <title>Magnif.io | Home</title>
        </Helmet>
        <Navbar />
      </div>
    );
  }
