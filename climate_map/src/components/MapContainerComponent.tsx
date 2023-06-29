import React from "react";
import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";

interface MapContainerProps {
  position: [number, number];
}

const Map: React.FC<MapContainerProps> = ({ position }) => {
  return (
    <MapContainer
      style={{ height: "100vh", width: "100%", zIndex: 0 }}
      center={position}
      maxBoundsViscosity={1.0}
      zoom={12}
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data © OpenStreetMap contributors"
      />
      {/* Austrian Municipalities */}
      <WMSTileLayer
        url="http://localhost/geoserver/atmun/gwc/service/wms"
        layers="atmun:STATISTIK_AUSTRIA_GEM_20230101"
        format="image/png"
        transparent={true}
        opacity={0.5}
      />
      {/* Sample Austrian climate map */}
      <WMSTileLayer
        url="http://localhost/geoserver/at_climate_maps/gwc/service/wms"
        layers="at_climate_maps:spartacus_test_colors2"
        format="image/png"
        transparent={true}
        opacity={0.5}
      />
    </MapContainer>
  );
};

export default Map;
