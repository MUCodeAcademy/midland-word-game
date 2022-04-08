import React, { useCallback, useEffect, useState } from "react";

function Clock({ roomTimer }) {
  const [timer, setTimer] = useState();
  const timerDisplay = useCallback(
    (seconds) => {
      let m = Math.floor(seconds / 60);
      let s = Math.floor(seconds % 60);
      let mDisplay = m > 0 ? m : "0";
      let sDisplay;
      if (s > 0 && s < 10) {
        sDisplay = `0${s}`;
      } else if (s > 0) {
        sDisplay = s;
      } else {
        sDisplay = "00";
      }
      setTimer(mDisplay + ":" + sDisplay);
    },
    [setTimer]
  );

  useEffect(() => {
    timerDisplay(roomTimer);
  }, [roomTimer, timerDisplay]);
  return (
    <div className="clock">
      <div style={{ fontWeight: "bold" }}>Time Remaining</div>
      {timer}
    </div>
  );
}

export default Clock;
