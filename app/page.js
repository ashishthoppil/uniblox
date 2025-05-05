"use client";

import { ArrowDown, Blocks, HomeIcon, LucideHome } from "lucide-react";
import { Inter } from "next/font/google";
import { Products } from "./components/Products";
import { useRef } from "react";
import Link from "next/link";
import { useCart } from "./context/CartContext";
import { products } from "./constants/products";


export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Home() {

  const productsRef = useRef();

  const gotoBestsellers = () => {
    productsRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className={`w-full py-5 px-10 ${inter.className}`}>
      <section className="flex justify-center items-center h-[85vh] rounded-[30px] border-2 border-gray-200 shadow-md shadow-teal-900/50">
        <section className="flex flex-col gap-20">
          <div className="flex flex-col gap-2 px-2 md:px-0">
            <h1 className="font-bold text-center text-[28px] md:text-[62px]">
              One stop solution for all your <br/><span className="bg-teal-500 rounded-md text-white px-2">Marketing Needs</span>
            </h1>
            <span className="text-center text-zinc-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />Suspendisse odio nibh, auctor a eleifend eu, ullamcorper eget risus.
            </span>
          </div>
          <div className="flex justify-center gap-2">
            <button onClick={gotoBestsellers} className="flex items-center justify-center py-3 pl-3 pr-5 bg-teal-500 hover:bg-teal-600 text-white text-[14px] font-bold rounded-md cursor-pointer duration-500">
              <Blocks className="h-4" />View Services 
            </button>
          </div>
        </section>
      </section>
      <section ref={productsRef} className="flex flex-col py-40">
        <h1 className="font-bold text-center text-[28px] md:text-[52px]">Check out our <span className="bg-teal-500 rounded-md text-white px-2">Bestsellers</span></h1>
        <div className="mt-10">
          <Products products={products} />
        </div>
      </section>
    </main>
  );
}
