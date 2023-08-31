import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { open } from "../features/sidebarSlice";
import { changeMunicipalityId } from "../features/variables/municipalityIdSlice";
import {
  swapCoordinates,
  fetchGeoServerResponse,
  parseGeoServerResponse,
} from "../utils/geoserver/helpers";

import "../styles/Map.css";

export default function Map() {
  const mapContainerRef = useRef(null);
  const mapCenter = [47.7, 13.8];

  const southWest = L.latLng(45, 8);
  const northEast = L.latLng(50, 20);
  const bounds = L.latLngBounds(southWest, northEast);

  const geoServerBaseUrl = "http://localhost/geoserver";
  const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const ATMunUrl = `${geoServerBaseUrl}/atmun/gwc/service/wms`;
  const ATClimateMapsUrl = `${geoServerBaseUrl}/at_climate_maps/gwc/service/wms`;
  const ATMunWFSBaseUrl = `${geoServerBaseUrl}/atmun/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=atmun%3ASTATISTIK_AUSTRIA_GEM_20230101&srsName=epsg:4326&outputFormat=application%2Fjson&cql_filter=g_id=`;

  const sidebarState = useSelector((state) => state.sidebarHandler.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: 8,
      minZoom: 8,
      maxZoom: 15,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      zoomControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });

    L.control
      .zoom({
        position: "bottomleft",
      })
      .addTo(map);

    // OpenStreetMap
    L.tileLayer(OSMUrl, {
      attribution: "Map data © OpenStreetMap contributors",
    }).addTo(map);

    // Austrian municipalities
    const ATMunLayer = L.tileLayer
      .betterWms(ATMunUrl, {
        layers: "atmun:STATISTIK_AUSTRIA_GEM_20230101",
        format: "image/png",
        transparent: true,
        opacity: 0.5,
      })
      .addTo(map);

    // Climate data
    L.tileLayer
      .wms(ATClimateMapsUrl, {
        layers: "at_climate_maps:spartacus_test_colors2",
        format: "image/png",
        transparent: true,
        opacity: 0.5,
      })
      .addTo(map);

    const polylines = [];

    function fetchAndDrawPolyline(value) {
      fetch(`${ATMunWFSBaseUrl}${value}`)
        .then((WFSresponse) => WFSresponse.json())
        .then((data) => {
          const rawCoordinates = data.features[0].geometry.coordinates[0][0];
          const CurrentMunicipalityPolyline = L.polyline(
            swapCoordinates(rawCoordinates),
            {
              color: "black",
            }
          ).addTo(map);
          polylines.push(CurrentMunicipalityPolyline);
        });
    }

    // Fetches the municipality id on click
    map.on("click", async (e) => {
      const url = ATMunLayer.getFeatureInfoUrl(e.latlng);
      const response = await fetchGeoServerResponse(url);
      const value = parseGeoServerResponse(response);
      if (value) {
        dispatch(open());
        dispatch(changeMunicipalityId(value));

        polylines.forEach((item) => map.removeLayer(item));
        fetchAndDrawPolyline(value);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    const gElement = mapContainer.querySelector("g");
    if (!sidebarState) {
      if (gElement) {
        gElement.innerHTML = "";
      }
    }
  }, [sidebarState]);

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ width: "100%", height: "85%", top: "7%" }}
    />
  );
}
