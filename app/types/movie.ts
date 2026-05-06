export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  release_date: string;
};

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  homepage: string;
  videos: {
    results: {
      id: string;
      key: string;
    }[];
  };
}
