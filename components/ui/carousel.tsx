'use client';

import { useEffect, useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';

interface Slide {
  title: string;
  src: string | null;
}

interface CarouselProps {
  slides: Slide[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
  });

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const cardWidth = 320;
  const gap = 32;

  const getTranslateX = () => {
    const offset = (cardWidth + gap) * current;
    return `translateX(-${offset}px)`;
  };

  return (
    <div className="w-full flex flex-col items-center overflow-hidden" {...swipeHandlers}>
      <div
        ref={containerRef}
        className="w-full max-w-7xl overflow-hidden px-4 relative"
      >
        <ul
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: getTranslateX(),
            gap: `${gap}px`,
            paddingBottom: '20px',
            paddingRight: '140px', // allow last card to peek
          }}
        >
          {slides.map((slide, index) => (
            <li
              key={index}
              className={`flex-shrink-0 transition-all duration-300 cursor-pointer ${
                index === current ? 'scale-105 z-10' : 'scale-95 opacity-70'
              }`}
              style={{ width: `${cardWidth}px` }}
              onClick={() => setCurrent(index)}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden h-[340px] flex flex-col justify-between">
                {slide.src ? (
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    width={320}
                    height={220}
                    className="object-cover w-full h-56"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-indigo-900">{slide.title}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="bg-white text-gray-700 px-4 py-2 rounded-full shadow border hover:bg-gray-100 transition"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-gray-700 px-4 py-2 rounded-full shadow border hover:bg-gray-100 transition"
        >
          →
        </button>
      </div>
    </div>
  );
}
