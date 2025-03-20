"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000 }),
  ]);

  const scrollPrevious = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  };
  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.7, ease: "easeIn" }}
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <Image
              src={"/smartphone.jpg"}
              alt="prod"
              width={100}
              height={100}
              priority
              quality={100}
              className="w-full h-[30rem]"
            />
          </div>
          <div className="embla__slide">
            <Image
              src={"/gaming_laptop.jpg"}
              alt="prod"
              width={100}
              height={100}
              priority
              quality={95}
              className="w-full h-[30rem]"
            />
          </div>
          <div className="embla__slide">
            <Image
              src={"/tablet.jpg"}
              alt="prod"
              width={100}
              height={100}
              priority
              quality={95}
              className="w-full h-[30rem]"
            />
          </div>
        </div>
      </div>
      <div className="flex mt-5 justify-end gap-3">
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-white bg-primary px-4 py2 rounded-md "
          onClick={scrollPrevious}
        >
          Previous
        </motion.button>
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="text-white bg-primary px-4 py-2 rounded-md "
          onClick={scrollNext}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
}
