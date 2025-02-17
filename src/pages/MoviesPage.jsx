import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Popup from "../components/Popup";
import { fetchData } from "../utils/fetchData";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterYear, setFilterYear] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = searchParams.get("page");
  const initialPage = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    fetchData()
      .then((data) => {
        let filtered = data.filter((item) => item.programType === "movie");
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        setMovies(filtered);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const handleTitleClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const getFilteredMovies = () => {
    if (!filterYear) return movies;
    const yearAsNumber = parseInt(filterYear, 10) || 0;
    return movies.filter((item) => item.releaseYear >= yearAsNumber);
  };

  const filteredMovies = getFilteredMovies();
  const totalItems = filteredMovies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <Header />
      <h2>Popular Movies</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Oops, something went wrong...</p>}
      <div className="top-bar">
        <div>
          <label htmlFor="filterYear">Filtrar por año (mínimo):</label>
          <input
            id="filterYear"
            type="number"
            className="filter-input"
            placeholder="Ej: 2015"
            value={filterYear}
            onChange={(e) => {
              setFilterYear(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div>
          <label htmlFor="itemsPerPage">Resultados por página:</label>
          <select
            id="itemsPerPage"
            className="items-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div className="grid-container">
        {paginatedMovies.map((item) => (
          <div key={item.title} className="card">
            <img src={item.images["Poster Art"].url} alt={item.title} />
            <h3
              className="clickable-title"
              onClick={() => handleTitleClick(item)}
            >
              {item.title}
            </h3>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
      <Popup item={selectedItem} onClose={handleClosePopup} />
      <Footer />
    </div>
  );
}

export default MoviesPage;
