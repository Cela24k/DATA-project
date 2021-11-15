import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";

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
      <div className="La-mimmo-Arte">
        Ciao Mimmo buonasera! canagliaa
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Work in progress.
        </p>
        <a
          className="App-link"
          href="https://www.instagram.com/alessandroceladon_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cliccami
        </a>
      </header>
    </div>
  );
}

export default App;
