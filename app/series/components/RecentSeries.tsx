"use client";

import type { Serie } from "@/app/_types/serie";
import { FormatDate } from "@/utils/FormatDate";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";

import { GetRecentSeries } from "../services";
import { DetailsSerie } from "./DetailsSerie";

export function RecentSeries() {
  const [recentSeries, setRecentSeries] = useState<Serie[]>([]);
  const [idDetails, setIdDetails] = useState(0);

  const sortedSeries = [...recentSeries].sort((a, b) => {
    return (
      new Date(b.first_air_date).getTime() -
      new Date(a.first_air_date).getTime()
    );
  });

  function handleOpenDetails(id: number) {
    setIdDetails(id);
  }

  function handleCloseDetails() {
    setIdDetails(0);
  }

  useEffect(() => {
    GetRecentSeries().then((data) => setRecentSeries(data));
  }, []);

  return (
    <>
      <DetailsSerie id={idDetails} onClose={handleCloseDetails} />
      <div className="p-4 rounded mb-2 top10-card">
        <h2 className="text-2xl font-bold ml-2">Lançamentos</h2>
        <ScrollArea>
          <div className="flex gap-4 pb-4">
            {sortedSeries.map((serie: Serie) => (
              <div key={serie.id} className="flex flex-col space-y-2 m-2 w-48">
                <Image
                  src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                  alt="capa"
                  width={200}
                  height={200}
                  loading="eager"
                  className="cursor-pointer"
                  onClick={() => handleOpenDetails(serie.id)}
                />
                <h3 className="font-bold">{serie.title}</h3>
                <span className="font-bold text-sm mt-auto">
                  {FormatDate(serie.first_air_date)}
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
