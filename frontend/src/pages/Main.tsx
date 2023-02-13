import React from "react";
import { useActions } from "../hooks/UseActions";
import { useTypedSelector } from "../hooks/UseTypedSelector";
import { selectUser, selectUsers } from "../store/selectors/userSelectors";
import { IUser } from "../types/user";
import Button from "../UI/Button";

const Main = () => {
  const user = useTypedSelector(selectUser);
  const users = useTypedSelector(selectUsers);
  const { logout, fetchUsers } = useActions();
  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };
  const getUsers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchUsers();
  };
  return (
    <div>
      <p> Приветствую {user?.email}</p>
      {user?.isActivated ? (
        <span className="text-[green] font-bold">Этот аккаунт активирован</span>
      ) : (
        <span className="text-[red] font-bold">
          Этот аккаунт не активирован, проверьте почту
        </span>
      )}
      <Button text="Получить пользователей" onClick={getUsers} />
      <Button text="Выйти" onClick={logoutHandler} />
      {users && (
        <div>
          <h1 className="my-3 text-[25px] font-bold">Все пользователи :</h1>
          {users?.map((u) => (
            <div key={u._id} className="border-[2px] border-[black] p-1 mb-2">
              <span>{u.email}</span>
              <span className="ml-3">
                {u.isActivated ? (
                  <span className="text-[green] font-bold">Активирован</span>
                ) : (
                  <span className="text-[red] font-bold">Не активирован</span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
