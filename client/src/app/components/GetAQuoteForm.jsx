"use client";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const inputAnimation = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
};

const GetAQuoteForm = ({ initialData, updateData, onContinue }) => {
  return (
    <section className="flex flex-col gap-[95px] w-full items-center justify-center pt-[149px] pb-[74px]">
      <div className="flex flex-col items-center gap-[15px]">
        <h1 className="text-[#FC7C13] text-[64px] font-semibold">Get a Quote</h1>
        <p className="text-[#F7FCFE] font-medium text-[18px]">Provide the project details</p>
      </div>

      <form
        className="flex flex-col w-full items-center gap-[25px]"
        onSubmit={(e) => {
          e.preventDefault();
          onContinue();
        }}
      >
        {/* Tags Input */}
        <div className="w-[50%] flex flex-col gap-[20px] justify-start items-stretch">
          <label
            htmlFor="tags"
            className="text-left text-[#F7FCFE] cursor-pointer font-semibold text-[22px] tracking-[2px]"
          >
            Add tags
          </label>
          <input
            placeholder="e.g. Defi, Refi ..."
            id="tags"
            type="text"
            value={initialData.tags}
            onChange={(e) => updateData({ tags: e.target.value })}
            className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] outline-none h-[55px] border-[#464646] border-[1px]"
          />
        </div>

        {/* Project Documents Input */}
        <div className="w-[50%] flex flex-col gap-[20px] justify-start items-stretch">
          <label
            htmlFor="docs"
            className="text-left text-[#F7FCFE] cursor-pointer font-semibold text-[22px] tracking-[2px]"
          >
            Attach project document
          </label>
          <AnimatePresence>
            {initialData.docs.map((doc, index) => (
              <motion.div key={index} {...inputAnimation} className="relative">
                <input
                  placeholder="Add link to external documents, photos, sites, videos, and presentation"
                  type="text"
                  value={doc}
                  onChange={(e) => {
                    const newDocs = [...initialData.docs];
                    newDocs[index] = e.target.value;
                    updateData({ docs: newDocs });
                  }}
                  className={`font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] ${
                    initialData.docs.length > 1 ? "pl-[45px]" : ""
                  } pr-[45px] rounded-[10px] outline-none h-[55px] border-[#464646] border-[1px] w-full`}
                />
                {/* Delete Button (only if there's more than one input) */}
                {initialData.docs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newDocs = initialData.docs.filter((_, i) => i !== index);
                      updateData({ docs: newDocs });
                    }}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  >
                    <IoMdClose className="text-red-500 text-[24px]" />
                  </button>
                )}
                {/* Add Button (only on the last input) */}
                {index === initialData.docs.length - 1 && (
                  <button
                    type="button"
                    onClick={() => updateData({ docs: [...initialData.docs, ""] })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <IoMdAdd className="text-[#FC7C13] text-[24px]" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Description Input */}
        <div className="w-[50%] flex flex-col gap-[20px] justify-start items-stretch">
          <label
            htmlFor="description"
            className="text-left text-[#F7FCFE] cursor-pointer font-semibold text-[22px] tracking-[2px]"
          >
            Description
          </label>
          <textarea
            placeholder="Write your project details..."
            id="description"
            value={initialData.description}
            onChange={(e) => updateData({ description: e.target.value })}
            className="font-normal text-[#7B8B76] text-[16px] input-radial p-[10px] rounded-[10px] outline-none h-[141px] border-[#464646] border-[1px]"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-buttonOrange w-[50%] text-[#fff] text-[16px] font-medium p-[10px] rounded-[10px]"
        >
          Continue
        </button>
      </form>
    </section>
  );
};

export default GetAQuoteForm;
