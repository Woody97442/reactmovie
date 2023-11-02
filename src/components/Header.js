import React from "react";
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <nav>
          <h1>React Movies</h1>
          <div className="routingBtn">
            <Link to="/">
              <button>Accueil</button>
            </Link>
            <Link to="/like">
              <button>Coups de coeur</button>
            </Link>
          </div>
        </nav>
      </header>
      <>
        <Outlet />
      </>
    </>
  );
}

export default Header;
