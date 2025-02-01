import Image from 'next/image'; // Import the Next.js image component
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image1 from '../../app/assets/BackgroundImage.svg';
import Image2 from '../../app/assets/CareersBg.jpg';
import Image3 from '../../app/assets/FoliageBackground.svg';

const slides = [
  {
    image: Image1,
  },
  {
    image: Image2,
  },
  {
    image: Image3,
  },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState('next'); // to track the slide direction

  const nextSlide = () => {
    setDirection('next'); // Set direction to 'next'
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('prev'); // Set direction to 'prev'
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <motion.div
        key={currentSlide}
        className="w-full h-[40vw] sm:h-[60vw] md:h-[70vh] relative"
        initial={{ x: direction === 'next' ? '100%' : '-100%' }} // Start offscreen depending on direction
        animate={{ x: 0 }} // Slide to the center
        exit={{ x: direction === 'next' ? '-100%' : '100%' }} // Move offscreen to the left or right depending on direction
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image
          src={slides[currentSlide].image.src} // Use the Next.js Image component
          alt="Slide"
          layout="fill"
          objectFit="cover"
          priority // Adds higher priority to preloading
        />
      </motion.div>

      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="text-white text-4xl p-2 bg-black bg-opacity-50 rounded-full"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
