export const movieDetailQueryKeys = {
  detail: (id: number) => ["movie", "detail", id] as const,
  accountStates: (id: number) => ["movie", "accountStates", id] as const,
};
