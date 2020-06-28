import React from "react";

import "./LedButton.css";

const LedButton = (props) => {
  const randomDuration = (secs) => Math.floor(Math.random() * secs);

  return (
    <span
      className={`led-button led-button--${props.on}`}
      style={{
        animationDuration: `${randomDuration(20)}s`,
        animationDelay: `${randomDuration(100)}s`,
      }}
      onClick={() => props.handleLedPress(props.id)}
    />
  );
};

export default LedButton;
