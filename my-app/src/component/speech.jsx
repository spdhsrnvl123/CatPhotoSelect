import "./speech.css";

const Speech = ({ counter }) => {
  return (
    <div>
      <div div className="bubble">
        Count
        <p>{counter}</p>
      </div>
    </div>
  );
};

export default Speech;
