interface ReviewsProps {
  voteAverage: number;
  voteCount: number;
}

export function Reviews({ voteAverage, voteCount }: ReviewsProps) {
  if (!voteAverage || !voteCount) return;
  return (
    <div className="flex items-center w-full  justify-around">
      <div className="text-white m-2">
        <div
          className="radial-progress text-success"
          style={{
            // @ts-ignore
            "--value": Math.round(voteAverage * 10),
            "--size": "4rem",
            "--thickness": "4px",
          }}
        >
          <span className="text-white text-bold">
            {" "}
            {Math.round(voteAverage * 10) / 10}/10
          </span>
        </div>
      </div>
      <div className="ml-5">
        <p>
          {voteAverage} <span className="font-extralight">ratings</span>
        </p>
        <p>
          {voteCount} <span className="font-extralight">reviews</span>
        </p>
      </div>
    </div>
  );
}
