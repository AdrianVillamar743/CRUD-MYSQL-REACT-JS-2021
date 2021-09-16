import React from 'react';
import {Link} from "react-router-dom";
import Api from "../servicios/api";
class Editar extends React.Component {
    constructor(props) {
        super(props);
      
            this.state = { datosCargados:false,

                empleado:[] }
         
    }
    cambioValor=(e)=>{
        const state=this.state.empleado;
        state[e.target.name]=e.target.value;
        this.setState({empleado:state});
    }

    enviarDatos=(e)=>{
        e.preventDefault();
        console.log("Formulario enviado");
       const{emple_id,emple_nombre,emple_apellidos}=this.state.empleado;
        var datosEnviar= {emple_id:emple_id,emple_nombre:emple_nombre,emple_apellidos:emple_apellidos}
        fetch (Api+"/?actualizar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
     .then(respuesta=>respuesta.json())
     .then((datosRespuesta)=>{    
           console.log  (datosRespuesta) ;
           this.props.history.push("/");
         })
     .catch(console.log)
     
 }


    componentDidMount(){
            fetch (Api+"/?consultar="+this.props.match.params.emple_id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{    
                
                  this.setState({
                      datosCargados:true,
                    empleado:datosRespuesta[0]
                })
                })
            .catch(console.log)
    
    
        }



    render() { 
        const{datosCargados,empleado}=this.state
         if(!datosCargados){
                         return(
                             <div>Cargando</div>
                         )
         }
         else{
        return ( <div align="left">
             <div className="card">
                 <div className="card-header">
                     Editar empleados
                 </div>
                 <div className="card-body">
                 <form onSubmit={this.enviarDatos}>
                
                <div className="form-group">
                <label htmlFor="">Clave</label>
                  <input type="text" readOnly value={empleado.emple_id} name="emple_id" id="emple_id" className="form-control" onChange={this.cambioValor} placeholder="" aria-describedby="helpId"/>
                 
                </div>
                 
                
                
                            <div className="form-group">
                              <label htmlFor="">Nombre</label>
                              <input required type="text" name="emple_nombre" value={empleado.emple_nombre}id="emple_nombre" onChange={this.cambioValor} className="form-control" placeholder="Nombre del empleado" aria-describedby="helpId"/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="">Apellido</label>
                              <input required type="text" name="emple_apellidos" value={empleado.emple_apellidos} id="emple_apellidos" onChange={this.cambioValor}  className="form-control" placeholder="Apellido del empleado" aria-describedby="helpId"/>
                            </div>
                            <br></br>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Editar empleado</button>
                                <Link type="button" className="btn btn-warning" to={"/"}>Cancelar</Link>
                            </div>


                      </form> 
                  
                  
                  
                                
                  
                  
                  </div>
                
             </div>



        </div>);
        }
    }
}

 
export default  Editar ;