import React from "react";
import olsenxangela from "../olsenxangela-rbg.png";

const Logo = ({ sx, ...props }) => {
  return (
    <img
      src={olsenxangela}
      alt="Logo"
      style={{
        height: 24,
        ...sx,
      }}
      {...props}
    />
  );
};

export default Logo;
