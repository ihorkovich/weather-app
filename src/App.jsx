import { useState } from "react";
import Greetings from "./components/greetings/greetings";
import CustomMap from "../src/components/map/map";
import WeatherAPI from "./components/weatherAPI/weatherAPI";
import "./App.scss";

function App() {
  const [coordinates, setCoordinates] = useState();

  const getCoords = (data) => {
    setCoordinates(data);
  };

  return (
    <div className="App">
      <div className="container">
        <Greetings />
        <CustomMap coordinates={getCoords} />
        <WeatherAPI coords={coordinates} />
      </div>
    </div>
  );
}

export default App;
