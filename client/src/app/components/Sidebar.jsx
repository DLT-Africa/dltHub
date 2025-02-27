"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion } from "framer-motion";
import { RiHome6Line } from "react-icons/ri";
import { HiCog } from "react-icons/hi";
import { PiFolderFill } from "react-icons/pi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className="h-[932px] w-[932px] fixed right-[-800px] top-[-30px] z-10"
    >
      <motion.div
        className={`w-full h-full bg-[#000000] rounded-full shadow-lg flex items-center justify-start pl-[50px] relative transition-all duration-500 ${
          isOpen ? "border-none" : "border-[1px]"
        }`}
      >
        {isOpen && (
          <div className="absolute inset-0 rounded-full bg-[#000000] blur-lg"></div>
        )}

        <div className="relative z-10 flex items-center">
          <HiMenuAlt3
            className="text-[50px] text-[#FC7C13] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />

          <motion.div
            initial={{ x: -200, scale: 0, opacity: 0 }}
            animate={{
              x: isOpen ? -500 : -200,
              scale: isOpen ? 1 : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="w-[635px] h-[582px] rounded-full bg-[#000000] absolute left-[-80px] shadow-lg flex items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full bg-[#000000] blur-lg"></div>

            <nav className="relative z-10 w-full h-full rounded-full flex items-center justify-start px-[37px] gap-[112px]">
              <HiMenuAlt3
                className="text-[50px] text-[#FC7C13] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />

              <div className="w-[302px] text-[22px] font-bold font-poppins text-[#FC7C13] flex flex-col gap-[75px]">
                <Link href="/" passHref>
                  <div className="w-full flex items-center justify-between cursor-pointer">
                    <p>Home</p>
                    <RiHome6Line />
                  </div>
                </Link>
                <Link href="/#services" passHref>
                  <div className="w-full flex items-center justify-between cursor-pointer">
                    <p>Services</p>
                    <HiCog />
                  </div>
                </Link>
                <Link href="/portfolio" passHref>
                  <div className="w-full flex items-center justify-between cursor-pointer">
                    <p>Portfolio</p>
                    <PiFolderFill />
                  </div>
                </Link>
              </div>
            </nav>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
