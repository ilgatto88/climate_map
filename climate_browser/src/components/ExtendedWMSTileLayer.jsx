import L from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import { WMSTileLayer, useMapEvents } from "react-leaflet";
import React, { useRef, forwardRef } from "react";
import { useDispatch } from "react-redux";

import { changeMunicipalityId } from "../features/variables/municipalityIdSlice";
import { open } from "../features/sidebarSlice";

import {
  fetchGeoServerResponse,
  parseGeoServerResponse,
} from "../utils/geoserver/helpers";

// eslint-disable-next-line no-unused-vars
function ExtendedWMSTileLayer(props, ref) {
  const dispatch = useDispatch();
  const context = useLeafletContext();
  const tileLayerRef = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const getFeatureInfoUrl = (latlng) => {
    const currentRef = tileLayerRef.current;
    const point = currentRef._map.latLngToContainerPoint(
      latlng,
      currentRef._map.getZoom()
    );
    const size = currentRef._map.getSize();

    const params = {
      request: "GetFeatureInfo",
      service: "WMS",
      srs: "epsg:4326",
      styles: "",
      transparent: currentRef.wmsParams.transparent,
      version: currentRef.wmsParams.version,
      format: currentRef.wmsParams.format,
      bbox: currentRef._map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: currentRef.wmsParams.layers,
      query_layers: currentRef.wmsParams.layers,
      info_format: "text/html",
    };

    params[params.version === "1.3.0" ? "i" : "x"] = Math.round(point.x);
    params[params.version === "1.3.0" ? "j" : "y"] = Math.round(point.y);

    return (
      currentRef._url + L.Util.getParamString(params, currentRef._url, true)
    );
  };

  useMapEvents({
    click: async (e) => {
      const url = getFeatureInfoUrl(e.latlng);
      const response = await fetchGeoServerResponse(url);
      const value = parseGeoServerResponse(response);
      if (value) {
        dispatch(open());
        dispatch(changeMunicipalityId(value));
      }
    },
  });

  const wmsTileLayer = React.cloneElement(
    <WMSTileLayer
      url={props.url}
      layers={props.layers}
      format={props.format}
      opacity={props.opacity}
      transparent={props.transparent}
      ref={tileLayerRef}
    />,
    context
  );

  return wmsTileLayer;
}

export default forwardRef(ExtendedWMSTileLayer);
