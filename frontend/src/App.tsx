import React from "react";
import RegisterForm from "./pages/RegisterForm";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Main from "./pages/Main";
import { useTypedSelector } from "./hooks/UseTypedSelector";
import { selectUser } from "./store/selectors/userSelectors";
import { useActions } from "./hooks/UseActions";
function App() {
  const user = useTypedSelector(selectUser);
  const { checkAuth } = useActions();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Routes>
        <Route
          path="/main"
          element={
            window.localStorage.getItem("token") ? <Main /> : <LoginForm />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/main" replace /> : <LoginForm />}
        />
        <Route
          path="/registration"
          element={user ? <Navigate to="/main" replace /> : <RegisterForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
