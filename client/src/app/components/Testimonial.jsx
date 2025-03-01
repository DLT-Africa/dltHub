import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonial = () => {
  // Dummy data in case there are no testimonials from backend
  const dummyTestimonials = [
    {
      name: "CrossFi",
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Cello",
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Lisk",
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Canza Finance",
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Arbitrum",
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      name: "Kotani Pay",
      testimony:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
  ];

  const [testimonials, setTestimonials] = useState(dummyTestimonials);

  useEffect(() => {
    axios
      .get("https://dev-studio-phi.vercel.com/api/v1/testimonials/getTestimonies")
      .then((response) => {
        const fetchedTestimonials = response.data && response.data.data;
        if (fetchedTestimonials && fetchedTestimonials.length > 0) {
          setTestimonials(fetchedTestimonials);
        } else {
          setTestimonials(dummyTestimonials);
        }
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setTestimonials(dummyTestimonials);
      });
  }, []);

  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  // If there are 4 or fewer testimonials, center the content.
  const containerClasses = `flex gap-[48px] overflow-x-scroll scrollbar-hide ${
    testimonials.length <= 4 ? "justify-center" : ""
  }`;

  return (
    <section className="pt-[70px] flex flex-col gap-[89px] font-poppins overflow-hidden pb-[136px] relative">
      <div className="flex flex-col items-center gap-[25px]">
        <p className="text-[16px] font-medium text-[#FEA650] text-center">
          What people are saying
        </p>
        <h1 className="text-[48px] font-semibold text-[#F7FCFE] text-center capitalize">
          TESTIMONIALS
        </h1>
      </div>

      <div className="relative">
        <div ref={containerRef} className={containerClasses}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center w-[430px] h-[473px] bg-[#252A24] rounded-[10px] gap-[120px] py-[78px] px-[50px] shrink-0"
            >
              <p className="text-[#FEA650] font-medium text-[16px] w-[314px]">
                {testimonial.testimony}
              </p>
              <h1 className="text-[#F7FCFE] font-medium text-[24px] w-[314px]">
                "{testimonial.name}"
              </h1>
            </div>
          ))}
        </div>

        {/* Only render arrow buttons if more than 4 testimonials */}
        {testimonials.length > 4 && (
          <>
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
            >
              <IoIosArrowBack size={24} className="text-white" />
            </button>
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
            >
              <IoIosArrowForward size={24} className="text-white" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
