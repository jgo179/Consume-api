"use client";

import { FormatDate } from "@/utils/FormatDate";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Movie } from "@/app/types/movie";
import { GetRecentMovies } from "./GetRecentMovies";
import { DetailsMovie } from "./DetailsMovie";

export function RecentMovies() {
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [idDetails, setIdDetails] = useState(0);

  const sortedMovies = [...recentMovies].sort((a, b) => {
    return (
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });

  function handleOpenDetails(id: number) {
    setIdDetails(id);
  }

  function handleCloseDetails() {
    setIdDetails(0);
  }

  useEffect(() => {
    GetRecentMovies().then((data) => setRecentMovies(data));
  }, []);

  return (
    <>
      <DetailsMovie id={idDetails} onClose={handleCloseDetails} />
      <div className="p-4 rounded mb-2 top10-card">
        <h2 className="text-2xl font-bold ml-2">Lançamentos</h2>
        <ScrollArea>
          <div className="flex gap-4 pb-4">
            {sortedMovies.map((movie: Movie) => (
              <div key={movie.id} className="flex flex-col space-y-2 m-2 w-48">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt="capa"
                  width={200}
                  height={200}
                  loading="eager"
                  className="cursor-pointer"
                  onClick={() => handleOpenDetails(movie.id)}
                />
                <h3 className="font-bold">{movie.title}</h3>
                <span className="font-bold text-sm mt-auto">
                  {FormatDate(movie.release_date)}
                </span>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" forceMount />
        </ScrollArea>
      </div>
    </>
  );
}
