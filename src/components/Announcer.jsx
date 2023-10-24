import React from "react";
import PropTypes from "prop-types";

const Announcer = ({ winner, setAppStatus }) => {
  const onPlayAgain = () => {
    setAppStatus("newGame");
  };

  return (
    <div>
      <div className={`announcer ${winner.side}`}>
        {winner.side === "light" && <h2>You are winner!!!</h2>}
        {winner.side === "dark" && <h2>PC is winner!!!</h2>}
      </div>
      <button className="new-game-btn star-btn" onClick={onPlayAgain}>
        Play again!
      </button>
    </div>
  );
};

export default Announcer;

Announcer.propTypes = {
  winner: PropTypes.object,
  // winner: PropTypes.object.isRequired,
  setAppStatus: PropTypes.func.isRequired,
};
