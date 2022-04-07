import React, { useCallback, useEffect, useState } from "react";

function Clock({ roomTimer }) {
  const [timer, setTimer] = useState();
  const timerDisplay = useCallback(
    (seconds) => {
      let m = Math.floor(seconds / 60);
      let s = Math.floor(seconds % 60);
      let mDisplay = m > 0 ? m + (m === 1 ? " min" : " mins") + (s > 0 ? ", " : "") : "";
      let sDisplay = s > 0 ? s + (s === 1 ? " sec" : " secs") : "";
      setTimer(seconds > 0 ? mDisplay + sDisplay : "Times up");
    },
    [setTimer]
  );

  useEffect(() => {
    timerDisplay(roomTimer);
  }, [roomTimer, timerDisplay]);
  return <div>{timer}</div>;
}

export default Clock;
