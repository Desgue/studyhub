import React from "react";

export default function useCountDown(initialTime: number, interval = 1000) {
  const [time, setTime] = React.useState(initialTime);

  React.useEffect(() => {
    const countdown = setInterval(() => {
      if (time > 0) setTime((prev) => prev - interval);
    }, interval);
    console.log(time);
    return () => clearInterval(countdown);
  }, [time]);

  return time;
}
