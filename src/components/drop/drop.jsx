import { useState } from "react";
import "./drop.scss";

const Drop = () => {
  // const percent = 100 - props.percent;
  // console.log(props.percent);
  // const [rainPercent, setRainPercent] = useState("");
  // setRainPercent(props.percent);

  return (
    <div className="drop">
      <svg viewBox="0 0 50 42">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="50%" x2="0%" y2="50%">
            {/* <stop offset="0.01" stopColor="#ffffff" stopOpacity={1} />
            <stop offset="0.01" stopColor="#0000ff" stopOpacity={1} /> */}

            <stop offset="0.6" stopColor="white" stopOpacity={1} />
            <stop offset="0.6" stopColor="rgb(35,137,218)" stopOpacity={0.5} />
            <stop offset="0.6" stopColor="rgb(35,137,218)" stopOpacity={0.5} />

            {/* <stop
              // offset={`${100 - rainPercent}%`}
              stopColor="transparent"
              stopOpacity={1}
            />
            <stop
              // offset={`${100 - rainPercent}%`}
              stopColor="rgb(35,137,218)"
              stopOpacity={1}
            /> */}
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
