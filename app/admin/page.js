"use client";

import { Inter } from "next/font/google";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import { ArrowRight, SaveIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Cart() {
    const [activeSection, setActiveSection] = useState('orders'); 
    const [couponThreshold, setCouponThreshold] = useState(0); 

    return (
        <main className={`w-full ${inter.className}`}>
            <section className="flex w-full">
                <aside className="flex flex-col items-start gap-5 h-screen w-[15%] border-2 border-gray-200 border-t-0 py-10">
                    <Link className="flex items-end justify-center gap-2 w-full" href={'/'}>
                        <Image
                            src="/logo.svg"
                            alt="Uniblox logo"
                            width={25}
                            height={25}
                            priority
                        />
                        <span className="font-bold text-[18px] text-zinc-800">Console</span>
                    </Link>
                    <div className="flex flex-col items-center w-full">
                        <div onClick={() => setActiveSection('orders')} className={`${activeSection === 'orders' ? 'bg-teal-500 text-white' : 'text-gray-700'} cursor-pointer hover:bg-teal-500 hover:text-white w-full font-bold p-2`}>
                            Orders
                        </div>
                        <div onClick={() => setActiveSection('coupon')} className={`${activeSection === 'coupon' ? 'bg-teal-500 text-white' : 'text-gray-700'} cursor-pointer hover:bg-teal-500 hover:text-white w-full font-bold p-2`}>
                            Coupon Settings
                        </div>
                    </div> 
                </aside>
                <section className="py-5 px-10 w-[85%]">
                    {activeSection === 'coupon' ? <>
                        <h1 className="text-[52px] font-bold">Coupon Settings</h1>
                        <form className="mt-10">
                            <div className="flex flex-col gap-5">
                                <label>How many orders are required to receive a coupon code?</label>
                                <div className="flex gap-5 justify-start w-[30%]">
                                    <input onChange={(e) => setCouponThreshold(e.target.value)} className="p-2 rounded-md border-2 border-gray-200 outline-none " type="number" value={couponThreshold} />
                                    <button className="flex items-center font-bold text-[14px] text-white p-2 pr-3 rounded-md bg-teal-500 hover:bg-teal-600 cursor-pointer duration-500">
                                        <SaveIcon className="text-white h-4 " /> Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </> : <></>}
                    {activeSection === 'orders' ? <>
                        <h1 className="text-[52px] font-bold">Orders</h1>
                        {/* <form className="mt-10">
                            <div className="flex flex-col gap-5">
                                <label>How many orders are required to receive a coupon code?</label>
                                <div className="flex gap-5 justify-start w-[30%]">
                                    <input onChange={(e) => setCouponThreshold(e.target.value)} className="p-2 rounded-md border-2 border-gray-200 outline-none " type="number" value={couponThreshold} />
                                    <button className="flex items-center font-bold text-[14px] text-white p-2 pr-3 rounded-md bg-teal-500 hover:bg-teal-600 cursor-pointer duration-500">
                                        <SaveIcon className="text-white h-4 " /> Save
                                    </button>
                                </div>
                            </div>
                        </form> */}
                    </> : <></>}
                </section>
            </section>
        </main>
    );
}
