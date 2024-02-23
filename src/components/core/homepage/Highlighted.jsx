import React from "react";

const Highlighted = ({ text }) => {
  return (
    <div className=" bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold">
      {" "}
      {text}{" "}
    </div>
  );
};

export default Highlighted;
