"use client"

import fireCrackSpark from "../../../public/sparks.png"
// Removed Next.js Image import since we're using <img> tags instead
import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Lottie from "lottie-react"
import heroAnimationLeft from "../jsonData/Left side.json"
import heroAnimationRight from "../jsonData/Right side.json"
import { useRouter } from "next/navigation"

const Hero = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const sparkVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: [0, 1, 0.8, 1],
      scale: [0.8, 1.1, 0.9, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  const router = useRouter();

  return (
    <motion.section
      ref={ref}
      style={{ scale }} 
      className="font-poppins w-full flex flex-col items-center gap-[25px] relative"
    >
      <div className="flex items-center justify-between w-full relative top-[-150px]">
        <Lottie animationData={heroAnimationLeft} style={{ width: "900px" }} />
        <Lottie animationData={heroAnimationRight} />
      </div>

      <div className="heroText absolute top-[500px] gap-[25px] w-full flex flex-col items-center">
        <motion.div
          className="w-full flex flex-col items-center gap-[15px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-full py-[50px]">
            <motion.div
              className="absolute top-6 left-[40%]"
              initial="hidden"
              animate="visible"
              variants={sparkVariants}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <img 
                  src={fireCrackSpark.src || "/placeholder.svg"} 
                  alt="Top Spark" 
                  className="filter brightness-110" 
                />
              </motion.div>
            </motion.div>

            <motion.h1
              className="font-semibold text-[64px] text-[#FC7C13] text-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{
                textShadow: "0 0 15px rgba(252, 124, 19, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              DLT HUB
            </motion.h1>

            <motion.div
              className="absolute bottom-6 right-[40%]"
              initial="hidden"
              animate="visible"
              variants={sparkVariants}
            >
              <motion.div
                animate={{
                  rotate: [180, 175, 185, 180],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <img
                  src={fireCrackSpark.src || "/placeholder.svg"}
                  alt="Bottom Spark"
                  className="filter brightness-110"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.p
            className="font-medium text-[18px] text-[#F7FCFE] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A full-service digital agency focused on creativity and result-driven solutions.
          </motion.p>
        </motion.div>

        <motion.h1
          className="font-semibold text-[64px] text-[#F7FCFE] text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{
            textShadow: "0 0 15px rgba(247, 252, 254, 0.3)",
          }}
        >
          Bringing Ideas to Life
        </motion.h1>

        <motion.button
          className="relative overflow-hidden bg-[#FC7C13] px-[46.5px] py-[18px] rounded-[10px] font-medium text-[16px] text-[#F7FCFE] text-center group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/quote")}
        >
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(45deg, #FC7C13, #FF9800, #FFC107, #FC7C13)",
              backgroundSize: "300% 300%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <span className="relative z-10">Grow with us</span>
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              boxShadow: [
                "0 0 20px rgba(252, 124, 19, 0.2)",
                "0 0 30px rgba(252, 124, 19, 0.3)",
                "0 0 20px rgba(252, 124, 19, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.button>
      </div>
    </motion.section>
  )
}

export default Hero
