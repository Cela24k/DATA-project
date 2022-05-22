import { initializeApp } from "firebase/app"
import React from "react"
import "./App.css"
import ThreeScene from "./Components/ThreeScene"
import Music from "./Components/Music"
import Ticker from "./Components/Ticker"
import Info from "./Components/Info"

const firebaseConfig = {
  apiKey: "AIzaSyA3a1LIWTdxdfPwioq0tbsHlQxc2DIx23E",
  authDomain: "mysite-5b666.firebaseapp.com",
  projectId: "mysite-5b666",
  storageBucket: "mysite-5b666.appspot.com",
  messagingSenderId: "629817619071",
  appId: "1:629817619071:web:f2cd83999084816eb7854a"
};

const app = initializeApp(firebaseConfig);

const width = window.screen.width

function App() {
  return (
    <div className="App">
      <Info open={state.infoOpened} />
      <Banner />
      <ThreeScene />
    </div>
  );
}

 //riformattare in css 

function Banner() {
  return (  
    <div className="banner">
    <div style={{display: "flex"}}>
      <div className="logo"></div>
      <div style={{color:"Grey", alignSelf:"center"}}> 
        <p style={{marginBottom:'2px'}}>Welcome to Data, our digital archive</p>
        <p style={{marginTop:'0', marginBottom:'0'}}>and personal space</p>
      </div>
    </div>
    <div style={{width:"150px"}}>

    </div>
    <div className="section">
        <nav>
          <ul className="lista" style={{padding:"inherit"}}>
            <li><a className="link" href="soundtrack">Photo </a></li>
            <li> <a className="link" href="nfts">Info</a></li>
            <li> <a style={{border: "ridge", borderRadius: "20px", paddingLeft:"10px", paddingRight:"10px" }} className="link" href="clothing">Contact</a></li>
            <li> <div style={{width:"100px", color:"grey" , textAlign: "end"}}> EN </div> </li>
          </ul>
        </nav>
      </div>
    </div>)
}

function Banner1() {
  return (
    <div>
      <div className="logo"></div>
      <div style={logo}>
        <img src='media/02.png' alt="logo" width="30" height="30" ></img>
      </div>
    </div>
  )
}

let state = {
  infoOpened: false,
}

const logo = {
  display: "flex",
  listStyle: "none",
  width: "188px",
  padding: "0rem",
  justifyContent: "center",
}

export default App;
