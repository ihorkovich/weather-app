import "./input.scss";

const Input = (props) => {
  const setCity = (e) => {
    e.preventDefault();
    props.cityFromInput(`${e.target.children[0].value}`);
    e.target.children[0].value = "";
  };
  return (
    <form onSubmit={setCity} className="form">
      <input type="text" className="form-input" placeholder="Enter the city" />
      <button type="submit" className="form-button">
        <img src="../src/images/search.png" className="form-button-icon" />
      </button>
    </form>
  );
};

export default Input;
