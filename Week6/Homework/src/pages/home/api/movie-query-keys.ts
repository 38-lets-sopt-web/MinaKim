export const movieQueryKeys = {
  all: ["movies"] as const,
  list: (selectedRating: number | null) =>
    ["movies", "list", selectedRating] as const,
  rated: () => ["movies", "rated"] as const,
};
