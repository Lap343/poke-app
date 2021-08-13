import { useRef, useState } from "react";

/**
 * Calculates the top scroll and bottom scroll.
 * @returns {[isScrollBottom,onScroll,scrollRef,scrollTop]} An array that contains isScrollBottom, onScroll, scrollRef, and scrollTop
 */
const useScroll = () => {
  // This would be used to set the integer value on how far it is
  // from the top.
  const [scrollTop, setScrollTop] = useState(0);
  // This would be used to set a boolean value based if it is at the
  // bottom.
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  // This reference would be used in order to get the scrollTop
  // and calculate the bottom scroll.
  const scrollRef = useRef();

  const onScroll = () => {
    // Always check if current exists before doing anything.
    if (scrollRef.current) {
      // Destructure these bad boys.
      const { clientHeight, scrollHeight, scrollTop } = scrollRef.current;

      // Set the integer value on how far the scrollbar is from the top,
      // and this would be used to render the up-arrow for moves-list.
      setScrollTop(scrollTop);

      // Calculate if the scrollbar is at the bottom,
      // and if it is then truthy; else, falsy
      scrollHeight - scrollTop <= 1 + clientHeight
        ? setIsScrollBottom(true)
        : setIsScrollBottom(false);
    }
  };

  return [isScrollBottom, onScroll, scrollRef, scrollTop];
};

export default useScroll;
