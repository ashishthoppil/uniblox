"use client"

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../constants/products";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Checkout() {

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: ''
  });

  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length < 1) {
        router.push('/');
    }
  }, [])

  const getTotal = (products) => {
    let total = 0;
    products.forEach((product) => {
        total += (product.qty * product.price)
    });

    return total
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/place-order', {
        method: 'POST',
        body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
            items: cartItems,
            orderTotal: getTotal(cartItems)
        })
    });

    const data = await response.json();

    if (data.success) {
        toast.success('Order Placed! Redirecting to Homepage.')
        setTimeout(() => {
            clearCart();
            router.push('/');  
        }, 3000);
    }
  }

  return (
    <main className={`flex gap-10 w-full py-5 px-10 ${inter.className}`}>
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
        </div>
        <div className="flex flex-col gap-5 border-2 border-gray-100 shadow-md rounded-md w-[70%] p-5">
            <h1>Enter payment details</h1>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col">
                    <label className="font-bold">Name</label>
                    <input onChange={(e) => setUserDetails(prev => { 
                        return {
                            ...prev,
                            name: e.target.value
                        }
                     })} value={userDetails.name} className="outline-none p-2 border-2 border-gray-200 rounded-md" type="text" />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold">Email</label>
                    <input onChange={(e) => setUserDetails(prev => { 
                        return {
                            ...prev,
                            email: e.target.value
                        }
                    })}  value={userDetails.email} className="outline-none p-2 border-2 border-gray-200 rounded-md" type="email" />
                </div>
                <div className="flex items-center justify-center bg-teal-100 border-2 border-dashed border-teal-600 py-5 rounded-lg">
                    <span className="text-[16px] text-teal-600 font-bold">-- Card Details Here --</span>
                </div>
                <button type="submit" onClick={(e) => placeOrder(e)} className="flex justify-center items-center bg-teal-500 p-2 font-bold text-sm rounded-md text-white cursor-pointer hover:bg-teal-600 duration-500">Pay {`$${getTotal(cartItems)}`} & Place Order</button>
            </form>
        </div>
    </main>
  );
}
