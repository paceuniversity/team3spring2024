import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login';
import Signup from './pages/signup';
import Question1 from './pages/question1';
import Question2 from './pages/question2';
import Question3 from './pages/question3';
import Question4 from './pages/question4';
import Calendar from './pages/calendar';
import Diary from './pages/diary';
import Meditation from './pages/meditation';
import Settings from './pages/settings';
import PeriodInfo from './pages/periodInfo';




import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "question1",
    element: <Question1 />,
  },
  {
    path: "question2",
    element: <Question2 />,
  },
  {
    path: "question3",
    element: <Question3 />,
  },
  {
    path: "question4",
    element: <Question4 />,
  },
  {
    path: "calendar",
    element: <Calendar/>,
  },
  {
    path: "diary",
    element: <Diary/>,
  },
  {
    path: "meditation",
    element: <Meditation/>,
  },
  {
    path: "settings",
    element: <Settings/>,
  },
  {
    path: "periodInfo",
    element: <PeriodInfo/>,
  },
    
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
