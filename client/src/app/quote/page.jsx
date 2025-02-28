"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import spining from "../../../public/spinnigbg.png";
import Testimonial from "../components/Testimonial";
import GetAQuoteForm from "../components/GetAQuoteForm";
import PersonalInfo from "../components/PersonalInfo";
import Layout from "../components/Layout";

const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
};

const Page = () => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState("quote");
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    tags: "",
    docs: [""],
    description: "",
    personal: {
      fullName: "",
      country: "",
      email: "",
      calendly: "",
      phoneNo: "",
      linkedIn: "",
      twitter: "",
    },
  });

  console.log(formData);

  const updateQuoteData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const updatePersonalData = (data) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...data },
    }));
  };

  const fullPhoneNumber = `(${formData.personal.dialCode}) ${formData.personal.phoneNo}`;

  console.log(fullPhoneNumber);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setFormValidMessage("");

    if (
      !formData.tags ||
      !formData.description ||
      !formData.personal.fullName ||
      !formData.personal.email
    ) {
      setFormValidMessage("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.personal.email)) {
      setFormValidMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    axios
      .post("http://localhost:5000/api/v1/projects/regProject", {
        tags: formData.tags,
        projectDoc: formData.docs,
        description: formData.description,
        personalInfo: {
          fullName: formData.personal.fullName,
          country: formData.personal.country,
          email: formData.personal.email,
          calendly: formData.personal.calendly,
          phoneNo: fullPhoneNumber,
          linkedIn: formData.personal.linkedIn,
          twitter: formData.personal.twitter,
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsSubmitting(false);
        router.push("/projectThanks");
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
    <Layout>
      <main className="font-poppins justify-center relative pt-[50px]">
        <div className="absolute inset-0 -z-10">
          <div className="fixed right-[-20%] bottom-[-20%] w-[1000px] h-[1200px] custom-radial opacity-40 blur-3xl rounded-[50%]"></div>
        </div>

        <AnimatePresence mode="wait">
          {currentForm === "quote" && (
            <motion.div
              key="quote"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <GetAQuoteForm
                initialData={{
                  tags: formData.tags,
                  docs: formData.docs,
                  description: formData.description,
                }}
                updateData={updateQuoteData}
                onContinue={() => setCurrentForm("personal")}
              />
            </motion.div>
          )}

          {currentForm === "personal" && (
            <motion.div
              key="personal"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PersonalInfo
                initialData={formData.personal}
                updateData={updatePersonalData}
                onBack={() => setCurrentForm("quote")}
                onSubmit={handleFinalSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {formValidMessage && (
          <div className="text-red-600 mt-4 text-center">{formValidMessage}</div>
        )}

        <div className="w-full relative overflow-hidden">
          <img
            src={spining.src}
            alt="Spinning background"
            className="absolute animate-spin [animation-duration:10s] top-[40px]"
          />
          <Testimonial />
        </div>
      </main>
    </Layout>
  );
};

export default Page;
