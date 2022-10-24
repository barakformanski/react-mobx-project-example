import "./Button.css";
const Button = ({ onClick, text }) => {
  return (
    <button className="reset-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
