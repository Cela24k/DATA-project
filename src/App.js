import { initializeApp } from "firebase/app"
import React from "react"
import "./App.css"
import ThreeScene from "./Components/ThreeScene"
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
      <div style={banner}>
        <img src='media/data.png' alt="non caricata" width="188" height="80" ></img>
        <div style={sections}>
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
        <div style={sections}>
          <img src='media/02.png' alt="non caricata" width="30" height="30" ></img>
        </div>
      </div>
      <ThreeScene />
    </div>

  );
}

const link = {
  color: "white",
  textDecoration: "none",
  marginRight:"1rem",
}

const alignRight = {
  textAlign: "right"
}
//da guardare
const floatingText = {
  color: '#f3f3f3',
  position: 'absolute',
  'zIndex': 1,
  left: '7rem',
  top: '3rem',
  width: "fit-content",
  height: 'fit-content',

}

const lista = {
  display:"flex",
  listStyle:"none", 
  padding:"0rem"
}
const sections = {
  color: "white",
  width: "fit-content",
  fontWeight: "lighter",
  display: "flex",
}

const banner = {
  position: 'absolute',
  'zIndex': 1,
  width: "82%",
  alignItems: "end",
  display: "flex",
  padding: "3rem",
  justifyContent: "space-evenly",

}
export default App;
