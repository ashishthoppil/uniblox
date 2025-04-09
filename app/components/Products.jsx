"use client";

import { Blocks, ShoppingBagIcon } from "lucide-react"
import Image from "next/image"
import { useCart } from "../context/CartContext";

export const Products = ({ products }) => {

    const { addToCart, cartItems } = useCart();

    return (
        <div className="flex flex-col items-center justify-center gap-20">
            <div className="flex items-center justify-center gap-10">
                {products.map((product) => 
                <div className="flex flex-col gap-1 rounded-md shadow-md cursor-pointer  hover:scale-102 duration-100" key={product.id}>
                    <img
                        className="rounded-t-md w-full"
                        src={product.image}
                        alt="Uniblox logo"
                    />
                    <div className="flex flex-col gap-2 p-3">
                        <h1 className="font-bold text-[16px]">{product.name}</h1>
                        <span className="text-[14px] text-zinc-400 font-thin">{product.shortDescription}</span>
                        <span></span>
                    </div>
                    
                    <div className="flex items-center justify-between px-3 pb-3">
                        <span className="text-[22px] font-bold text-teal-600">{product.price}</span>
                        <div className="flex gap-2">
                            <button onClick={() => addToCart(product)} className="flex items-center font-bold text-[14px] text-white p-2 pr-3 rounded-md bg-teal-500 hover:bg-teal-600 cursor-pointer duration-500">
                                <ShoppingBagIcon className="text-white h-4 " /> Add To Cart
                            </button>
                        </div>
                    </div>
                    
                </div>
            )}
            </div>
            <button className="flex items-center justify-center py-3 pl-3 pr-5 bg-teal-500 hover:bg-teal-600 text-white text-[14px] font-bold rounded-md cursor-pointer  duration-500">
                <Blocks className="h-4" />View All Products 
            </button>
        </div>
    )
}