"use client";

import { useState, useEffect, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";

const PersonalInfo = ({ initialData, updateData, onBack, onSubmit, isSubmitting }) => {
  // State for the full countries list
  const [countries, setCountries] = useState([]);
  // State to control visibility of the phone dial dropdown
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  // State for the selected country used for phone dialing
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState(null);
  // State for filtering the phone dial dropdown
  const [dialSearch, setDialSearch] = useState("");
  const dropdownRef = useRef();

  // Fetch countries and default to USA if available
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sorted);
        // Default to USA (cca2 === "US")
        const defaultCountry = sorted.find((country) => country.cca2 === "US");
        if (defaultCountry) {
          setSelectedPhoneCountry(defaultCountry);
          const dialCode =
            defaultCountry.idd?.root && defaultCountry.idd.suffixes?.[0]
              ? defaultCountry.idd.root + defaultCountry.idd.suffixes[0]
              : "";
          updateData({ dialCode });
          if (!initialData.country) {
            updateData({ country: defaultCountry.name.common });
          }
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Handle selection from the phone dial dropdown
  const handlePhoneCountrySelect = (country) => {
    setSelectedPhoneCountry(country);
    setPhoneDropdownOpen(false);
    setDialSearch(""); // reset search field
    if (country && country.idd?.root && country.idd.suffixes?.length) {
      const dialCode = country.idd.root + country.idd.suffixes[0];
      updateData({ dialCode });
    } else {
      updateData({ dialCode: "" });
    }
  };

  // Handle changes in the personal country select
  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    const selected = countries.find((c) => c.cca2 === selectedCode);
    if (selected) {
      updateData({ country: selected.name.common });
    } else {
      updateData({ country: "" });
    }
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPhoneDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Filter the country list based on the dial search input.
  const filteredCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    let dialCode = "";
    if (country.idd?.root && country.idd.suffixes?.[0]) {
      dialCode = (country.idd.root + country.idd.suffixes[0]).toLowerCase();
    }
    return (
      countryName.includes(dialSearch.toLowerCase()) ||
      dialCode.includes(dialSearch.toLowerCase())
    );
  });

  return (
    <section className="flex flex-col gap-[95px] w-full items-center relative justify-center pt-[78px] pb-[65px] select-none">
      <div className="flex flex-col items-center gap-[15px]">
        <h1 className="text-[#FC7C13] text-[64px] font-semibold">Personal Information</h1>
        <p className="text-[#F7FCFE] font-medium text-[18px]">Let’s get to know you better.</p>
      </div>

      <form className="flex flex-col w-full items-center gap-[50px]" onSubmit={onSubmit}>
        <div className="w-[60%] grid grid-cols-2 gap-x-[151px] gap-y-[25px] items-center justify-center">
          {/* Full Name */}
          <div className="w-full flex flex-col gap-[20px]">
            <label
              htmlFor="fullName"
              className="text-left text-[#F7FCFE] font-semibold text-[22px] tracking-[2px]"
            >
              Full name
            </label>
            <input
              placeholder="DLT Hub"
              id="fullName"
              type="text"
              value={initialData.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
              className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] h-[55px] border border-[#464646] outline-none"
            />
          </div>

          {/* Personal Country Select */}
          <div className="w-full flex flex-col gap-[20px]">
            <label
              htmlFor="country"
              className="text-left text-[#F7FCFE] font-semibold text-[22px] tracking-[2px]"
            >
              Country
            </label>
            <select
              id="country"
              value={
                countries.find((c) => c.name.common === initialData.country)?.cca2 || ""
              }
              onChange={handleCountryChange}
              className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] h-[55px] border border-[#464646] outline-none"
            >
              <option value="" disabled>
                Select your country
              </option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.cca2}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div className="w-full flex flex-col gap-[20px]">
            <label
              htmlFor="email"
              className="text-left text-[#F7FCFE] font-semibold text-[22px] tracking-[2px]"
            >
              Email Address
            </label>
            <input
              placeholder="dlt@hub.com"
              id="email"
              type="text"
              value={initialData.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] h-[55px] border border-[#464646] outline-none"
            />
          </div>

          {/* Calendly */}
          <div className="w-full flex flex-col gap-[20px]">
            <label
              htmlFor="calendly"
              className="text-left text-[#F7FCFE] font-semibold text-[22px] tracking-[2px]"
            >
              Calendly link
            </label>
            <input
              placeholder="https://..."
              id="calendly"
              type="text"
              value={initialData.calendly}
              onChange={(e) => updateData({ calendly: e.target.value })}
              className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] h-[55px] border border-[#464646] outline-none"
            />
          </div>

          {/* Phone Number with Custom Phone Dial Selector */}
          <div className="w-full flex flex-col gap-[20px] relative">
            <label
              htmlFor="phoneNo"
              className="text-left text-[#F7FCFE] font-semibold text-[22px] tracking-[2px]"
            >
              Phone number
            </label>
            <div className="flex">
              {/* Phone Dial Selector Button */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setPhoneDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center w-[55px] h-[55px] border border-[#464646] rounded-l-[10px] bg-black"
                >
                  {selectedPhoneCountry ? (
                    <Image
                      src={selectedPhoneCountry.flags.png}
                      alt={selectedPhoneCountry.name.common}
                      width={30}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-white">USA</span>
                  )}
                </button>
                {phoneDropdownOpen && (
                  <div className="absolute z-10 w-[200px] max-h-60 overflow-y-auto bg-black border border-[#464646] mt-1 rounded-[10px]">
                    {/* Search input for filtering */}
                    <input
                      type="text"
                      placeholder="Search..."
                      value={dialSearch}
                      onChange={(e) => setDialSearch(e.target.value)}
                      className="w-full p-2 bg-gray-800 text-white outline-none"
                    />
                    {filteredCountries.map((country) => {
                      const telCode =
                        country.idd?.root && country.idd.suffixes?.[0]
                          ? country.idd.root + country.idd.suffixes[0]
                          : "";
                      return (
                        <button
                          key={country.cca2}
                          type="button"
                          onClick={() => handlePhoneCountrySelect(country)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-700 w-full text-left text-white"
                        >
                          <Image
                            src={country.flags.png}
                            alt={country.name.common}
                            width={30}
                            height={20}
                            className="object-contain"
                          />
                          <span className="text-sm">{telCode}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {/* Phone Number Input */}
              <input
                placeholder="Enter phone number"
                id="phoneNo"
                type="text"
                value={initialData.phoneNo}
                onChange={(e) => updateData({ phoneNo: e.target.value })}
                className="flex-1 font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-r-[10px] h-[55px] border border-[#464646] outline-none"
              />
            </div>
            {/*
              Note: At submission, combine the dial code and the phone number.
              For example, the final value will look like:
              "(+234) 816 9211 501"
            */}
          </div>

          {/* LinkedIn */}
          <div className="w-full flex flex-col gap-[20px]">
            <label
              htmlFor="linkedIn"
              className="text-left text-[#F7FCFE] font-semibold text-[22px] tracking-[2px]"
            >
              LinkedIn
            </label>
            <input
              placeholder="https://..."
              id="linkedIn"
              type="text"
              value={initialData.linkedIn}
              onChange={(e) => updateData({ linkedIn: e.target.value })}
              className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] h-[55px] border border-[#464646] outline-none"
            />
          </div>

          {/* Twitter */}
          <div className="w-full flex flex-col gap-[20px]">
            <label
              htmlFor="twitter"
              className="text-left text-[#F7FCFE] font-semibold text-[22px] tracking-[2px]"
            >
              X (formerly Twitter)
            </label>
            <input
              placeholder="https://..."
              id="twitter"
              type="text"
              value={initialData.twitter}
              onChange={(e) => updateData({ twitter: e.target.value })}
              className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] h-[55px] border border-[#464646] outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-buttonOrange text-white text-[16px] font-medium p-[10px] w-[50%] rounded-[10px]"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <motion.button
        type="button"
        onClick={onBack}
        className="bg-gray-500 absolute left-8 text-white text-[24px] font-medium p-[20px] rounded-[10px]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        whileHover={{ scale: 1.1, backgroundColor: "#555" }}
      >
        <IoArrowBack />
      </motion.button>
    </section>
  );
};

export default PersonalInfo;
