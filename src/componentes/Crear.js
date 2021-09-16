import React from 'react';
import {Link} from "react-router-dom";
import Api from "../servicios/api";
class Crear extends     React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            emple_nombre:"",
            emple_apellidos:"",
            errores: []
         }
    }

verificarError(elemento){

  return this.state.errores.indexOf(elemento)!==-1;
}


    enviarDatos=(e)=>{
           e.preventDefault();
           console.log("Formulario enviado");
           const{emple_nombre,emple_apellidos}=this.state;

           var errores=[];
           if(!emple_nombre)errores.push("error_nombre");
           if(!emple_apellidos)errores.push("error_apellido");

            this.setState({errores:errores});
            if(errores.length>0) return false;



           var datosEnviar= {emple_nombre:emple_nombre,emple_apellidos:emple_apellidos}
          
           fetch (Api+"/?insertar=1",{
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

    cambioValor=(e)=>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({state,errores:[]});
    }

    render() { 
         const{
             emple_nombre,emple_apellidos
         }=this.state;



        return (
            <div align="center">
                       <div className="card">
                           <div className="card-header">
                              Empleados
                           </div>
                           <div className="card-body">
                           
                           
                        <form onSubmit={this.enviarDatos}>
                            <div className="form-group">
                              <label htmlFor="">Nombre</label>
                              <input  type="text" name="emple_nombre" value={emple_nombre}id="emple_nombre" onChange={this.cambioValor} className={((this.verificarError("error_nombre"))  ? "is-invalid":""    )+" form-control"} placeholder="Nombre del empleado" aria-describedby="helpId"/>
                              <small className="invalid-feedback">Error nombre</small>
                            </div>
                            <div className="form-group">
                              <label htmlFor="">Apellido</label>
                              <input  type="text" name="emple_apellidos" value={emple_apellidos} id="emple_apellidos" onChange={this.cambioValor}  className={((this.verificarError("error_apellido"))  ? "is-invalid":""    )+" form-control"} placeholder="Apellido del empleado" aria-describedby="helpId"/>
                              <small className="invalid-feedback">Error nombre</small>
                            </div>
                            <br></br>
                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Agregar nuevo empleado</button>
                                <Link type="button" className="btn btn-warning" to={"/"}>Cancelar</Link>
                            </div>


                      </form> 
                           
                           
                           </div>
                           
                       </div>
            </div>
         );
    }
}
 
export default Crear; 