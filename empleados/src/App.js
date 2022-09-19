
import './App.css';
import {Home} from './Home';
import { Areas} from './Areas';
import {Empleados} from './Empleados';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        React Empleados
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/areas">
             Áreas
            </NavLink>
          </li>
          <li className="nav-item m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/empleados">
             Empleados
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/areas' element={<Areas/>}/>
        <Route path='/empleados' element={<Empleados/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
