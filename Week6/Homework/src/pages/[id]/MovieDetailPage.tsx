import { useNavigate, useParams } from "react-router-dom";
import { Chip } from "@/shared/ui/chip/Chip";

import {
  FALLBACK_BACKDROP,
  FALLBACK_POSTER,
  TMDB_IMAGE_BASE_ORIGINAL,
  TMDB_IMAGE_BASE_W500,
} from "@/pages/[id]/constants/tmdb-image";
import { useMovieDetail } from "@/pages/[id]/hooks/use-movie-detail";
import { useMovieAccountStates } from "@/pages/[id]/hooks/use-movie-account-states";
import { MovieInfoCard } from "@/pages/[id]/components/movie-info-card/MovieInfoCard";
import { RatingCard } from "@/pages/[id]/components/rating-card/RatingCard";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const { data: movie, isLoading } = useMovieDetail(movieId);
  const { data: accountStates } = useMovieAccountStates(movieId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-200 flex items-center justify-center">
        <span className="text-neutral-500">불러오는 중...</span>
      </main>
    );
  }

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_W500}${movie.poster_path}`
    : FALLBACK_POSTER;

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_ORIGINAL}${movie.backdrop_path}`
    : FALLBACK_BACKDROP;

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
    : "-";

  const initialRating =
    accountStates?.rated !== false ? accountStates?.rated.value : undefined;

  return (
    <main className="min-h-screen bg-neutral-200">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-5">
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center gap-1 text-sm text-neutral-600
            hover:text-neutral-900 transition-colors"
        >
          ← 목록으로 돌아가기
        </button>
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-56 overflow-hidden">
            <img
              src={backdropUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-6 px-6 pb-6">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-32 rounded-lg shadow-md -mt-14 shrink-0 self-start border-2 border-white"
            />
            <div className="flex flex-col gap-2 pt-4 flex-1 min-w-0">
              <h1 className="text-h2">{movie.title}</h1>
              <div className="flex items-center gap-3 text-body-l text-neutral-600">
                <span className="text-primary-500 font-semibold">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
                <span>{movie.release_date}</span>
                <span>⏱ {runtime}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Chip key={genre.id} label={genre.name} readOnly isActive />
                ))}
              </div>
              <p className="text-body-l text-neutral-700 leading-relaxed mt-1">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
          </div>
        </article>

        <MovieInfoCard movie={movie} />

        <RatingCard
          key={initialRating ?? "no-rating"}
          movieId={movieId}
          initialRating={initialRating}
        />
      </div>
    </main>
  );
}
