"use client";

import { Inter } from "next/font/google";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Cart() {

    const { cartItems, removeFromCart } = useCart();

    const getTotal = (products) => {
        let total = 0;
        products.forEach((product) => {
            total += (product.qty * product.price)
        });

        return total
    }

    return (
        <main className={`w-full py-5 px-10 ${inter.className}`}>
        <section className="flex flex-col gap-20 w-full">
            <h1 className="font-bold text-[42px]">Item(s) in Cart</h1>
                {cartItems.length > 0 ? 
                <section className="flex gap-10 w-full">
                    <div className="flex flex-col gap-5 w-[70%]">
                        {
                            cartItems.map((product) => 
                            <section key={product.id} className="flex gap-2 rounded-md p-2 border-2 border-gray-200 shadow-md hover:scale-101 duration-500">
                                <img className="w-[25%]" src={product.image} alt={product.name} />
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <h1 className="font-bold text-[24px]">{product.name}</h1>
                                    <span className="text-[16px] text-zinc-500">{product.shortDescription}</span>
                                </div>
                                <div className="flex flex-col gap-5 items-center justify-center w-[25%] border-l-2 border-gray-200">
                                    <h1 className="font-bold text-[24px] text-teal-600">${product.price}</h1>
                                    <button className="bg-teal-500 p-2 font-bold text-sm rounded-md text-white cursor-pointer hover:bg-teal-600 duration-500" onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="flex flex-col justify-between border-2 border-gray-100 shadow-md rounded-md w-[30%] h-[50vh] overflow-y-auto p-5">
                        <div className="flex flex-col gap-10">
                            <h1 className="font-bold text-[24px] text-teal-600">Order Summary</h1>
                            <div className="flex flex-col gap-3">
                                {cartItems.map(product => {
                                    return (
                                        <div key={product.id} className="flex items-center justify-between gap-2">
                                            <h1 className="font-bold text-[16px]">{`${product.name} x ${product.qty}`}</h1>
                                            <h1 className="font-semibold text-[16px]">${product.price * product.qty}</h1>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex justify-between">
                                <h1 className="font-bold text-[26px]">Total</h1>
                                <h1 className="font-bold text-[26px]">{`$${getTotal(cartItems)}`}</h1>
                            </div>
                        </div>
                        <div className="flex justify-end w-full">
                            <Link href={'/checkout'} className="flex items-center bg-teal-500 p-2 font-bold text-sm rounded-md text-white cursor-pointer hover:bg-teal-600 duration-500">Proceed to Checkout <ArrowRight className="text-white h-4" /></Link>
                        </div>
                    </div>
                </section>
                    
                      : <section className="flex items-center justify-center w-full"> Your cart is empty.</section>
                }
                
                
        </section>
        </main>
    );
}
