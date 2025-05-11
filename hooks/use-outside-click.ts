import { useEffect } from 'react';

type UseOutsideClickProps = {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
};

export function useOutsideClick({ ref, callback }: UseOutsideClickProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside of the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
