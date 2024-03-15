import FirstPage from './components/firstpage.js'; // Importing FirstPage component
import Question1 from './pages/question1.js';
import Question2 from './pages/question2.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Question1 /> 
      </header>
    </div>
  );
}

export default App;
