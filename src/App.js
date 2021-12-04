import { initializeApp } from "firebase/app"

import React from "react"
import "./App.css"
import Modello from "./Components/Modello"; 
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

//TODO mettere grassetto

function App() {
  return (
    <div className="App">
      <div style={floatingText}>
        
        <h1>Data </h1>
        <a href="work" style={link}>Work</a>
        <b style ={link}>/</b>
        <a href="info" style={link}>Info</a>
        <b style ={link}>/</b>
        <a href="contact" style={link}>Contact</a>
        
      </div> 
         

      
      <ThreeScene/>
    </div>
    
  );
}

const link = {
  "color":"white",
  "text-decoration": "none",
  fontSize:"40px"
}
const floatingText = {
  color: '#f3f3f3',
  position:'absolute',
  'zIndex': 1,
  left: '30px',
  top: '30px',
  width:'100px', 
  height:'20px',
  fontSize:'24px',
  "line-height":'0.2'
}
const bottomText = {
  color: '#f3f3f3',
  position:'absolute',
  'zIndex': 1,
  left: '30px',
  top: '60px',
  fontSize:'24px%'

}
export default App;
