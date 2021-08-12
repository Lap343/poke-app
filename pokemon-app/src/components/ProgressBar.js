import React, { useState, useEffect } from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ done }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      };

      setStyle(newStyle);
    }, 20);

    return () => clearTimeout(timer);
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
