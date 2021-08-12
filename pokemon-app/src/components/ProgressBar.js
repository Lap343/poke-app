import React, { useState } from "react";

const ProgressBar = ({ done }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className="progress-bar">
      <div className="progress-bar__done" style={style}>
        {done}%
      </div>
    </div>
  );
};

export default ProgressBar;
