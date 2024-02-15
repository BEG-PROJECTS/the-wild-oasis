import { useEffect, useRef } from "react";
export function useOutsideClick(func, listenCapturing = true) {
  const ref = useRef();
  useEffect(function () {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) func();
    }
    document.addEventListener('click', handleClick, listenCapturing);
    return () => document.removeEventListener('click', handleClick);
  }, [func, listenCapturing]);

  return ref;
}

