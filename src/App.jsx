import { useState } from "react";
import Background from "./components/background/background";
import Logo from "./components/logo/logo";
import CustomMap from "../src/components/map/map";
import Input from "./components/input/input";
import WeatherAPI from "./components/weatherAPI/weatherAPI";
import "./App.scss";

function App() {
  const [coordinates, setCoordinates] = useState();
  const [cityFromInput, setCityFromInput] = useState();

  const getCoords = (data) => {
    setCoordinates(data);
  };

  const getCity = (city) => {
    setCityFromInput(city);
  };

  return (
    <div className="App">
      <Background />
      <div className="container">
        <Logo />
        <div className="flex-container">
          <div className="flex-map">
            <CustomMap coordinates={getCoords} />
          </div>
          <div className="flex-info">
            <Input cityFromInput={getCity} />
            <WeatherAPI coords={coordinates} cityFromInput={cityFromInput} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
