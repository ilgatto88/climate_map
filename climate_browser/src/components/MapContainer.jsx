import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import {
  fetchGeoServerResponse,
  parseGeoServerResponse,
} from "../utils/geoserver/helpers";

function Map({ onMunicipalityIdChange }) {
  const [municipalityId, setMunicipalityId] = React.useState(null);
  const mapContainerRef = useRef(null);
  const mapCenter = [48.33089, 16.14196];

  useEffect(() => {
    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: 8,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
    });

    // OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data © OpenStreetMap contributors",
    }).addTo(map);

    // Austrian municipalities
    const ATMunLayer = L.tileLayer
      .betterWms("http://localhost/geoserver/atmun/gwc/service/wms", {
        layers: "atmun:STATISTIK_AUSTRIA_GEM_20230101",
        format: "image/png",
        transparent: true,
        opacity: 0.5,
      })
      .addTo(map);

    // Climate data
    L.tileLayer
      .wms("http://localhost/geoserver/at_climate_maps/gwc/service/wms", {
        layers: "at_climate_maps:spartacus_test_colors2",
        format: "image/png",
        transparent: true,
        opacity: 0.5,
      })
      .addTo(map);

    // Fetches the municipality id on click
    map.on("click", async (e) => {
      const url = ATMunLayer.getFeatureInfoUrl(e.latlng);
      const response = await fetchGeoServerResponse(url);
      const value = parseGeoServerResponse(response);
      if (value) {
        setMunicipalityId(value);
        onMunicipalityIdChange(value);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "100vh", width: "100%" }}
      className="map-container"
    />
  );
}

export default Map;
