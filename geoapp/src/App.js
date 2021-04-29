// import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import Mapa from './components/mapa'
import  { Component } from 'react';
import BusquedaMunicipio from './components/busquedaMunicipio'
import Incidencias from './components/incidencias'


class App extends Component {

  constructor() {
    super()
    this.state = {
      centro: [39.46975, -0.37739],
      zoom: 13,
      ortofoto:true,
      poligono:true,
      currentMunicipio: null
    };
  }

  cargarOrtofotos = (ortofoto) =>
  {
    this.setState({
      ortofoto:ortofoto,
    },function() { 
      if(this.state.ortofoto)
      {
        this.child.CargaOrtofoto();
      }
      else{
        this.child.QuitarOrtofoto();
      }
    }
    );
  }

  cargarPoligono= (Poligono) =>
  {
    this.setState({
      poligono:Poligono,
    },function() { 
      if(this.state.poligono)
      {
        this.child.CargaPoligono();
      }
      else{
        this.child.QuitarPoligono();
      }
    }
    );
  }

  Cargarincidencias = (municipio) =>
  {
    if(municipio != null && municipio != undefined  && municipio.length > 0)
    {
      this.setState({
        currentMunicipio: municipio,
        centro: municipio[0].coordinates
      });
    }
  }


  render(){
    // <BusquedaMunicipio municipio ={this.Cargarincidencias} ortofoto ={this.cargarOrtofotos}
  return (
    <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
                <h1>WPS Demo Recuenco</h1>
            </div>
          </div>
          </div>
          {/* Bloque busqueda municipio */}
          <div className="row">
            <div className="col-sm-4 col-md-2" id="busquedamunicipio">
                <BusquedaMunicipio municipio ={this.Cargarincidencias} ortofoto ={this.cargarOrtofotos}
                poligono ={this.cargarPoligono}
                ></BusquedaMunicipio>     
            </div>
          
          {/* Bloque mapa */}
          <div className="col-sm-8 col-md-10" id="mapa">
              <Mapa Centro={this.state.centro} Zoom={this.state.zoom} Ortofoto={this.state.ortofoto} municipio = {this.state.currentMunicipio}
              ref={elementmapa => { this.child = elementmapa; }}
              ></Mapa>
          </div>
          </div>
   
        {/* Bloque incidencias */}
        <div className="row" id="incidencias">
          <div className="col-12">
          <h2>Incidencias</h2>
          <div>
          <Incidencias municipio = {this.state.currentMunicipio}></Incidencias>
          </div>
          </div>
        </div>
    </div>
  );
}
}

export default App;
