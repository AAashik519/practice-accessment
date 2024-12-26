import { addToCart } from "@/app/store/cartSlice";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { useDispatch } from "react-redux";

const SingleRecipe = ({ id, setIsOpen }) => {
  console.log(id);
  const dispatch= useDispatch()

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id], // Include `id` to make the query unique
    queryFn: () => HttpKit.getRecipeDetails(id),
    enabled: !!id, // Prevent the query from running if `id` is undefined or null
  });

  if (error) {
    console.error("Error:", error.message);
  }

  console.log("Recipe Data:", data);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.idMeal,
        name: data.strMeal,
        image: data.strMealThumb,
        price: 10.0, // Example price (adjust as needed)
      })
    );
    setIsOpen(false)
    
  };


  if (isLoading || !data) return "Loading...";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <Image
          src={data?.strMealThumb}
          width={500}
          height={400}
          alt="Image"
          className="w-full h-[450px] object-cover"
        />
      </div>
      <h2 className="text-2xl font-semibold">{data?.strMeal}</h2>
      <h2 className=" font-normal">{data?.strInstructions}</h2>
      <div className="flex justify-end mr-4"  onClick={handleAddToCart}>
        <button className="w-[180px] h-[40px]  text-white bg-gradient-to-b from-green-400 to-green-500 rounded-md flex items-center justify-center gap-2 hover:to-green-600 active:from-green-400 focus:from-green-400 duration-500 ">
          <span className="text-2xl">
            <MdShoppingCartCheckout />
          </span>{" "}
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleRecipe;
