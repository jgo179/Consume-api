export type Serie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  first_air_date: string;
};

export interface SerieDetails extends Serie {
  genres: { id: number; name: string }[];
  homepage: string;
  videos: {
    results: {
      id: string;
      key: string;
    }[];
  };
}
