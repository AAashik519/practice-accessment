"use client";
import HttpKit from "@/common/helpers/HttpKit";
import Modal from "@/components/Modal";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const AllRecipes = () => {
  
  const [mealId, setMealId] = useState("");
    const [openDetails, setOpenDetails] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  console.log(data);
  if (isLoading) return <div>Loading recipes...</div>;
  const handleDetailsOpen = (id) => {
    console.log(id);

    setOpenDetails(true);
    setMealId(id);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4   gap-5">
          {data.length >= 0 ? (
            data?.map((recipy) => (
              <div
              key={recipy?.id}
                onClick={() => handleDetailsOpen(recipy?.idMeal)}
                className="group space-y-6 border border-gray-100  rounded-3xl bg-white  p-1 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10 mt-5"
              >
                <Image
                  className="mx-auto rounded-2xl w-full"
                  src={recipy?.strMealThumb}
                  alt="Web Development"
                  loading="lazy"
                  width={140}
                  height={140}
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {recipy?.strMeal.split(" ").slice(0, 2).join(" ")}
                </h3>
                <p >
        
      </p>
                {/* <div className="relative mx-auto flex items-center justify-center invisible  group-hover:visible">
        <button className="text-primary">Click to see details</button>
      </div> */}
              </div>
            ))
          ) : (
            <div>
              <h2>no data found</h2>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={mealId} setIsOpen={setOpenDetails} />
      </Modal>



    </div>
  );
};

export default AllRecipes;
