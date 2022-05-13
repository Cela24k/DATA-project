import { initializeApp } from "firebase/app"
import React from "react"
import "./App.css"
import ThreeScene from "./Components/ThreeScene"
import Music from "./Components/Music"
import Ticker from "./Components/Ticker"
import Info from "./Components/Info"

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
      <Info open={state.infoOpened} />
      <Banner />
      <ThreeScene />

      <div className="greetings">
        <div style={{ marginTop: "100px" }}></div>
        You have entered DATA,<br></br>
        your personal space
        <Ticker />
      </div>

      {/*<Music />*/}

    </div>

  );
}

function Banner() {
  return (  
    <div className="banner">
    <div className="logo"></div>
    <div className="section">
        <nav>
          <ul className="lista" style={{padding:"inherit"}}>
            <li><a className="link" href="soundtrack">DT soundtrack</a></li>
            <li> <a className="link" href="nfts">NFTs</a></li>
            <li> <a className="link" href="clothing">Clothing</a></li>
            <li> <a className="link" href="work">Work</a></li>
            <li> <a className="link" href="info">Info</a></li>
          </ul>
        </nav>
      </div>
      <div style={logo}>
        <img src='media/02.png' alt="logo" width="40" height="40" ></img>
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
