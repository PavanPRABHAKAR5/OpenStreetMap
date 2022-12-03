import React from 'react'

import osm from './osm-provider';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class OSMap extends React.Component {
    constructor() {
        super();
        this.state = {
            markers: [[13.198748, 77.748823]],
        };
    }

    addMarker = (e) => {
        const { markers } = this.state;
        // markers.pop();
        markers.push(e.latlng);
        this.setState({ markers });
        console.log(markers)
    }
    
    handleSubmit = (e) =>{
        const { markers } = this.state;
    }

    render() {
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        return (
            <div>
                <Map
                    center={[13.198748, 77.748823]}
                    onClick={this.addMarker}
                    zoom={14}
                    maxZoom={22}
                    minZoom={5}   
                    style={{width: '100%',height: '600px'}}
                    onSubmit={this.handleSubmit}
                >
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/>
                    {this.state.markers.map((position, idx) =>
                        <Marker key={`marker-${idx}`} position={position}>
                            <Popup><b>{idx + 1}</b></Popup>
                        </Marker> 
                    )}
                </Map>
                <div>
                </div>
            </div>
            
        );
    }
}

export default OSMap;