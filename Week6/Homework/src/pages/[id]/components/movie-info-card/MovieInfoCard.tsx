import type { MovieDetail } from "@/pages/[id]/api/movie-detail-schema";

const formatCurrency = (amount: number) =>
  amount > 0 ? `$${amount.toLocaleString()}` : "-";

interface MovieInfoCardProps {
  movie: MovieDetail;
}

export const MovieInfoCard = ({ movie }: MovieInfoCardProps) => {
  const rows = [
    { label: "원제", value: movie.original_title },
    { label: "원어", value: movie.original_language.toUpperCase() },
    {
      label: "제작 국가",
      value: movie.production_countries.map((c) => c.name).join(", ") || "-",
    },
    {
      label: "사용 언어",
      value:
        movie.spoken_languages.map((l) => l.english_name).join(", ") || "-",
    },
    { label: "예산", value: formatCurrency(movie.budget) },
    { label: "수익", value: formatCurrency(movie.revenue) },
  ];

  return (
    <section className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
      <h2 className="text-h4 mb-4">기본 정보</h2>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <dt className="text-body-l text-neutral-500">{label}</dt>
            <dd className="text-body-l text-neutral-800">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
