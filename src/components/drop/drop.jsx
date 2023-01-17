import "./drop.scss";

const Drop = () => {
  return (
    <div className="drop">
      <svg viewBox="0 0 50 42">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="50%" x2="0%" y2="50%">
            <stop offset="0.6" stopColor="white" stopOpacity={1} />
            <stop offset="0.6" stopColor="rgb(35,137,218)" stopOpacity={0.5} />
            <stop offset="0.6" stopColor="rgb(35,137,218)" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <path
          id="tear"
          className="tear"
          d="M15 6
              Q 15 6, 25 18
              A 12.8 12.8 0 1 1 5 18
              Q 15 6 15 6z"
          fill="url(#grad1)"
        />
      </svg>
    </div>
  );
};

export default Drop;
