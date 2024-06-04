import React from 'react';
import MyRouter from './router/index.js';
import Navbar from './components/navbar.js';
function App() {
  return (
    <div className="App">
      <Navbar />
      <MyRouter />
    </div>
  );
}

export default App;
