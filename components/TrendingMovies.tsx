"use client";

import type { Movie } from "@/app/types/movie";
import FormatNumber from "@/utils/FormatNumber";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { GetMovies } from "./GetMovies";
import Image from "next/image";
import { DetailsMovie } from "./DetailsMovie";

export function TrendingMovies({ page }: { page: number }) {
  const [idDetails, setIdDetails] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);

  function handleOpenDetails(id: number) {
    setIdDetails(id);
  }

  function handleCloseDetails() {
    setIdDetails(0);
  }

  useEffect(() => {
    GetMovies({ page }).then((data) => setMovies(data));
  }, [page]);

  return (
    <>
      <DetailsMovie id={idDetails} onClose={handleCloseDetails} />
      <h2 className="text-2xl font-bold mt-2">Trending</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {movies.map((movie: Movie) => (
          <div
            key={movie.id}
            className="flex flex-col space-y-2 m-2 border rounded w-48 movie-card"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="capa"
              width={200}
              height={200}
              loading="eager"
              className="cursor-pointer"
              onClick={() => handleOpenDetails(movie.id)}
            />

            <div className="p-2">
              <p className="flex flex-row items-center space-x-2 text-sm">
                <FaStar color="yellow" className="mr-1" />
                {FormatNumber(movie.vote_average)}
              </p>
              <p className="text-sm font-bold">{movie.title}</p>
              <p className="text-sm text-gray-400 ">
                Votos: {movie.vote_count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
