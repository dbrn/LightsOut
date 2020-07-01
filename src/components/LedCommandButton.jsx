import React from "react";

import "./LedCommandButton.css";

const LedCommandButton = (props) => {
  return (
    <span
      onClick={() => props.onLedCommandPress()}
      className={`led-command-btn ${
        props.winner
          ? "led-command-btn--win"
          : props.refreshing
          ? "led-command-btn--refresh"
          : ""
      }`}
    >
      <span className="led-command-btn__text">
        {props.winner
          ? "You Win!!"
          : props.refreshing
          ? "Refreshing"
          : "Restart"}
      </span>
    </span>
  );
};

export default LedCommandButton;
