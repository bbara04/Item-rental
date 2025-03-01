import { useState } from "react";
import Login from "./authentication/LoginPanel";
import Register from "./authentication/RegisterPanel";

const WelcomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login onSwitch={() => setIsLogin(false)} />
  ) : (
    <Register onSwitch={() => setIsLogin(true)} />
  );
};

export default WelcomePage;
