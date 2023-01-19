import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Leaflet from "leaflet";

import "./map.scss";

const CustomMap = (props) => {
  const [coords, setCoords] = useState([]);
  const [marker, setMarker] = useState(null);

  const corner1 = Leaflet.latLng(-90, -200);
  const corner2 = Leaflet.latLng(90, 200);
  const bounds = Leaflet.latLngBounds(corner1, corner2);

  const HandleClickMap = () => {
    const map = useMapEvents({
      click(e) {
        const { latlng } = e;
        const { lat } = latlng;
        const { lng } = latlng;

        setCoords([Number(lat), Number(lng)]);
        setMarker(<Marker position={[lat, lng]}></Marker>);
        props.coordinates([Number(lat.toFixed(2)), Number(lng.toFixed(2))]);
      },
    });
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[50, 2]}
        zoom={4}
        scrollWheelZoom={true}
        maxZoom={10}
        minZoom={3}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <HandleClickMap />
        {marker}
      </MapContainer>
    </div>
  );
};

export default CustomMap;
