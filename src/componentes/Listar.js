import React from 'react';
import {Link} from "react-router-dom";
import Api from "../servicios/api";

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { datosCargados:false,
        empleados:[] }
    }

    borrarRegistros=(emple_id)=>{
        console.log(emple_id);   
       fetch (Api+"/?borrar="+emple_id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{    
              console.log  (datosRespuesta) 
              this.cargarDatos();
            })
        .catch(console)
       
    
    }




     cargarDatos(){
        fetch (Api)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{    
              console.log  (datosRespuesta) 
              this.setState({datosCargados:true,empleados:datosRespuesta})
            })
        .catch(console.log)
     }

    componentDidMount(){
       this.cargarDatos();
    }

    render() { 
         const{datosCargados,empleados}=this.state
         if(!datosCargados){
                         return(
                             <div>Cargando</div>
                         )
         }
         else{
        return ( 
            <div className="card">
              
                <div className="card-body">
               <h4>Lista de empleados</h4>
                <div align="center">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRES</th>
                        <th>APELLIDOS</th>
                        <th>ESTADOS</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empleados.map(
                            (empleado)=>(

                         
                    <tr key={empleado.emple_id}>
                        
                        <td >{empleado.emple_id}</td>
                        <td>{empleado.emple_nombre}</td>
                        <td>{empleado.emple_apellidos}</td>
                        <td>{empleado.emple_estado}</td>
                        <td>

                        <div className="btn-group" role="group" aria-label="">
                            <Link  className="btn btn-warning"
                            
                            
                            to={"/editar/"+empleado.emple_id}>
                                
                                
                                
                                Editar
                                
                                
                                </Link>


                            <button type="button" onClick={()=>this.borrarRegistros(empleado.emple_id)}
                            
                            className="btn btn-danger">Eliminar</button>
                        </div>



                        </td>
                    </tr>
                       )
                       )
                   }
                </tbody>
            </table>
            </div>
               
               </div>
               
            </div>
         );
    }
}
}
export default Listar;