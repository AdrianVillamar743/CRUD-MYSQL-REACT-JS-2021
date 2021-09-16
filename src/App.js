import './App.css';
import Listar from "./componentes/Listar";
import Crear from "./componentes/Crear";
import Editar from "./componentes/Editar";

import { Route, BrowserRouter as Router } from "react-router-dom";
import {Link} from "react-router-dom";



function App() {
  return (
    <Router>
 <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
              <Link className="nav-item nav-link active" to="/">Inicio <span className="sr-only"></span></Link>
              <Link className="nav-item nav-link" to={"/crear"}>Crear empleado</Link>
        
          </div>
      </nav>
   
    <div className="container">
       
      <Route exact path="/" component= {Listar}></Route> 
      <Route exact path="/crear" component= {Crear}></Route> 
      <Route exact path="/editar/:emple_id" component= {Editar}></Route> 
     </div>
     </Router>
  );
}

export default App;
