import {Link} from "react-router-dom";
import "./home.scss"

function Home() {
  return (
    <div className="home__wrapper">
      <h1>Welcome to FarmQuare</h1>
      <p>No. 1 farmer's market directory</p>

      <div className="links">
        <Link to="/login" className="login">Login</Link>
        <Link to="/signup" className="register">Register</Link>
      </div>
    </div>
  )
}

export default Home;