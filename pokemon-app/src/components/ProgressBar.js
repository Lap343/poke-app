import React, { useState, useEffect } from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ done }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const hpColorStatus =
      done > 50 ? "#00ae00" : done > 20 && done <= 50 ? "yellow" : "red";

    const newStyle = {
      width: `${done}%`,
      background: hpColorStatus,
    };

    setStyle(newStyle);
  }, [done]);

  return (
    <div className="progress-bar">
      <div className="progress-bar__done" style={style}>
        {Math.round(done)}%
      </div>
    </div>
  );
};

export default ProgressBar;
