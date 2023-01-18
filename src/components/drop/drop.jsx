import "./drop.scss";

const Drop = (props) => {
  return (
    <div className="rain-container">
      <img
        src="../src/images/water.png"
        className="rain"
        style={{ width: props.size + "px", height: props.size + "px" }}
      />
    </div>
  );
};

export default Drop;
