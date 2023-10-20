import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MapContainer,
  Polyline,
  TileLayer,
  WMSTileLayer,
  ZoomControl,
} from "react-leaflet";

import { swapCoordinates } from "../utils/geoserver/helpers";

import "../styles/Map.css";

import ExtendedWMSTileLayer from "./ExtendedWMSTileLayer";

export default function Map() {
  const climateDataTileRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [climateDataLayer, setClimateDataLayer] = useState("");
  const [polyline, setPolyline] = useState([]);
  const myExtendedTileLayer = useRef(null);
  const southWest = L.latLng(45, 8);
  const northEast = L.latLng(50, 20);
  const bounds = L.latLngBounds(southWest, northEast);
  const defaultClimateLayer = "at_climate_maps:oeks_rcp85_tm_mean_AT_2036-2065";

  const osmToken =
    "3WoVLx4RVggqQsysO2MAB9y3YnNiZAy6aTdYbSGA678uwTEvTj0omMISBQ16CgfZ";
  const osmLayer = `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${osmToken}`;
  const geoServerBaseUrl = "http://localhost/geoserver";
  const climateDataUrl = `${geoServerBaseUrl}/at_climate_maps/wms`;
  const municipalityBaseUrl = `${geoServerBaseUrl}/atmun/gwc/service/wms`;
  const municipalityWFSUrl = `${geoServerBaseUrl}/atmun/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=atmun%3ASTATISTIK_AUSTRIA_GEM_20230101&srsName=epsg:4326&outputFormat=application%2Fjson&cql_filter=g_id=`;

  const scenario = useSelector((state) => state.scenarioHandler.value);
  const futurePeriod = useSelector((state) => state.futurePeriodHandler.value);
  const parameter = useSelector((state) => state.parameterHandler.value);
  const municipalityId = useSelector(
    (state) => state.municipalityIdHandler.value
  );
  const sideBarState = useSelector((state) => state.sidebarHandler.value);

  const fetchPolyline = (value) => {
    fetch(`${municipalityWFSUrl}${value}`)
      .then((response) => response.json())
      .then((data) => {
        const rawCoordinates = data.features[0].geometry.coordinates[0][0];
        const municipalityCoordinates = L.polyline(
          swapCoordinates(rawCoordinates)
        );
        setPolyline(municipalityCoordinates._latlngs);
      });
  };

  useEffect(() => {
    if (municipalityId !== "") {
      fetchPolyline(municipalityId);
    }
  }, [municipalityId]);

  useEffect(() => {
    if (!sideBarState) {
      setPolyline([]);
    }
  }, [sideBarState]);

  useEffect(() => {
    if (climateDataTileRef.current) {
      setClimateDataLayer(
        `at_climate_maps:oeks_${scenario}_${parameter}_mean_AT_${futurePeriod}`
      );
    } else {
      setClimateDataLayer(defaultClimateLayer);
    }
  }, [scenario, parameter, futurePeriod]);

  useEffect(() => {
    if (climateDataTileRef.current) {
      climateDataTileRef.current.setParams({ layers: climateDataLayer });
    }
  }, [climateDataLayer]);

  return (
    <MapContainer
      center={[47.57, 13.8]}
      zoom={8}
      minZoom={8}
      maxZoom={15}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      ref={mapContainerRef}
    >
      <TileLayer attribution="" url={osmLayer} />
      <ExtendedWMSTileLayer
        url={municipalityBaseUrl}
        layers="atmun:STATISTIK_AUSTRIA_GEM_20230101"
        format="image/png"
        opacity={0.5}
        transparent
        ref={myExtendedTileLayer}
      />
      <WMSTileLayer
        ref={climateDataTileRef}
        url={climateDataUrl}
        format="image/png"
        opacity={0.7}
        transparent
      />
      <Polyline pathOptions={{ color: "black" }} positions={polyline} />
      <ZoomControl position="bottomleft" />
    </MapContainer>
  );
}
