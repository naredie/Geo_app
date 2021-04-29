import react ,{Component} from 'react';
import incidencias from '../data/incidencias.json';

class Incidencias extends Component{

    //static readyToUpdate = true;

    state= {
        incidenciasglobal: incidencias,
        incidencias: [],
        municipio: null,
    };



    componentDidUpdate (prevProps, prevState) {  
        if (prevProps.municipio !== this.props.municipio) {
        var municipio = this.props.municipio;
        if (municipio ) { 
            this.leerincidencias();
          }

        }
    }
    
    leerincidencias=(e)=>{
        //TODO: EN EL FUTURO SE HARA UNA  BUSQUEDA EN LA BASE DE DATOS DIRECTAMENTE 
        let incidenciasglobal = this.state.incidenciasglobal;

        let incidencias = incidenciasglobal.filter(item => {
            return item.localidad.toLowerCase() === this.props.municipio[0].name.toLowerCase();
          })

        this.setState({
            incidencias: incidencias,
        }); 
    }

    render(){
        return(         
            <table className="table table-striped">
            <thead>
              <tr>
                <th>Revisado</th>
                <th>ID</th>
                <th>Name</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
             
                {this.state.incidencias&&
                    this.state.incidencias.map((inci,i)=>{
                        return(
                            <tr key={i}>
                                {inci.revisado == true ?(
                                    <th><input type="checkbox" className="form-check-input" disabled checked/></th>
                                ) : (
                                    <th><input type="checkbox" className="form-check-input" /></th>
                                )}
                                <th>{inci.id}</th>
                                <th>{inci.nombre}</th>
                                {inci.tipo == 'Urgente' ? (
                                    <th className="incidenciaUrgente">{inci.tipo}</th>
                                ) : (
                                    <th className="incidenciaModerada">{inci.tipo}</th>
                                )}
                            </tr>
                      )
                    })
                }
            </tbody>
          </table> 
        )
    }
}

export default Incidencias;