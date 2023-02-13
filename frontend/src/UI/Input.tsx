import React from "react";

interface IInput {
  type: string;
  placeholder: string;
  text: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ type, text, placeholder, state, setState }: IInput) => {
  const setInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  return (
    <div className="flex flex-col mt-2">
      <span className="text[18px]">{text}</span>
      <input
        value={state}
        onChange={setInputHandler}
        className="rounded-2xl p-3 outline-none mt-2 text-black"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
