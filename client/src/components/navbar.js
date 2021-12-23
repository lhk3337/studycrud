import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <Link to="/">ExerciseApp</Link>
      <div>
        <ul>
          <li>
            <Link to="/">Exercises</Link>
          </li>
          <li>
            <Link to="/create">Create Exercise Log</Link>
          </li>
          <li>
            <Link to="/user">Create User</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
