"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import LeftArrow from "../assets/ionicons/chevron-back-sharp.svg";
import RightArrow from "../assets/ionicons/chevron-forward-sharp.svg"
import type { StaticImageData } from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string | StaticImageData;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [handleNext, autoplay]);

  const randomRotateY = () => {
    return 0;
  };
  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-[1vw]">
      <div className="relative grid grid-cols-1 md:grid-cols-2  gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={Math.random()*1000}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={1000}
                    height={1000}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <p className="text-tertiary text-[1.25vw] font-semibold" style={{fontFamily: 'Montserrat'}}>
              {testimonials[active].designation}
            </p>
            <motion.p className="text-[1vw] text-tertiary mt-4" style={{fontFamily: 'Montserrat'}}>
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>

        
      </div>
      <div className="flex gap-4 mt-[2vw] md:pt-0 justify-center">
            <button
              onClick={handlePrev}
              className="h-[3vw] w-[3vw] rounded-full bg-primary flex items-center justify-center group/button"
            >
              <img src={LeftArrow.src} className="p-[0.5vw]"></img>
            </button>
            <button
              onClick={handleNext}
              className="h-[3vw] w-[3vw] rounded-full bg-primary flex items-center justify-center group/button"
            >
              <img src={RightArrow.src} className="p-[0.5vw]"></img>
            </button>
          </div>
    </div>
  );
};
