import React from "react";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/UseActions";
import Button from "../UI/Button";
import Input from "../UI/Input";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useActions();
  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form className="bg-[black] rounded-2xl p-5 flex flex-col text-white items-center min-h-[200px]">
      <h1 className="font-bold text-[25px] mb-3">Авторизация</h1>
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
      <Link to={"../registration"} className="mt-2 text-[18px]">
        Перейти на страничку авторизация
      </Link>
      <Button text="Авторизоваться" onClick={loginHandler} />
    </form>
  );
};

export default LoginForm;
