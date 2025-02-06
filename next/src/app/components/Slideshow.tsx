import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SuccessBg from "../../app/assets/SuccessBg.jpg";
import ResponsibilityBg from "../../app/assets/ResponsibilityBg.jpg";
import ConnectionBg from "../../app/assets/ConnectionBg.jpg";
import OpportunityBg from "../../app/assets/OpportunityBg.jpg";

const slides = [
  // Add image URLs
  {
    image: SuccessBg,
    title: 'Future Success',
    caption: '"Students who have done an internship are 15% less likely to be unemployed in the first years after college and earn 6% more than students who did not." - The State University of New York'
  },

  {
    image: ResponsibilityBg,
    title: 'Responsibility',
    caption: '"Employment teaches students about responsibility and can also reinforce what they are learning in school." - The College Board'
  },

  {
    image: ConnectionBg,
    title: 'Connections',
    caption: '"According to Cornell University\'s Career Center, 80 percent of available jobs are not advertised. Therefore, if you are not connecting with other people, you are likely to miss out on many job opportunities." - U.S. Department of Labor'
  },

  {
    image: OpportunityBg,
    title: 'Limited Opportunities',
    caption: '"Unfortunately, while there was an 8 percent uptick in the number of businesses offering youth internships between 2018 and 2023, internships exclusively for high school students are rare. The 2024 report finds that, of available internships, only 5 percent apply solely to high school students." - Association for Talent Development '
  }
  
];

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function nextStep() {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }

  function prevStep() {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  }

  return (
    <div className="flex flex-col items-center justify-center bg-primary py-[10vw] gap-[1.5vw]">

        <div className="w-full text-center text-[2.5vw] font-bold" style={{fontFamily: 'Montserrat'}}>Why Foliage?</div>

        <div className="relative w-[80vw] h-[40vw] aspect-[16/9] objecet-cover overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction}>
            <motion.div
                variants={variants}
                animate="animate"
                initial="initial"
                exit="exit"
                style={{backgroundImage: `url(${slides[index].image.src})`, fontFamily: 'Montserrat', backgroundPosition: 'center', backgroundSize: 'cover'}}
                
                className="absolute top-0 left-0 w-full h-full flex flex-col text-center items-center justify-center gap-[1vw]"
                key={index}
                custom={direction}
            >
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <div className='px-[5vw] text-[2vw] z-50'>{slides[index].title}</div>
                    <div className='px-[15vw] text-[1vw] z-50'>{slides[index].caption}</div>
            </motion.div>
            </AnimatePresence>
            <button
            onClick={prevStep}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-4 text-lg rounded-full bg-primary text-white hover:bg-teal-900 z-50"
            >
            ◀
            </button>
            <button
            onClick={nextStep}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-4 text-lg rounded-full bg-primary text-white hover:bg-teal-900 z-50"
            >
            ▶
            </button>
        </div>
    </div>
  );
}
