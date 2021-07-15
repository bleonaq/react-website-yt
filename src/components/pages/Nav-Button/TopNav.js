import { useAppContext } from "../../../providers/AppProvider";
import { useHistory, Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import React, { useState } from "react";
import "../../../assets/css/bootstrap/css/bootstrap.min.css";

export default function TopNav() {
  const { user, dispatch } = useAppContext();
  const history = useHistory();
  const onLogoutHandel = async (event) => {
    event.preventDefault();
    dispatch({ type: "logout" });
    history.push("/");
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <button
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={onLogoutHandel}
              style={{
                background: "transparent",
                outline: "none",
                border: "none",
              }}
            >
              <i class="fas fa-sign-out-alt"></i>
              <span className="mr-2 ml-3 d-none d-lg-inline text-gray-600 small">
                LogOut
              </span>
            </button>
          </li>
            <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
              <span className="mr-2 ml-3 d-none d-lg-inline text-gray-600 small">
                {user.name}
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
