import  {Component} from 'react';
import { Map, TileLayer,WMSTileLayer,Marker,Popup, GeoJSON  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import geoData from './../backend/data.json'

class Mapa extends Component{

    state = {
        ortofoto:false,
        poligono:false,
        centro:null,
        mapRef: null,
        markersData:
        {
          title: 'testing point',
          latLng: {
            lat: 39.469, 
            lng: -0.377,
          }
        }
      }

      componentWillMount(prevProps, prevState) {
    
      }

      componentDidMount() {
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        //var map = this.map = L.map('custommap');
    }

      componentDidUpdate (prevProps, prevState) {  
        if (prevProps.municipio !== this.props.municipio) {
          var municipio = this.props.municipio;
          if(municipio !== null && municipio !== undefined  && municipio.length > 0)
          {
            this.setNewcenter(municipio);
          }
        }
      }

      setNewcenter=(municipio)=>{
              this.setState({
                centro: [municipio[0].coordinates.latitud, municipio[0].coordinates.longitud]
              },function() { 
                console.log("nuevo centro es: " + this.state.centro);
            }
          );
      }


      CargaOrtofoto() {
        this.setState({
            ortofoto:true
          });
      }

      QuitarOrtofoto() {
        this.setState({
            ortofoto:false
          });
      }
      
      CargaPoligono() {
        this.setState({
            poligono:true
          });
      }

      QuitarPoligono() {
        this.setState({
            poligono:false
          });
      }

    render(){

        const styleMap = { "width": "100%", "height": "60vh" }

        return(
          <div id="map">
             <Map id="custommap"
               style={styleMap}
               center={this.props.Centro}
               zoom={this.props.Zoom}
               className="map"
               ref={m => { this.leafletMap = m; }}
              >
              

               <TileLayer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               attribution="&copy;Recuenco  <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
               />


           {this.state.ortofoto &&

               <WMSTileLayer
               layers={'OI.OrthoimageCoverage'}
               attribution='&copy; <a href="http://osm.org/copyright">IGN</a>'
               url="http://www.ign.es/wms-inspire/pnoa-ma?"
               />
           }

           {/* leer un geojson */}
           {this.state.poligono &&
           <GeoJSON
           data={geoData.features}
           >
           </GeoJSON>
          }


              {/* adding a point */}
              <Marker position={this.state.markersData.latLng} >
               <Popup>
               {this.state.markersData.title}
               </Popup>
               </Marker>

           </Map>

         </div>
        );
    }
}


export default Mapa;