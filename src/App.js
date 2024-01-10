import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Nwes from "./components/Nwes";


export default class App extends Component {
  render() {
    return (
      <div>
       
          <Navbar/>
          <Nwes pageSize = {9} country="in" />
         
      </div>
    );
  }
}

