import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link,Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
 
import TodoList from './components/TodoList';
import SignUp from './components/SignUp';

function App() {
  const location = useLocation();
  const hideNavPages = ["/login", "/signUp", "/todos"];
  return (
    <div className="App">
      {/* Conditionally render the nav /*/}
      {!hideNavPages.includes(location.pathname) && (
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signUp">SignUp</Link>
            </li>
            <li>
              <Link to="/todos">Todo List</Link>
            </li>
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/signUp" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;