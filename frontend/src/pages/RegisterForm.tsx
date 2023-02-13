import React from "react";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/UseActions";
import Button from "../UI/Button";
import Input from "../UI/Input";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("test@gmail.com");
  const [password, setPassword] = React.useState("123456");
  const { registeration } = useActions();
  const registerationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    registeration(email, password);
  };
  return (
    <form className="bg-[black] rounded-2xl p-5 flex flex-col text-white items-center min-h-[200px]">
      <h1 className="font-bold text-[25px] mb-3">Регистрация</h1>
      <Input
        state={email}
        setState={setEmail}
        placeholder="Введите email"
        text="Email"
        type="text"
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder="Введите пароль"
        text="Пароль"
        type="password"
      />
      <Link to={"../login"} className="mt-2 text-[18px]">
        Перейти на страничку логин
      </Link>
      <Button text="Зарегистрироваться" onClick={registerationHandler} />
    </form>
  );
};

export default RegisterForm;
