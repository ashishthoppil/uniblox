"use client"

import React from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { products } from "../../constants/products";
import { Inter } from "next/font/google";
import { ShoppingBagIcon } from "lucide-react";

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function ProductDetail() {

  const params = useParams();  // Returns an object of all route parameters
  const id = params.id;

  const { addToCart } = useCart();

  const product = products.filter((product) => product.id === parseInt(id))[0];

  return (
    <main className={`w-full py-5 px-10 ${inter.className}`}>
      <div className={`flex flex-col md:flex-row gap-5 rounded-[30px] border-2 border-gray-200 shadow-md shadow-teal-900/50`}>
        <div className="w-full md:w-[40%]">
          <img src={product.image} className="w-full h-full object-cover shadow-lg rounded-t-[30px] md:rounded-l-[30px] md:rounded-r-[0px]" />
        </div>
        <div className="flex flex-col justify-center w-full md:w-[60%] py-10 px-10 md:pr-10">
          <h1 className="text-[28px] md:text-[52px] font-bold">{product.name}</h1>
          <span className="text-[22px] font-thin">{product.shortDescription}</span>
          <span className="text-[16px] text-gray-500 mt-10 font-thin">{product.description}</span>
          <div className="flex justify-center md:justify-start mt-10">
            <button onClick={() => addToCart(product)} className="flex items-center font-bold text-[14px] text-white p-2 pr-3 rounded-md bg-teal-500 hover:bg-teal-600 cursor-pointer duration-500">
              <ShoppingBagIcon className="text-white h-4 " /> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
