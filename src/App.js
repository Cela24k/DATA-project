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

function App() {
  return (
    <div className="App">
      <div style={floatingText}>Ciao.</div> 
      <ThreeScene/>
    </div>
    
  );
}

const floatingText = {
  color: '#f3f3f3',
  position:'absolute',
  'zIndex': 1,
  left: '120px',
  top: '200px',
  width:'100px', 
  height:'20px',
  fontSize:'600%'
}
export default App;
