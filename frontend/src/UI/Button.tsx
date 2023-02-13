import React from "react";

interface IButton {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: IButton) => {
  return (
    <button
      className="outline-none p-3 rounded-2xl w-full mt-4 bg-[gold]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
