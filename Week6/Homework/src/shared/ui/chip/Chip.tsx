import clsx from "clsx";

interface ChipProps {
  label: string;
  isActive?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
}

export const Chip = ({
  label,
  isActive = false,
  readOnly = false,
  onClick,
}: ChipProps) => {
  return (
    <button
      onClick={!readOnly ? onClick : undefined}
      disabled={readOnly}
      className={clsx(
        "px-3 py-1 rounded-full text-sm border transition-colors",
        isActive
          ? "bg-primary-500 text-white border-primary-500"
          : "bg-white text-neutral-600 border-neutral-300",
        !readOnly && !isActive && "hover:border-primary-400 hover:text-primary-500",
        readOnly && "cursor-default"
      )}
    >
      {label}
    </button>
  );
};
