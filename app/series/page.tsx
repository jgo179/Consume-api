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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

import { TrendingSeries } from "@/app/series/components/TrendingSeries";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RecentSeries } from "./components/RecentSeries";

export default function Series() {
  const [page, setPage] = useState(1);

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  return (
    <div>
      <header className="flex mt-16 mb-16 justify-center">
        <h1 className="text-2xl font-bold text-center text-gray-300">
          Trending Series (TMDb)
        </h1>
      </header>
      <main className="max-w-6xl mx-auto">
        <div>
          <a href="/movies">
            <Button variant="destructive" className="mr-1 cursor-">
              Filmes
            </Button>
          </a>

          <Button variant="ghost" className="cursor-pointer">
            Series
          </Button>
        </div>
        <RecentSeries />

        <Separator />

        <TrendingSeries page={page} />
      </main>

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

      <Footer />
    </div>
  );
}
