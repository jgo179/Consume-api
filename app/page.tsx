"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { RecentMovies } from "@/components/RecentMovies";
import { TrendingMovies } from "@/components/TrendingMovies";

export default function Home() {
  const [page, setPage] = useState(1);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

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

        <TrendingMovies page={page} />
      </div>

      <Pagination>
        <PaginationContent className="mt-4">
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
