import { z } from "zod";

export const ratedMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  rating: z.number(),
});

export const ratedMoviesResponseSchema = z.object({
  results: z.array(ratedMovieSchema),
  total_results: z.number(),
});

export type RatedMovie = z.infer<typeof ratedMovieSchema>;
