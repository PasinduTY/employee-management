import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Employee Management
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/employees">
            Employees
          </Link>

          <Link className="nav-link" to="/departments">
            Departments
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
