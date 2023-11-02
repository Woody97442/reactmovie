import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState("");
  const [showAdultContent, setShowAdultContent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalMovie, setTotalMovie] = useState(1);

  // Utilisez useEffect pour récupérer les résultats de la dernière recherche au montage
  useEffect(() => {
    const lastSearchResults = JSON.parse(
      localStorage.getItem("lastSearchResults")
    );
    if (lastSearchResults) {
      setMovies(lastSearchResults);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=adc2d6cac42701723c111af5cc9f9d51&page=" +
        currentPage +
        "&include_adult=" +
        showAdultContent +
        "&query=" +
        searchValue
    );
    const data = await request.json();
    setMovies(data.results);
    console.log(data.results);
    setTotalPage(data.total_pages);
    setTotalMovie(data.total_results);

    // Stocker les résultats de la recherche dans le localStorage
    localStorage.setItem("lastSearchResults", JSON.stringify(data.results));
  };

  const nextPage = async (e) => {
    if (currentPage + 1 == totalPage) {
      return;
    }
    let page = currentPage + 1;
    const request = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=adc2d6cac42701723c111af5cc9f9d51&page=" +
        page +
        "&include_adult=" +
        showAdultContent +
        "&query=" +
        searchValue
    );
    const data = await request.json();
    setMovies(data.results);
    setCurrentPage(page);

    // Stocker les résultats de la recherche dans le localStorage
    localStorage.setItem("lastSearchResults", JSON.stringify(data.results));
  };

  const prevPage = async (e) => {
    if (currentPage - 1 == 0) {
      return;
    }
    let page = currentPage - 1;
    const request = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=adc2d6cac42701723c111af5cc9f9d51&page=" +
        page +
        "&include_adult=" +
        showAdultContent +
        "&query=" +
        searchValue
    );
    const data = await request.json();
    setMovies(data.results);
    setCurrentPage(page);

    // Stocker les résultats de la recherche dans le localStorage
    localStorage.setItem("lastSearchResults", JSON.stringify(data.results));
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre du film"
            onInput={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <input
            type="submit"
            value="Rechercher"
            onClick={() => setCurrentPage(1)}
          />
        </form>

        <div className="sortContainer">
          <button
            onClick={() => {
              setSort("top");
            }}
          >
            <AiOutlineArrowUp />
            Top
          </button>
          <button
            onClick={() => {
              setSort("flop");
            }}
          >
            <AiOutlineArrowDown />
            Flop
          </button>
          <div className="form-check">
            <input
              type="checkbox"
              checked={showAdultContent}
              onChange={(e) => setShowAdultContent(e.target.checked)}
              name="adult"
              id="adult"
            />
            <label htmlFor="adult">Contenu Adulte</label>
          </div>
        </div>
        <div className="pagination">
          <div>
            <div className="movies">Total de page : {totalPage}</div>
            <div className="movies">Total de film : {totalMovie}</div>
          </div>
          <div
            className="page"
            id="prev"
            onClick={() => {
              prevPage();
            }}
          >
            <BsFillArrowLeftSquareFill size={30} />
          </div>
          <div className="lastPage ">
            {currentPage - 1 != 0 && <span>{currentPage - 1}</span>}
          </div>
          <div className="current">{currentPage}</div>
          <div className="nextPage">
            {currentPage + 1 != totalPage && <span>{currentPage + 1}</span>}
          </div>
          <div
            className="page"
            id="next"
            onClick={() => {
              nextPage();
            }}
          >
            <BsFillArrowRightSquareFill size={30} />
          </div>
        </div>
      </section>
      <main>
        {movies
          .sort((a, b) => {
            if (sort === "top") {
              return b.vote_average - a.vote_average;
            } else if (sort === "flop") {
              return a.vote_average - b.vote_average;
            } else {
              return 0;
            }
          })
          .map((movie, index) => {
            return <Card movie={movie} key={index} />;
          })}
      </main>
    </>
  );
}

export default Home;
