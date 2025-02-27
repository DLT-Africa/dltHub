"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import cartesi from "../../../public/Cartesi Lockup Black 1.png";
import kotani from "../../../public/Kotani-white 1.png";
import lisk from "../../../public/LISK 1.png";
import celo from "../../../public/celo white 1.png";
import canza from "../../../public/download (13) 3.png";
import bitmama from "../../../public/bitmama 1.png";

const partners = [
  { image: cartesi, name: "Cartesi" },
  { image: kotani, name: "Kotani" },
  { image: lisk, name: "Lisk" },
  { image: celo, name: "Celo" },
  { image: canza, name: "Canza" },
  { image: bitmama, name: "Bitmama" },
];

const Partners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-100px 0px",
    once: false,
  });

  return (
    <motion.div
      ref={containerRef}
      className="pt-[52px] pb-[64px] flex flex-col gap-[60px] overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="fixed left-[-20%] bottom-[-2%] w-[1000px] h-[1000px] custom-radial blur-[100px] z-[-1] rounded-[50%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.2 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="flex flex-col items-center w-full gap-[25px]"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="font-medium text-[16px] text-[#FEA650] font-poppins"
          whileHover={{ scale: 1.05 }}
        >
          Our partners
        </motion.p>
        <motion.h1
          className="capitalize text-[#F7FCFE] text-[40px] font-semibold text-center"
          whileHover={{ textShadow: "0 0 8px rgba(247, 252, 254, 0.3)" }}
        >
          MEET OUR COLLABORATORS
        </motion.h1>
      </motion.div>

      <div className="w-full overflow-hidden relative mt-[35px]">
        <div className="flex w-max animate-infinite-scroll whitespace-nowrap">
          {[...partners, ...partners].map((partner, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[200px] h-[100px] flex items-center justify-center mx-4"
              whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={partner.image}
                width={200}
                height={100}
                alt="alternative text"
                className={
                  partner.name === "Canza" || partner.name === "Kotani"
                    ? "h-[120px] w-auto"
                    : "h-[50px] w-auto "
                }
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          display: flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default Partners;
