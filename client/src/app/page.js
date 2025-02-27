"use client";

import React, { useState, useEffect }  from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Partners from "./components/Partners";
import YourIdea from "./components/YourIdea";
import Testimonial from "./components/Testimonial";
import Layout from "./components/Layout";
import Loader from "./components/Loader";



export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
   
        <Loader />
     
    );
  }

  return (
    <Layout>
      <main className="font-poppins justify-center relative pt-[50px] scrollbar-hide">
        <div className="absolute inset-0 -z-10">
          <div className="fixed right-[-20%] bottom-[-2%] w-[1000px] h-[1000px] custom-radial opacity-40 blur-3xl rounded-[50%]"></div>
          <div className="fixed left-[3%] top-[-20%] w-[700px] h-[700px] custom-radial opacity-40 blur-3xl rounded-[50%]"></div>
        </div>

        <Hero />
        <Services />
        <Partners />
        <YourIdea />
        <Testimonial />
      </main>
    </Layout>
  );
}
