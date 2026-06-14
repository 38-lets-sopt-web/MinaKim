import type { Movie } from "@/pages/home/api/movie-schema";
import { useNavigate } from "react-router-dom";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "https://placehold.co/500x750?text=No+Image";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const { id, title, poster_path, release_date, overview, vote_average } =
    movie;

  const posterUrl = poster_path
    ? `${TMDB_IMAGE_BASE}${poster_path}`
    : FALLBACK_IMAGE;

  return (
    <article
      onClick={() => navigate(`/${id}`)}
      className="group flex flex-col rounded-lg bg-white cursor-pointer overflow-hidden
        border border-neutral-200 shadow-sm
        transition-all duration-200 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover
            group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col gap-1 p-3 overflow-hidden">
        <h2 className="text-h4 truncate">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-accent text-body-l font-semibold">
            ★ {vote_average.toFixed(1)}
          </span>
          <span className="text-neutral-500 text-body-l">{release_date}</span>
        </div>
        <p className="text-neutral-600 text-body-l leading-relaxed line-clamp-2">
          {overview || "줄거리 정보가 없습니다."}
        </p>
      </div>
    </article>
  );
};
