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

import Config from "../data/config.json";

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
  const defaultClimateLayer = Config.DEFAULT_CLIMATE_DATA_LAYER;

  const osmLayer = Config.OSM_LAYER;
  const climateDataUrl = `${Config.GEOSERVER_BASE_URL}/at_climate_maps/wms`;
  const municipalityBaseUrl = `${Config.GEOSERVER_BASE_URL}/atmun/gwc/service/wms`;
  const municipalityWFSUrl = `${Config.GEOSERVER_BASE_URL}/atmun/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=atmun%3ASTATISTIK_AUSTRIA_GEM_20230101&srsName=epsg:4326&outputFormat=application%2Fjson&cql_filter=g_id=`;

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
    if (polyline.length > 0 && municipalityId !== "") {
      fetchPolyline(municipalityId);
    }
  }, [municipalityId]);

  useEffect(() => {
    if (!sideBarState) {
      setPolyline([]);
    } else {
      fetchPolyline(municipalityId);
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
      center={Config.MAP_CENTER}
      zoom={Config.MAP_BASE_ZOOMLEVEL}
      minZoom={Config.MAP_MINIMUM_ZOOMLEVEL}
      maxZoom={Config.MAP_MAXIMUM_ZOOMLEVEL}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      ref={mapContainerRef}
    >
      <TileLayer
        attribution={Config.OSM_LAYER_ATTRIBUTION}
        url={osmLayer}
        className="osmlayer"
      />
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
