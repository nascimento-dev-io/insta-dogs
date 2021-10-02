import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";

import { ReactComponent as Photos } from "../../assets/images/feed.svg";
import { ReactComponent as Stats } from "../../assets/images/estatisticas.svg";
import { ReactComponent as Add } from "../../assets/images/adicionar.svg";
import { ReactComponent as Exit } from "../../assets/images/sair.svg";

import { useLocation } from "react-router";

// import styles from "./UserHeaderNav.module.css";
import "./UserHeaderNav.css";
import useMedia from "../../hooks/useMedia";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);

  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();

  React.useEffect(() => setMobileMenu(false), [pathname]);

  return (
    <>
      {mobile && (
        <button
          className={`mobile-button ${mobileMenu && "mobile-button-active"}`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? "nav-mobile" : "nav"} ${
          mobileMenu && "nav-mobile-active"
        }`}
      >
        <NavLink to="/account" end>
          {" "}
          <Photos />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/account/stats">
          {" "}
          <Stats />
          {mobile && "Estatíscas"}
        </NavLink>
        <NavLink to="/account/post">
          <Add />
          {mobile && "Adicionar fotos"}
        </NavLink>
        <button onClick={userLogout}>
          <Exit />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
