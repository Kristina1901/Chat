import { NavLink } from 'react-router-dom';
const Navbar =() => {
    return (
        <nav>
          <NavLink
            to="/register"
           
          >
            Join
          </NavLink>
          <NavLink
            to="/login"
            
          >
            Login
          </NavLink>
        </nav>
      );
}
export default Navbar