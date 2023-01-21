import "./drop.scss";
import water from "/images/water.png";

const Drop = (props) => {
  return (
    <div className="rain-container">
      <img
        src={water}
        className="rain"
        style={{ width: props.size + "px", height: props.size + "px" }}
      />
    </div>
  );
};

export default Drop;
