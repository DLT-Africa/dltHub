"use client";

import dlt from "../jsonData/logo.json"
import Lottie from "lottie-react";


const Loader = () => {

  return (
    <main className="font-poppins justify-center h-[100vh] flex items-center relative pt-[50px]">
      <div className="absolute inset-0 -z-10">
        <div className="fixed right-[-20%] bottom-[-40%] w-[1000px] h-[1200px] custom-radial opacity-40 blur-3xl rounded-[50%]"></div>
      </div>

      <div className="w-[800.21px] h-[800.21px] flex items-center justify-center">
      <Lottie
                animationData={dlt}
                style={{ width: "100%", height: "100%" }}
                loop
                autoplay
                className="relative left-[-45px]"
              />
      </div>

      
    </main>
  );
};

export default Loader;
