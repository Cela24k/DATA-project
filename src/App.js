import { initializeApp } from "firebase/app"
import React from "react"
import "./App.css"
import ThreeScene from "./Components/ThreeScene"
import Music from "./Components/Music"
import Ticker from "./Components/Ticker"
/*
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, animated } from 'react-spring'
import Main from "./Components/Main"

*/

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
      <div className="banner">
        <img src='media/data.png' alt="data" width="188" height="80" ></img>
        <div className="section">
          <nav>
            <ul style={lista}>
              <li><a style={link} href="soundtrack">DT soundtrack</a></li>
              <li> <a style={link} href="nfts">NFTs</a></li>
              <li> <a style={link} href="clothing">Clothing</a></li>
              <li> <a style={link} href="work">Work</a></li>
              <li> <a style={link} href="info">Info</a></li>
            </ul>
          </nav>
        </div>
        <div style={logo}>  
          <img src='media/02.png' alt="logo" width="30" height="30" ></img>
        </div>
      </div>

      <ThreeScene />
      {/*<ThreeScene />*/}
      
      <div className="greetings">
        <div style={{marginTop:"100px"}}></div>
        You have entered DATA,<br></br>
        your personal space

        {/*<div className="ticker"> NOW PLAYING TRACK #1 
        NOW PLAYING TRACK #1
        NOW PLAYING TRACK #1
        NOW PLAYING TRACK #1
        NOW PLAYING TRACK #1
        NOW PLAYING TRACK #1
        NOW PLAYING TRACK #1
        NOW PLAYING TRACK #1
        NOW PLAYING TRACK #1

  </div>*/}
        <Ticker/>
      </div>
    
      {/*<Music />*/}

    </div>

  );
}

const greetings = {
  top: "700px",
  position: "absolute",
  color: "white",
  width: "100%",
  whiteSpace: "pre-line",
  fontSize: "42px",
  textAlign: "center",
  paddingTop: "15rem",
  paddingBottom: "25rem"
}

const link = {
  color: "white",
  textDecoration: "none",
  marginRight: "0.5rem",
  marginLeft:"0.5rem"
}

const lista = {
  display: "flex",
  listStyle: "none",
}

const logo = {
  display: "flex",
  listStyle: "none",
  width: "188px",
  padding: "0rem"
}

const banner = {
  position: 'absolute',
  'zIndex': 1,
  width:'100vw',
  //width: "92%",
  //height:"200%",
  alignItems: "end",
  display: "flex",
  padding: "3rem",
  justifyContent: "space-evenly",

}
export default App;
