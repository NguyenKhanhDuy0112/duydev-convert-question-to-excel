import { useState, useEffect } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};
export default useWindowSize;
