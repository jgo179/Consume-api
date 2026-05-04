import FormatNumber from "@/utils/FormatNumber";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { CountPage } from "./CountPage";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export async function GetMovies() {
  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=1&language=pt-BR`,
    {
      headers: {
        Authorization: "Bearer " + process.env.AUTHORIZATION_TOKEN,
        language: "pt-BR",
      },
    },
  );
  const posts = await data.json();
  console.log(posts);

  return (
    <>
      {posts.results.map((movie: Movie) => (
        <div
          key={movie.id}
          className="flex flex-col  space-y-2 m-2 border rounded w-48 pb-2 movie-card"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="capa"
            width={200}
            height={200}
          />

          <p className="flex flex-row items-center space-x-2 text-sm ">
            <FaStar color="yellow" className="mr-1" />
            {FormatNumber(movie.vote_average)}
          </p>
          <p className="text-sm font-bold">{movie.title}</p>
          <p className="text-sm text-gray-400">Votos: {movie.vote_count}</p>
        </div>
      ))}
    </>
  );
}
