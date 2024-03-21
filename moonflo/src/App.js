import FirstPage from './pages/firstpage.js'; // Importing FirstPage component
import Question1 from './pages/question1.js';
import Question2 from './pages/question2.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';

import './App.css';
import { First } from 'react-bootstrap/esm/PageItem.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FirstPage/>
      </header>
    </div>
  );
}

export default App;
