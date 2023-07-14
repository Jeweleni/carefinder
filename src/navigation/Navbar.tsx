import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import { ImCancelCircle } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import "./navbar.css";
import CareFinder from "../assets/CareFinder.png";

interface User {
  displayName: string;
  photoUrl: string;
}

interface NavbarProps {
  signOut: () => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ signOut, user }) => {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [offset] = WindowOffSet();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleHamburgerClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      setShow(false);
    }
  }, [open]);

  return (
    <nav className={offset > 20 ? "nav_container1" : "nav_container"}>
      <div className="nav_wrapper">
        <h1 className="nav_header">
          CareFinder{" "}
          <img src={CareFinder} alt="logo" className="carefinderlogo" />{" "}
        </h1>

        <div className={`nav_ul ${open ? "active" : ""}`}>
          <ul>
            <li className="home">
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>

            {user ? (
              <li>
                <div
                  onClick={() => setShow(!show)}
                  className={`app_navbar_profile ${show ? "active" : ""}`}
                >
                  {user && (
                    <div className="app_navbar_profile_flex">
                      <p>
                        {user.photoUrl && (
                          <img
                            src={user.photoUrl}
                            alt="profile"
                            className="avatar"
                          />
                        )}
                        {user.displayName}
                        <RiArrowDownSFill onClick={() => setToggle(!toggle)} />
                        {toggle && (
                          <ul id="dropdown_menu">
                            <li className="list-drop">
                              <Link to="/profile" onClick={handleLinkClick}>
                                <RxAvatar className="user_icon" />
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link to="/" onClick={signOut}>
                                <MdLogout className="user_icon" />
                                Logout
                              </Link>
                            </li>
                          </ul>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <>
                <li className="about">
                  <Link to="/about" onClick={handleLinkClick}>
                    About
                  </Link>
                </li>
                <li className="hospitals">
                  <Link to="/hospitals" onClick={handleLinkClick}>
                    Hospitals
                  </Link>
                </li>
                <li className="signin">
                  <Link to="/signin" onClick={handleLinkClick}>
                    Login
                  </Link>
                </li>
                <li className="signup">
                  <Link to="/signup" onClick={handleLinkClick}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="nav_icons">
          {open ? (
            <ImCancelCircle
              className="nav_icon"
              onClick={handleHamburgerClick}
            />
          ) : (
            <CgDetailsMore
              className="nav_icon"
              onClick={handleHamburgerClick}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function WindowOffSet() {
  const [offset, setOffSet] = useState<number>(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffSet(window.scrollY);
    };
  }, []);

  return [offset] as const;
}
