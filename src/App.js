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
import Navigation from "./Components/Navigation";
import Banner from "./Components/Banner";
import ScrollToTop from "react-scroll-to-top";

const firebaseConfig = {
  apiKey: "AIzaSyA3a1LIWTdxdfPwioq0tbsHlQxc2DIx23E",
  authDomain: "mysite-5b666.firebaseapp.com",
  projectId: "mysite-5b666",
  storageBucket: "mysite-5b666.appspot.com",
  messagingSenderId: "629817619071",
  appId: "1:629817619071:web:f2cd83999084816eb7854a"
};

const app = initializeApp(firebaseConfig);

const width = window.screen.width;

function App() {

  const [panel, setPanel] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  let handleCallback = (childData) => {
    setPanel(true);
    // document.body.scrollTo({ top: 500, behavior: 'smooth' });
    // scrollToBottom();

    setTimeout(()=>{
      if(childData)
        scrollToBottom();
      else
        scrollToTop();
    },50)
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/info' element={
          <div className="App">
            <Banner type="info" />
            <ThreeScene />
            <Info />
          </div>
        } />
        <Route path='/' element={
          <div className="App">
            <Banner type="app" />
            <ThreeScene />
            <Navigation parentCallback={handleCallback} />
            {panel === false ? null :
              <div style={{ width: "100%", height: "70%", backgroundColor: "black" }}>
                ciao
              </div>
            }
          </div>}
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
