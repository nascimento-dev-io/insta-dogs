import React from "react";
import { Navigate, Route, Routes } from "react-router";
import LoginForm from "../components/Login/LoginForm";
import LoginCreate from "../components/Login/LoginCreate";
import LoginReset from "../components/Login/LoginReset";
import { UserContext } from "../UserContext";

import styles from "../components/Login/Login.module.css";
import NotFound from "../components/Helpers/NotFound";
import LoginPasswordLost from "../components/Login/LoginPasswordLost";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="lost" element={<LoginPasswordLost />} />
          <Route path="reset" element={<LoginReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
