import {
  useDeleteRating,
  usePostRating,
} from "@/pages/[id]/hooks/use-movie-rating";
import { useState } from "react";

const MIN = 0.5;
const MAX = 10;

interface RatingCardProps {
  movieId: number;
  initialRating?: number;
}

export const RatingCard = ({ movieId, initialRating }: RatingCardProps) => {
  const [input, setInput] = useState(initialRating?.toString() ?? "");
  const [message, setMessage] = useState("");

  const { mutate: postRating, isPending: isPosting } = usePostRating(movieId);
  const { mutate: deleteRating, isPending: isDeleting } =
    useDeleteRating(movieId);

  const handleSave = () => {
    const value = Number(input);

    if (isNaN(value) || value < MIN || value > MAX) {
      setMessage(`${MIN}~${MAX} 사이의 값을 입력해주세요.`);
      return;
    }

    postRating(value, {
      onSuccess: () => setMessage("별점이 저장되었습니다!"),
      onError: () => setMessage("저장에 실패했습니다."),
    });
  };

  const handleDelete = () => {
    deleteRating(undefined, {
      onSuccess: () => {
        setInput("");
        setMessage("별점이 삭제되었습니다.");
      },
      onError: () => setMessage("삭제에 실패했습니다."),
    });
  };

  return (
    <section className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
      <h2 className="text-h4 mb-4">내 별점</h2>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={MIN}
          max={MAX}
          step={0.5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0.5 ~ 10"
          className="w-28 border border-neutral-300 rounded-lg px-3 py-2 text-sm
            focus:outline-none focus:border-primary-500"
        />
        <button
          onClick={handleSave}
          disabled={isPosting}
          className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm
            hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          저장
        </button>
        {initialRating !== undefined && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-600
              text-sm hover:border-neutral-400 disabled:opacity-50 transition-colors"
          >
            별점 삭제하기
          </button>
        )}
      </div>
      {message && <p className="mt-3 text-sm text-primary-600">{message}</p>}
    </section>
  );
};
