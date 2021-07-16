import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../providers/AppProvider";
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { user } = useAppContext();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 360) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  
  window.addEventListener("resize", showButton);
  if(user.role == "Admin"){
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Management System</div>
        </a>
        <li className="nav-item active">
          <Link className="nav-link" to="/">
          <i class="fas fa-fw fa-tachometer-alt"></i>
            <span> Dashboard</span>
          </Link>
        </li>
        <hr class="sidebar-divider"></hr>
        <li className="nav-item">
          <Link className="nav-link" to="/">
          <i class="fas fa-home"></i>
            <span> Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/City">
          <i class="fas fa-city"></i>
            <span> Cities</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Birthplace">
          <i class="fas fa-city"></i>
            <span> Birthplaces</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Subject">
          <i class="fas fa-clipboard"></i>            
          <span> Subjects</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Student">
          <i class="fas fa-users"></i>            
          <span> Students</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Professor">
            <i class="fas fa-user-tie"></i>
            <span> Professors</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/StudentGrades">
            <i class="fas fa-user-tie"></i>
            <span> Grades</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Class">
            <i class="fas fa-user-tie"></i>
            <span> Classes</span>
          </Link>
        </li>
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </>
  );
}
else if(user.role == "Student"){
    return (
      <>
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Management System</div>
          </a>
  
          <li className="nav-item active">
            <Link className="nav-link" to="/">
            <i class="fas fa-fw fa-tachometer-alt"></i>
              <span> Dashboard</span>
            </Link>
          </li>
          <hr class="sidebar-divider"></hr>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            <i class="fas fa-home"></i>
              <span> Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/GradesForStudents">
              <i class="fas fa-user-tie"></i>
              <span> Notat</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/StudentExams">
              <i class="fas fa-user-tie"></i>
              <span>Provimet</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/StudentHomework">
              <i class="fas fa-user-tie"></i>
              <span>Detyra te shtepise</span>
            </Link>
          </li>
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
            ></button>
          </div>
        </ul>
      </>
    );
  }
  else if(user.role == "Professor"){
    return (
      <>
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Management System</div>
          </a>
  
          <li className="nav-item active">
            <Link className="nav-link" to="/">
            <i class="fas fa-fw fa-tachometer-alt"></i>
              <span> Dashboard</span>
            </Link>
          </li>
          <hr class="sidebar-divider"></hr>
          <li className="nav-item">
            <Link className="nav-link" to="/ProfessorExams">
            <i class="fas fa-home"></i>
              <span> Provimet</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
            <i class="fas fa-city"></i>
              <span> Detyrat e shtepise</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/PostGrades">
            <i class="fas fa-city"></i>
              <span> Notat</span>
            </Link>
          </li>
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
            ></button>
          </div>
        </ul>
      </>
    );
  }

}

export default Navbar;
