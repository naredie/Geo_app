import react ,{Component} from 'react';
import localidades from '../data/municipalities.json';

class BusquedaMunicipio extends Component{

    state = {
        municipios: [],
        ortofoto:null,
        poligono:null,
        municipio: null,
    };

    componentDidMount(){
        this.setState({
            municipios: localidades
        })
    }

      Buscaincidencias = () => {
        this.props.municipio(this.state.municipio);
      }

      CargaOrtofoto=()=>{
        this.setState({
            ortofoto:true
        }, function(){
            this.props.ortofoto(this.state.ortofoto);
        });
      }
    
    
      QuitarOrtofoto=()=>{
        this.setState({
            ortofoto:false
        }, function(){
            this.props.ortofoto(this.state.ortofoto);
        });
      }

      CargaPoligono=()=>{
        this.setState({
            poligono:true
        }, function(){
            this.props.poligono(this.state.poligono);
        });
        
      }
    
    
      QuitarPoligono=()=>{
        this.setState({
            poligono:false
        }, function(){
            this.props.poligono(this.state.poligono);
        });
      }

      lookupchange = (event) => {
        var municipios = this.state.municipios;

        if (event.target.value) {
            var localidad = municipios.filter(item => {
                return item.name === event.target.value
              })

            this.setState({
                municipio: localidad
            });
        }
      }


    render(){
        let municipio =  null;
        return(         
                <div className="form-group">
                  <h3>Municipio</h3>
                  <select className="form-control" id="municipio" onChange={this.lookupchange}>
                    <option value="">Selecciona un municipio</option>
                    {this.state.municipios&&
                        this.state.municipios.map((municipio,i) => {
                            return(<option key={i}>{municipio.name}</option>)
                        })
                    } 
                  </select>
                  <button className="btn btn-primary" onClick={this.Buscaincidencias}>Buscar incidencias</button>
                    
                    <hr/>
                    <h3>Cargar ruta</h3>
                    <div className="row">
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Desde"/>
                      </div>
                      <div class="col">
                        <input type="text" className="form-control" placeholder="Hasta"/>
                      </div>
                    </div>
                    <hr/>

                    <div className="row">
                    <div className="col">
                    {!this.state.ortofoto ? (
                        <button className="btn btn-info" onClick={this.CargaOrtofoto}>Cargar ortofoto IGN</button>
                        ) : (
                        <button className="btn btn-warning" onClick={this.QuitarOrtofoto} >Quitar ortofoto IGN</button>
                        )
                    }
                    </div>
                    <div className="col">
                    {!this.state.poligono ? (
                        <button className="btn btn-info" onClick={this.CargaPoligono}>Cargar capa poligonos</button>
                        ) : (
                        <button className="btn btn-warning" onClick={this.QuitarPoligono} >Quitar capa poligonos</button>
                        )
                    }
                    </div>
                  </div>
                </div>
        )
    }
}


export default BusquedaMunicipio;