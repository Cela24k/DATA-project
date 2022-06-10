import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import ThreeScene from "./Components/ThreeScene";
import Info from "./Components/Info";
import { sceneText } from "./Components/ThreeScene";
import Navigation from "./Components/Navigation";
import Banner from "./Components/Banner";

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
    <BrowserRouter>
      <Routes>
        <Route path='/info' element={<Info />} />
        <Route path='/' element={
          <div className="App">
            <Banner type="app"/>
            <ThreeScene />
            <Navigation />
          </div>}
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
