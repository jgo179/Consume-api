"use client";

import { GetMovies } from "@/components/GetMovies";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FormatNumber from "@/utils/FormatNumber";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import type { Movie, MovieDetails } from "./types/movie";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormatDate } from "@/utils/FormatDate";
import { GetDetails } from "@/components/GetDetails";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RecentMovies } from "@/components/RecentMovies";

export default function Home() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [moviesDetails, setMoviesDetails] = useState<MovieDetails>();
  const [idDetails, setIdDetails] = useState(0);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  function handleOpenDetails(id: number) {
    setIdDetails(id);
  }

  useEffect(() => {
    GetMovies({ page }).then((data) => setMovies(data));
  }, [page]);

  useEffect(() => {
    GetDetails({ id: idDetails }).then((data) => setMoviesDetails(data));
  }, [idDetails]);

  return (
    <div>
      <header className="flex mt-16 mb-16 justify-center">
        <h1 className="text-2xl font-bold text-center text-gray-300">
          Ranking de Filmes - The Movie Database (TMDb)
        </h1>
      </header>

      <div className="max-w-6xl mx-auto">
        <RecentMovies />

        <Separator />
        <h2 className="text-2xl font-bold mt-2">Trending</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {movies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="flex flex-col space-y-2 m-2 border rounded w-48 movie-card"
            >
              <Sheet>
                <SheetTrigger onClick={() => handleOpenDetails(movie.id)}>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt="capa"
                    width={200}
                    height={200}
                    loading="eager"
                    className="cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent className="min-w-[450]">
                  <SheetHeader className="justify-center items-center">
                    <SheetTitle className="text-2xl font-bold">
                      {movie.title}
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto over ml-4 mr-4 text-sm text-muted-foreground ">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt="capa"
                      width={400}
                      height={400}
                      loading="eager"
                      className="mb-2"
                    />
                    {moviesDetails?.videos?.results[0] ? (
                      <iframe
                        width="400"
                        height="220"
                        src={`https://www.youtube.com/embed/${moviesDetails?.videos?.results[0].key}`}
                        title="YouTube Trailer"
                        allowFullScreen
                      />
                    ) : (
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt="capa"
                        width={400}
                        height={400}
                        loading="eager"
                        className="mb-4"
                      />
                    )}
                    <div className="pt-2 pb-1">
                      Data de lançamento: {FormatDate(movie.release_date)}
                      <br />
                      {moviesDetails?.genres?.map((genre) => (
                        <Badge key={genre.id} className="mr-0.5 mt-1 mb-1">
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                    {movie.overview}
                  </div>

                  <SheetFooter className="flex-none mr-4 ml-4 font-bold text-2xl">
                    <Button type="button" asChild>
                      <a
                        href={`https://www.themoviedb.org/movie/${movie.id}?language=pt-BR`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Mais detalhes
                      </a>
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
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
