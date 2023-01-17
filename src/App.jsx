import { useState } from "react";
import Greetings from "./components/greetings/greetings";
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
      <div className="container">
        <Greetings />
        <CustomMap coordinates={getCoords} />
        <Input cityFromInput={getCity} />
        <WeatherAPI coords={coordinates} cityFromInput={cityFromInput} />
      </div>
    </div>
  );
}

export default App;
