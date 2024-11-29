"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Select } from "antd";
import Image from "next/image";
import Homepage from "../Home/page";

const Page = ({ categoryList, animalList }) => {
  const [selected, setSelected] = useState(null);
  //   const [categoryList, setCategoryList] = useState([]);
  //   const [animalList, setAnimalList] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  // Fetch category list
  //   useEffect(() => {
  //     const getCategoryList = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axiosPublic.get(
  //           "http://localhost:5000/api/category/"
  //         );
  //         setCategoryList(response.data);
  //         setLoading(false);
  //       } catch (err) {
  //         console.error("Error fetching category:", err);
  //         setLoading(false);
  //       }
  //     };

  //     getCategoryList();
  //   }, [refetch, axiosPublic]);

  // Fetch animal data
  //   useEffect(() => {
  //     const getAnimalList = async () => {
  //       setLoadingAnimal(true);
  //       try {
  //         const response = await axiosPublic.get(
  //           "http://localhost:5000/api/animals/"
  //         );
  //         setAnimalList(response.data);
  //         setLoadingAnimal(false);
  //       } catch (err) {
  //         console.error("Error fetching animals:", err);
  //         setLoadingAnimal(false);
  //       }
  //     };

  //     getAnimalList();
  //   }, [refetchAnimal, axiosPublic, setLoadingAnimal]);

  // Filter animals based on the selected category
  useEffect(() => {
    if (selected) {
      const filtered = animalList.filter(
        (animal) => animal.category === selected
      );
      setFilteredAnimals(filtered);
    }
  }, [selected, animalList]);

  return (
    <div>
      <div className="flex items-center flex-wrap gap-2 mb-4">
        {categoryList.length > 0 ? (
          categoryList.map((category) => (
            <Chip
              key={category._id}
              text={category.categoryName}
              selected={selected === category.categoryName}
              setSelected={setSelected}
            />
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-sm">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
              <div
                key={animal._id}
                className="w-full relative flex items-center justify-center h-auto"
              >
                <div className="bg-white  shadow-gray-200 rounded-xl p-2.5 transition-all duration-500 w-[200px] h-[250px] hover:shadow-gray-300">
                  <div className="rounded-3xl h-[200px]">
                    <Image
                      width={200}
                      height={200}
                      src={animal?.imageUrl}
                      alt={animal?.animalName}
                      className="h-[200px] w-[200px] !object-cover mx-auto mb-2 !object-center rounded-lg"
                    />
                  </div>
                  <div className="text-center mb-2 mt-2">
                    <h4 className="font-semibold text-lg text-gray-600 text-center mb-2">
                      {animal?.animalName}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm mt-4">
              No animals found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Chip = ({ text, selected, setSelected }) => {
  return (
    <div>
      <button
        onClick={() => setSelected(text)}
        className={`${
          selected
            ? "text-white bg-indigo-600"
            : "text-slate-700 hover:text-slate-200 hover:bg-slate-700"
        } text-sm transition-colors px-4 py-2 rounded-md relative`}
      >
        <span className="relative z-10">{text}</span>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
          ></motion.span>
        )}
      </button>
    </div>
  );
};

export default Page;
