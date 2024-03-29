import { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchValueActions, useAppDispatch } from "../../store";
import { selectCurrentPage } from "../../store/currentPage.slice";

/* eslint-disable jsx-a11y/anchor-is-valid */

interface Props {}

const NavBar = (props: PropsWithChildren<Props>) => {
  const [searchValue, setSearchValue] = useState("");

  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {}, [currentPage]);

  const navigate = useNavigate();

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      dispatch(searchValueActions.setSearchValue({ searchValue }));
    }, 500);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchValue]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <a className="navbar-brand">Goals Manager</a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <a className="nav-link active" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/reports" style={{ textDecoration: "none" }}>
                  <a className="nav-link">Reports</a>
                </Link>
              </li>
              {currentPage === "MainPage" && (
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                      navigate("/addGoal");
                    }}
                  >
                    <i className="bi bi-plus-circle-fill"></i>
                  </button>
                </li>
              )}
            </ul>
            {currentPage === "MainPage" && (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                  }}
                />
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
