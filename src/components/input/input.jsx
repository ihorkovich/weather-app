import "./input.scss";
import search from "/images/search.png";

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
        <img src={search} className="form-button-icon" />
      </button>
    </form>
  );
};

export default Input;
