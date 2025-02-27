import React from 'react';

const Testimonial = () => {
  const Testimonials = [
    { name: "CrossFi", testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." },
    { name: "Cello", testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." },
    { name: "Lisk", testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." },
    { name: "Canza Finance", testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." },
    { name: "Arbitrum", testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." },
    { name: "Kotani Pay", testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis." },
  ];

 
  const scrollingTestimonials = [...Testimonials, ...Testimonials];

  return (
    <section className="pt-[70px] flex flex-col gap-[89px] font-poppins overflow-hidden pb-[136px]">
      <div className="flex flex-col items-center gap-[25px]">
        <p className="text-[16px] font-medium text-[#FEA650] text-center">What people are saying</p>
        <h1 className="text-[48px] font-semibold text-[#F7FCFE] text-center capitalize">TESTIMONIALS</h1>
      </div>

    
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-[48px] animate-marquee">
          {scrollingTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center w-[430px] h-[473px] bg-[#252A24] rounded-[10px] gap-[120px] py-[78px] px-[50px] relative"
            >
              <p className="text-[#FEA650] font-medium text-[16px] w-[314px] relative left-[16px]">
                {testimonial.testimony}
              </p>
              <h1 className="text-[#F7FCFE] font-medium text-[24px] w-[314px]">"{testimonial.name}"</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
