"use client";

import React, { useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import illustration from "../../../public/travel _ travelling, airplane, aeroplane, plane, flight, choose, choice, man, people.png";

const YourIdea = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    reason: "",
  });
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFieldVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const illustrationVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const handleChange = (e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, reason } = formData;

    if (!fullName || !email || !reason) {
      setFormValidMessage("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormValidMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    axios
      .post("https://dev-studio-phi.vercel.com/api/v1/idea/suggestIdea", {
        fullName: formData.fullName,
        emailAddress: formData.email,
        why: formData.reason,
      })
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
        router.push("/ideaThanks");
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response && error.response.status === 400) {
          setFormValidMessage("Invalid input. Please check your details.");
        } else {
          setFormValidMessage("Server error. Please try again later.");
        }
      });
  };

  return (
    <motion.section 
      className="flex items-center justify-start gap-[400px] pt-[100px] font-poppins relative overflow-hidden pb-[47px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
        animate={{
          background: [
            "radial-gradient(circle, rgba(254, 166, 80, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(254, 166, 80, 0.15) 10%, transparent 70%)",
            "radial-gradient(circle, rgba(254, 166, 80, 0.1) 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <motion.div 
        className="pl-[50px] flex flex-col items-start justify-center gap-[20px] relative"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.div 
          className="flex flex-col items-start gap-[25px]"
          variants={formFieldVariants}
        >
          <motion.h1 
            className="font-semibold text-[48px] text-[#F7FCFE] max-w-[570px]"
            whileHover={{
              textShadow: "0 0 8px rgba(247, 252, 254, 0.3)",
            }}
          >
            Got ideas? We've got the skill. Let's team up!
          </motion.h1>

          <motion.p 
            className="font-regular text-[18px] text-[#FEA650] max-w-[350px]"
            variants={formFieldVariants}
          >
            Kindly fill out the form and our representative will get back to you.
          </motion.p>
        </motion.div>

        <motion.form 
          className="flex flex-col items-start gap-[20px]"
          onSubmit={handleSubmit}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div className="flex flex-col items-start gap-[10px]">
            <motion.div 
              className="flex flex-col items-start gap-[20px]"
              variants={formFieldVariants}
            >
              <label htmlFor="fullName" className="text-left text-[#F7FCFE] cursor-pointer font-semibold text-[22px] tracking-[2px]">
                Full name
              </label>
              <motion.input
                name="fullName"
                id="fullName"
                placeholder="enter your full name"
                type="text"
                className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] cursor-pointer rounded-[10px] w-[471px] h-[55px] border-[#464646] border-[1px]"
                whileFocus={{ scale: 1.02 }}
                value={formData.fullName}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div 
              className="flex flex-col items-start gap-[20px]"
              variants={formFieldVariants}
            >
              <label htmlFor="email" className="text-left text-[#F7FCFE] cursor-pointer font-semibold text-[22px] tracking-[2px]">
                Email address
              </label>
              <motion.input
                name="email"
                id="email"
                placeholder="enter your email address"
                type="text"
                className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] cursor-pointer rounded-[10px] w-[471px] h-[55px] border-[#464646] border-[1px]"
                whileFocus={{ scale: 1.02 }}
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div 
              className="flex flex-col items-start gap-[20px]"
              variants={formFieldVariants}
            >
              <label htmlFor="reason" className="text-left text-[#F7FCFE] cursor-pointer font-semibold text-[22px] tracking-[2px]">
                Why are you reaching out to us?
              </label>
              <motion.textarea
                name="reason"
                id="reason"
                placeholder="message..."
                className="font-normal h-[77px] text-[#7B8B76] text-[16px] input-radial p-[10px] cursor-pointer rounded-[10px] w-[471px] border-[#464646] border-[1px]"
                whileFocus={{ scale: 1.02 }}
                value={formData.reason}
                onChange={handleChange}
              />
            </motion.div>
          </motion.div>

          <motion.button
            type="submit"
            className="bg-buttonOrange w-[196px] h-[55px] rounded-[10px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={formFieldVariants}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </motion.button>
          {formValidMessage && (
            <div className="text-red-600 mt-4">
              {formValidMessage}
            </div>
          )}
        </motion.form>
      </motion.div>

      {/* Illustration Section */}
      <motion.div 
        className="flex items-center justify-start gap-[300px] pt-[100px] font-poppins"
        variants={illustrationVariants}
      >
        <motion.div
          whileHover={{ 
            scale: 1.02,
            rotate: 2,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          <img 
            src={illustration.src || "/placeholder.svg"}
            width="600"
            height="600"
            alt="Illustration"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default YourIdea;
