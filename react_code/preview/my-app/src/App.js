import React from 'react';
import './App.css';
import ClassComponent from './pages/ClassComponent'
import FnComponent from './pages/FnComponent'
import SetStatePage from './pages/SetStatePage'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <ClassComponent />
        <FnComponent />
        <SetStatePage />
      </div>
    </div>
  );
}

export default App;
