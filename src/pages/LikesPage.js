import React, { useState, useEffect } from "react";
import Card from "../components/Card";

function LikesPage() {
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    // Récupérer les données du localStorage
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies"));

    if (likedMovies) {
      // Utilisez les données récupérées
      const fetchData = async () => {
        const moviesData = [];
        for (let index = 0; index < likedMovies.length; index++) {
          const element = likedMovies[index];
          const request = await fetch(
            `https://api.themoviedb.org/3/movie/${element}?api_key=adc2d6cac42701723c111af5cc9f9d51`
          );
          const data = await request.json();
          moviesData.push(data);
        }
        setMyMovies(moviesData);
      };

      fetchData();
    } else {
      console.log("Aucun film liké trouvé dans le localStorage");
    }
  }, []);

  return (
    <main>
      {myMovies.map((movie, index) => {
        return <Card movie={movie} key={index} />;
      })}
    </main>
  );
}

export default LikesPage;
