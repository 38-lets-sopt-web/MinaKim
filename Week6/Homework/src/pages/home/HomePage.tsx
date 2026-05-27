import { MovieCard } from "@/pages/home/components/movie-card/MovieCard";
import { RatingFilter } from "@/pages/home/components/rating-filter/RatingFilter";
import { useMovies } from "@/pages/home/hooks/use-movies";
import { useRatedMovies } from "@/pages/home/hooks/use-rated-movies";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w185";
const FALLBACK_POSTER = "https://placehold.co/185x278?text=No+Image";

export default function HomePage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMovies(selectedRating);
  const { data: ratedMovies } = useRatedMovies();
  const navigate = useNavigate();

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <main className="min-h-screen bg-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between mb-6">
          <h1 className="text-h1">Movie Explorer</h1>
          <RatingFilter value={selectedRating} onChange={setSelectedRating} />
        </div>

        {ratedMovies && ratedMovies.length > 0 && (
          <section className="mb-8">
            <h2 className="text-h3 mb-3">내가 평가한 영화</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {ratedMovies.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => navigate(`/${movie.id}`)}
                  className="flex flex-col items-center gap-1 shrink-0 w-24 group"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
                        : FALLBACK_POSTER
                    }
                    alt={movie.title}
                    className="w-24 h-36 object-cover rounded-lg shadow-sm
                      group-hover:scale-105 transition-transform duration-200"
                  />
                  <span className="text-xs text-neutral-600 truncate w-full text-center">
                    {movie.title}
                  </span>
                  <span className="text-xs text-primary-500 font-semibold">
                    ★ {movie.rating}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="text-neutral-400">불러오는 중...</span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <div ref={observerRef} className="py-4 flex justify-center">
          {isFetchingNextPage && (
            <span className="text-neutral-500 text-sm">로딩 중...</span>
          )}
        </div>
      </div>
    </main>
  );
}
