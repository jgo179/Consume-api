import { FaStar } from "react-icons/fa";

export function StarRating({ rating }: { rating: number }) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {roundedRating} , {fullStars} , {halfStar} , {emptyStars}
    </div>
  );
}
