"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Lottie from "lottie-react";
// Removed Next.js Image import

import dlt from "../../../public/dlt-color.png";
import softwareDesign from "../jsonData/Software Development.json";
import mobileDev from "../jsonData/Mobile Development.json";
import blockchainDev from "../jsonData/Blockchain.json";
import webDev from "../jsonData/Web Development.json";
import contentWrite from "../jsonData/Content Writing.json";
import spining from "../../../public/spinnigbg.png";

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: ((index % 3) - 1) * 100,
    y: index < 3 ? -100 : 100,
    scale: 0.8,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const dltVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

const Services = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.3, once: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const serviceCards = [
    {
      animationData: softwareDesign,
      width: 271,
      height: 296.66,
      title: "Software Development",
      size: "text-[24px]",
      adjust: "left-[-30px]",
    },
    {
      animationData: blockchainDev,
      width: 349,
      height: 382.05,
      title: "Blockchain Development",
      size: "text-[35px]",
      adjust: "left-[-45px]",
    },
    {
      animationData: contentWrite,
      width: 271,
      height: 296.66,
      title: "Content Writing",
      size: "text-[24px]",
      adjust: "left-[-30px]",
    },
    {
      animationData: mobileDev,
      width: 349,
      height: 382.05,
      title: "Mobile App Development",
      size: "text-[35px]",
    },
    {
      animationData: webDev,
      width: 349,
      height: 382.05,
      title: "Website Development",
      size: "text-[37px]",
    },
  ];

  return (
    <section
      ref={ref}
      className="font-poppins w-full flex flex-col pt-[62px] px-[50px] gap-[51px] min-h-screen pb-[100px] scrollbar-hide"
    >
      <motion.div
        className="w-full flex flex-col items-center text-center gap-[25px]"
        initial="hidden"
        animate={controls}
        variants={headerVariants}
      >
        <p className="text-[#FEA650] font-medium text-[16px]">What we do</p>
        <p className="text-[#F7FCFE] font-semibold text-[40px] capitalize">
          PROJECTS WE WORK ON
        </p>
      </motion.div>

      <div className="flex flex-col items-center w-full scrollbar-hide">
        <div className="w-full flex flex-col items-center gap-[125px] scrollbar-hide">
          <div className="flex relative items-center gap-[300px]">
            {serviceCards.slice(0, 3).map((card, index) => (
              <motion.div
                key={card.title}
                className="flex flex-col items-start"
                style={{ width: `${card.width}px` }}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={cardVariants}
                transition={{ duration: 0.3 }}
              >
                <Lottie
                  animationData={card.animationData}
                  loop
                  autoplay
                  className={`relative ${card.adjust}`}
                />

                <p
                  className={`font-medium ${card.size} text-[#F7FCFE] tracking-[2px] break-words`}
                >
                  {card.title}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex relative items-center gap-[300px] scrollbar-hide">
            <motion.div
              className="flex flex-col items-start"
              style={{ width: "349px" }}
              custom={3}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              transition={{ duration: 0.3 }}
            >
              <Lottie
                animationData={mobileDev}
                style={{ width: "100%", height: "100%" }}
                loop
                autoplay
                className="relative left-[-45px]"
              />
              <p className="font-medium text-[35px] tracking-[2px] text-[#F7FCFE]">
                Mobile App Development
              </p>
            </motion.div>

            <motion.div
              className="relative flex items-center justify-center scrollbar-hide"
              initial="hidden"
              animate={controls}
              variants={dltVariants}
            >
              <div className="absolute w-[1324.21px] h-[1324.21px] flex items-center justify-center">
                <img
                  src={spining.src}
                  alt="Spinning Background"
                  className="animate-spin object-contain [animation-duration:10s] w-full h-full"
                />
              </div>

              <div className="absolute w-[500px] h-[500px] bg-custom-radial opacity-50 blur-2xl rounded-full -z-10" />

              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <img src={dlt.src} alt="DLT logo" />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col items-start"
              style={{ width: "349px" }}
              custom={4}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              transition={{ duration: 0.3 }}
            >
              <Lottie
                animationData={webDev}
                style={{ width: "100%", height: "100%" }}
                loop
                autoplay
                className="relative left-[-45px]"
              />
              <p className="font-medium text-[37px] tracking-[2px] text-[#F7FCFE]">
                Website Development
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
