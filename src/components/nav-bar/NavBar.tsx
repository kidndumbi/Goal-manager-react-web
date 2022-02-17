import { PropsWithChildren, useEffect, useState } from "react";

/* eslint-disable jsx-a11y/anchor-is-valid */

interface Props {
  onSearch: Function
}


const NavBar = ({ onSearch }: PropsWithChildren<Props>) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      onSearch(searchValue);
    }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchValue]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand">Goals Manager</a>
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
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Reports</a>
              </li>
            </ul>
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
