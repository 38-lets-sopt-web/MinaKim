import { Chip } from "@/shared/ui/chip/Chip";

const RATING_TIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface RatingFilterProps {
  value: number | null;
  onChange: (rating: number | null) => void;
}

export const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
  const handleClick = (tier: number) => {
    onChange(value === tier ? null : tier);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-neutral-500 text-sm shrink-0">별점</span>
      <Chip
        label="전체"
        isActive={value === null}
        onClick={() => onChange(null)}
      />
      {RATING_TIERS.map((tier) => (
        <Chip
          key={tier}
          label={`${tier}점대`}
          isActive={value === tier}
          onClick={() => handleClick(tier)}
        />
      ))}
    </div>
  );
};
