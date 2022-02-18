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
      <div style={floatingText}> 
        <h1>Home</h1>
        <h2>
          <a href="work" style={link} >Work</a>/
          <a href="info" style={link}>Info</a>/
          <a href="contact" style={link}>Contact</a>
        </h2>
      </div> 
      <ThreeScene/>
    </div>
    
  );
}

const link = {
  "color":"white",
  "textDecoration": "none",
}

const alignRight = {
  textAlign: "right"
}
//da guardare
const floatingText = {
  color: '#f3f3f3',
  position:'absolute',
  'zIndex': 1,
  left: '1rem',
  top: '1rem',
  width:"fit-content", 
  height:'fit-content',
  fontSize: width/80+5,
  fontWeight:'bolder',
  "lineHeight":'0.1rem'
  
}

export default App;
