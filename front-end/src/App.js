import React from 'react';
import MyRouter from './router/routes.js';
import Navbar from './components/navbar.js';
import Login from './login/Login.js';
import useToken from './login/useToken.js';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Navbar />
      <MyRouter />
    </div>
  );
}

export default App;
