// useInterval Hook
// Ref: https://velog.io/@yeyo0x0/React-React-Hooks%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EB%AC%B8%EC%A0%9C
import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export { useInterval };