import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/cars">Cars</Link>
      </h1>
      <button>
        <Link to="/cars/new">New Car</Link>
      </button>
    </nav>
  );
};