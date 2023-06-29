import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import Map from "./components/MapContainerComponent";

const App = () => {
  const position: LatLngExpression = [48.32089, 16.14196];

  return <Map position={position} />;
};

export default App;
