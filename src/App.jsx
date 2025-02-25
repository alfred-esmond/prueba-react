import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />
      <h2>Popular Titles</h2>
      <div className="grid-container">
        <Link to="/series" className="card">
          <img src="/assets/store/app-store.svg" alt="Series" />
          <h3>Series</h3>
        </Link>
        <Link to="/movies" className="card">
          <img src="/assets/store/play-store.svg" alt="Movies" />
          <h3>Movies</h3>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default App;
