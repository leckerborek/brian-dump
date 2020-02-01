import React from "react";
import { Toggled } from "../pages/HomePage";

interface Props extends React.Props<React.ElementType> {
  handleToggledClicked: (button: string) => void;
  toggled: Toggled;
  type: keyof Toggled;
}

const SortButton = ({
  handleToggledClicked,
  toggled,
  type,
  children
}: Props) => {
  return (
    <button
      onClick={() => handleToggledClicked(type)}
      className={`w-20 p-1 mx-2 bg-gray-400 rounded focus:outline-none ${
        toggled[type]
          ? "bg-blue-500 text-white font-bold"
          : " hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

export default SortButton;
