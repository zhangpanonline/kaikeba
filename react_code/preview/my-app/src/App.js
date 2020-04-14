import React from 'react';
import './App.css';
import ClassComponent from './pages/ClassComponent'
import FnComponent from './pages/FnComponent'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <ClassComponent />
        <FnComponent />
      </div>
    </div>
  );
}

export default App;
