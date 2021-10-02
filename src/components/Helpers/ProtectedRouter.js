import React from "react";
import { Navigate, Route } from "react-router";
import { UserContext } from "../../UserContext";

const ProtectedRouter = (props) => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Route {...props} />;
  else if (login === false) return <Navigate to="/login" />;
  else return null;
};

export default ProtectedRouter;
