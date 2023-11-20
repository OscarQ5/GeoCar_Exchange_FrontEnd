import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="navbar-item title">
          <Link to="/cars">GeoCar Exchange</Link>
        </h1>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="nav-buttons">
            <Link to="/cars/new" className="button is-primary">
              <strong>New Car</strong>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};