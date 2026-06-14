import { z } from "zod";

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const movieDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  original_language: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  runtime: z.number().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  genres: z.array(genreSchema),
  production_countries: z.array(
    z.object({ iso_3166_1: z.string(), name: z.string() })
  ),
  spoken_languages: z.array(
    z.object({
      iso_639_1: z.string(),
      name: z.string(),
      english_name: z.string(),
    })
  ),
  budget: z.number(),
  revenue: z.number(),
});

export const accountStatesSchema = z.object({
  id: z.number(),
  rated: z.union([z.object({ value: z.number() }), z.literal(false)]),
});

export type MovieDetail = z.infer<typeof movieDetailSchema>;
export type AccountStates = z.infer<typeof accountStatesSchema>;
