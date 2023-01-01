import { NavLink } from '@remix-run/react';

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">El Challenge 2023</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;