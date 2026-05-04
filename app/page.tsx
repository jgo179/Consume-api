"use client";

import Image from "next/image";
import { type Movie } from "@/components/GetMovies";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { refresh } from "next/cache";
import { useEffect, useState } from "react";
import FormatNumber from "@/utils/FormatNumber";
import { FaStar } from "react-icons/fa";
import { GetMoviesT } from "@/components/GetMoviesT";

export default function Home() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  useEffect(() => {
    GetMoviesT({ page }).then((data) => setMovies(data));
  }, [page]);

  return (
    <div>
      <div className="flex mt-16 mb-16 justify-center">
        <h1 className="text-2xl font-bold text-center text-gray-300">
          Ranking de Filmes - The Movie Database (TMDb)
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="flex flex-col  space-y-2 m-2 border rounded w-48 pb-2 movie-card"
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt="capa"
                width={200}
                height={200}
                loading="eager"
              />

              <p className="flex flex-row items-center space-x-2 text-sm ">
                <FaStar color="yellow" className="mr-1" />
                {FormatNumber(movie.vote_average)}
              </p>
              <p className="text-sm font-bold">{movie.title}</p>
              <p className="text-sm text-gray-400">Votos: {movie.vote_count}</p>
            </div>
          ))}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem
            className="cursor-pointer"
            hidden={page === 1}
            onClick={() => {
              handlePageChange(page - 1);
            }}
          >
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => {
                handlePageChange(page + 1);
              }}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => {
                handlePageChange(page + 2);
              }}
            >
              {page + 2}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => {
                handlePageChange(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <footer className="flex flex-row bottom-0 text-gray-600 w-full justify-center p-5">
        <p className="flex flex-row items-center text-sm">
          <a
            href="https://github.com/jgo179"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex mr-1"
          >
            <Image
              src="github-icon-white.svg"
              alt="github icon"
              className="mr-1 "
              width={20}
              height={20}
            />{" "}
            Jonathan Oliveira 2026.
          </a>
          Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
