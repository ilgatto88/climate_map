import L from "leaflet";

L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  getFeatureInfoUrl(latlng) {
    const point = this._map.latLngToContainerPoint(latlng, this._map.getZoom());
    const size = this._map.getSize();

    const params = {
      request: "GetFeatureInfo",
      service: "WMS",
      srs: "EPSG:4326",
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: this._map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: "text/html",
    };

    params[params.version === "1.3.0" ? "i" : "x"] = Math.round(point.x);
    params[params.version === "1.3.0" ? "j" : "y"] = Math.round(point.y);

    return this._url + L.Util.getParamString(params, this._url, true);
  },
});

L.tileLayer.betterWms = (url, options) =>
  new L.TileLayer.BetterWMS(url, options);
