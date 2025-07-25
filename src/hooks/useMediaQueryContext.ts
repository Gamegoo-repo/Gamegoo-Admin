import { useContext } from "react";

import { MediaQueryContext } from "@/providers/MediaQueryContext";

export const useMediaQueryContext = () => {
  const context = useContext(MediaQueryContext);
  if (!context) {
    throw new Error(
      "useMediaQueryContext 훅은 MediaQueryProvider 내에서 사용되어야 합니다."
    );
  }
  return context;
};
