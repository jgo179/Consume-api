"use client";

import type { MovieDetails } from "@/app/_types/movie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { GetDetails } from "../services";

type Props = {
  id: number;
  onClose: () => void;
};

export function DetailsMovie({ id, onClose }: Props) {
  const [moviesDetails, setMoviesDetails] = useState<MovieDetails>();

  useEffect(() => {
    if (!id) return;
    GetDetails({ id }).then((data) => setMoviesDetails(data));
  }, [id]);

  return (
    <Sheet open={id > 0} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="min-w-md">
        <SheetHeader className="justify-center items-center">
          <SheetTitle className="text-2xl font-bold">
            {moviesDetails?.title}
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto ml-4 mr-4 text-lg text-muted-foreground ">
          <Image
            src={`https://image.tmdb.org/t/p/original${moviesDetails?.poster_path}`}
            alt="capa do filme"
            width={400}
            height={600}
            className="mb-2 w-full h-max-[400px]"
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
              src={`https://image.tmdb.org/t/p/original${moviesDetails?.backdrop_path}`}
              alt="poster"
              width={400}
              height={400}
              className="mb-4 w-full h-max-[400px]"
            />
          )}
          <div className="pt-2 pb-2">
            {moviesDetails?.genres?.map((genre) => (
              <Badge key={genre.id} className="mr-0.5 mt-1 mb-1">
                {genre.name}
              </Badge>
            ))}
            <br />
          </div>
          {moviesDetails?.overview}
        </div>

        <SheetFooter className="mr-4 ml-4">
          <Button type="button" asChild>
            <a
              href={`https://www.themoviedb.org/movie/${moviesDetails?.id}?language=pt-BR`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg">Mais detalhes</span>
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
