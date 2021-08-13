import React, { useState, useEffect } from "react";
import "../styles/ProgressBar.css";
import "../styles/ProgressBar-mobile.css";

const ProgressBar = ({ progress }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const hpColorStatus =
      progress > 50
        ? "#00ae00"
        : progress > 20 && progress <= 50
        ? "yellow"
        : "red";

    const newStyle = {
      width: `${progress}%`,
      background: hpColorStatus,
    };

    setStyle(newStyle);
  }, [progress]);

  return (
    <div className="progress-bar">
      <div className="progress-bar__done" style={style}>
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ProgressBar;
