import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./NavBar.module.css";
import logo from "../../logo.png";
import User from "./user/User";

const NavBar = () => {
  let location = useLocation();

  const myUser = useSelector((state) => state.user);

  if (location.pathname !== "/")
    return (
      <nav
        className={
          location.pathname.includes("/institucion")
            ? style.navbar_dark
            : style.navbar__nav
        }
      >
        <NavLink to="/">
          <img
            alt="logo"
            src={
              location.pathname.includes("/institucion")
                ? require("../../logoBlanco.png").default
                : logo
            }
            width={location.pathname.includes("/institucion") ? "90px" : "60%"}
            className={
              location.pathname.includes("/institucion")
                ? style.navbar__logo_dark
                : style.navbar__logo
            }
          />
        </NavLink>
        <div className={style.navbar__div_buttons}>
          {myUser !== null && <User />}

          {!myUser && (
            <div>
              <NavLink to="/signin">
                <button className={style.navbar__link}>LOG IN</button>
              </NavLink>
              <NavLink to="/signup">
                <button className={style.navbar__boton_violeta}>SIGN UP</button>
              </NavLink>
              <NavLink to="/"></NavLink>
            </div>
          )}
        </div>
      </nav>
    );
  else return <div></div>;
};

export default NavBar;
