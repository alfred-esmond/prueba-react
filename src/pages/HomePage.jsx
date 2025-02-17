import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="container">
      <Header />
      <h2>Popular Titles</h2>
      <div className="grid-container">
        <Link to="/series" className="card">
          <div className="card-content">
            <h3>Series</h3>
          </div>
        </Link>
        <Link to="/movies" className="card">
          <div className="card-content">
            <h3>Movies</h3>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
