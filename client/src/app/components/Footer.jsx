"use client";

import { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";

import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import footerAnimation from "../jsonData/Footer darker.json";

const Footer = () => {
  
  const [subscribeData, setSubscribeData] = useState({ email: "" });
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribeChange = (e) => {
    setSubscribeMessage("");
    setSubscribeData({ email: e.target.value });
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    const { email } = subscribeData;

    if (!email) {
      setSubscribeMessage("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);

    axios
      .post("http://localhost:5000/api/v1/newsLetter/subscribe", { emailAddress: email })
      .then((response) => {
        console.log(response.data);
        setIsSubscribing(false);
        setSubscribeMessage("Thank you for subscribing!");
        setSubscribeData({ email: "" });
      })
      .catch((error) => {
        setIsSubscribing(false);
        if (error.response && error.response.status === 400) {
          setSubscribeMessage("Invalid input. Please check your details.");
        } else {
          setSubscribeMessage("Server error. Please try again later.");
        }
      });
  };

  return (
    <footer className="h-[582px] w-full border-t-[#3BF500] border-t-[1px] px-[78px] py-[84px] relative bg-[#000000] bg-footer-bg background font-poppins overflow-hidden">
      <div className="flex items-start gap-[187px]">
        <div className="flex flex-col items-center gap-[20px] w-[223.03px]">
          <div className="flex flex-col gap-[10px] items-center">
            <img src="/dltfooter.png" alt="DLT logo" />
            <p className="text-[#FEA650] text-[16px] font-medium">
              innovating through Web 3...
            </p>
          </div>
          <div className="flex items-center text-[#000000] text-center text-[24px] gap-[10px] w-[170px]">
            <a
              href="https://github.com/DLT-Africa"
              target="_blank"
              className="bg-white p-[13px] rounded-full"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/company/dlt-africa"
              target="_blank"
              className="bg-white p-[13px] rounded-full"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/dlt_africa"
              target="_blank"
              className="bg-white p-[13px] rounded-full"
            >
              <BsTwitterX />
            </a>
          </div>
        </div>

        <div className="w-[310px] flex flex-col gap-3">
          <h1 className="text-[#FEA650] font-openSans text-[24px] font-bold">
            Contact Us
          </h1>
          <p className="font-sourceSans text-[16px] font-normal">
            66 Central Road, Dartford DA1 5, UN
          </p>
          <div>
            <h3 className="font-openSans text-[16px] font-bold">
              For more info about our Classes
            </h3>
            <p className="font-sourceSans text-[16px] font-normal">
              (44) 7957 120395
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-[32px]">
          <h1 className="text-[#FEA650] font-poppins text-[16px] font-medium">
            Subscribe to our newsletter
          </h1>
          <form onSubmit={handleSubscribeSubmit}>
            <input
              type="text"
              className="w-[255px] p-[10px] bg-transparent text-[#FEA650] placeholder:text-[#FEA650] outline-none border-none placeholder:opacity-70 border rounded-[10px]"
              placeholder="enter your email"
              value={subscribeData.email}
              onChange={handleSubscribeChange}
            />
            <button
              type="submit"
              className="text-[#FEA650] font-poppins text-[16px] w-[196px] p-[10px] border-buttonOrange border rounded-[10px] mt-2"
              disabled={isSubscribing}
            >
              {isSubscribing ? "Submitting..." : "Subscribe"}
            </button>
          </form>
          {subscribeMessage && (
            <div className="text-red-600 mt-4">{subscribeMessage}</div>
          )}
        </div>
      </div>

      <div className="w-[478px] h-[478px] absolute bottom-[-55px] right-0 overflow-hidden">
        <Lottie
          animationData={footerAnimation}
          style={{ width: "100%", height: "100%" }}
          loop
          autoplay
          className="relative left-[-45px]"
        />
      </div>
    </footer>
  );
};

export default Footer;
