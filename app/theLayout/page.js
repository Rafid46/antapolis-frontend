"use client";

import { useEffect, useState } from "react";
import Homepage from "../components/Home/page";
import AnimalTabs from "../components/tabs/page";
import useAxios from "../hooks/useAxios";

const TheLayout = () => {
  const [refetchCategory, setRefetchCategory] = useState(false);
  const [refetchAnimal, setRefetchAnimal] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [animalList, setAnimalList] = useState([]);

  const [loadingAnimal, setLoadingAnimal] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const axiosPublic = useAxios();
  useEffect(() => {
    const getCategoryList = async () => {
      setLoadingCategory(true);
      try {
        const response = await axiosPublic.get("/api/category/");
        setCategoryList(response.data);
        setLoadingCategory(false);
      } catch (err) {
        console.error("Error fetching category:", err);
        setLoadingCategory(false);
      }
    };

    getCategoryList();
  }, [refetchCategory, axiosPublic]);

  useEffect(() => {
    const getAnimalList = async () => {
      setLoadingAnimal(true);
      try {
        const response = await axiosPublic.get("/api/animals/");
        setAnimalList(response.data);
        setLoadingAnimal(false);
      } catch (err) {
        console.error("Error fetching animals:", err);
        setLoadingAnimal(false);
      }
    };

    getAnimalList();
  }, [refetchAnimal, axiosPublic, setLoadingAnimal]);

  return (
    <div className="flex justify-between">
      <div>
        <AnimalTabs
          animalList={animalList}
          categoryList={categoryList}
          loadingAnimal={loadingAnimal}
          setLoadingAnimal={setLoadingAnimal}
          setCategoryList={setCategoryList}
          refetchCategory={refetchCategory}
          setRefetchCategory={setRefetchCategory}
        />
      </div>
      <div>
        <Homepage
          loadingAnimal={loadingAnimal}
          setLoadingAnimal={setLoadingAnimal}
          loadingCategory={loadingCategory}
          setLoadingCategory={setLoadingCategory}
          setRefetchCategory={setRefetchCategory}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          refetchAnimal={refetchAnimal}
          setRefetchAnimal={setRefetchAnimal}
        />
      </div>
    </div>
  );
};

export default TheLayout;
