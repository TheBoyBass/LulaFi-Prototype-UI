import { createContext, useContext } from "react";

interface ScrollCtx {
  scrollToTop: () => void;
  scrolled: boolean;
}

export const ScrollContext = createContext<ScrollCtx>({
  scrollToTop: () => {},
  scrolled: false,
});

export const useScreenScroll = () => useContext(ScrollContext);
