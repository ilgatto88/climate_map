import "leaflet/dist/leaflet.css";
import Map from "./components/MapContainerComponent";
// import ClimateData from "./components/ClimateData";

function App() {
  // return <ClimateData municipalityId={10101} parameter="tm" scenario="rcp26" />;
  return <Map position={[48.32089, 16.14196]} />;
}

export default App;
