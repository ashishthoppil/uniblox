"use client";

import { Inter } from "next/font/google";

import Link from "next/link";
import { SaveIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "react-toastify";


export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
})

export default function Cart() {
    const [activeSection, setActiveSection] = useState('orders'); 
    const [data, setData] = useState(); 
    const [coupon, setCoupon] = useState({
        threshold: 0,
        percent: 0,
        code: ''
    }); 

    const loadData = async () => {
        const response = await fetch('/api/console', {
            method: 'GET',
        })

        const data = await response.json();

        if (data.success) {
            setData(data.message)
            setCoupon(data.message.coupon)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const saveCoupon = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/save-coupon', {
            method: 'POST',
            body: JSON.stringify(coupon)
        });
        const data = await response.json();

        if (data.success) {
            toast.success('Coupon details saved!')
        } else {
            toast.console.error('Something went wrong.')
        }
    }

    return (
        <main className={`w-full ${inter.className}`}>
            <section className="flex w-full">
                <aside className="flex flex-col items-start gap-5 h-screen w-[50%] md:w-[15%] border-2 border-gray-200 border-t-0 py-10">
                    <Link className="hidden md:flex items-end justify-center gap-2 w-full" href={'/'}>
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
                <section className="py-5 pr-10 pl-2 md:px-10 w-[85%] bg-gray-50">
                    {activeSection === 'coupon' ? <>
                        <h1 className="text-[22px] md:text-[52px] font-bold">Coupon Settings</h1>
                        <form className="flex flex-col gap-5 mt-10">
                            <div className="flex flex-col gap-5">
                                <label>How many orders are required to receive a coupon code?</label>
                                <div className="flex gap-5 justify-start w-[30%]">
                                    <input onChange={(e) => setCoupon(prev => {
                                        return {
                                            ...prev,
                                            threshold: e.target.value
                                        }
                                    })} className="p-2 rounded-md border-2 border-gray-200 outline-none " type="number" value={coupon.threshold} />
                                    
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <label>What percent should be the discount?</label>
                                <div className="flex gap-5 justify-start w-[30%]">
                                    <input onChange={(e) => setCoupon(prev => {
                                        return {
                                            ...prev,
                                            percent: e.target.value
                                        }
                                    })} className="p-2 rounded-md border-2 border-gray-200 outline-none " type="number" value={coupon.percent} />
                                    
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <label>Coupon Code</label>
                                <div className="flex gap-5 justify-start w-[30%]">
                                    <input onChange={(e) => setCoupon(prev => {
                                        return {
                                            ...prev,
                                            code: e.target.value
                                        }
                                    })} className="p-2 rounded-md border-2 border-gray-200 outline-none " type="text" value={coupon.code} />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={saveCoupon} type="submit" className="flex items-center font-bold text-[14px] text-white p-2 pr-3 rounded-md bg-teal-500 hover:bg-teal-600 cursor-pointer duration-500">
                                    <SaveIcon className="text-white h-4 " /> Save
                                </button>
                            </div>
                            
                        </form>
                    </> : <></>}
                    {activeSection === 'orders' ? <>
                        <h1 className="text-[22px] md:text-[52px] font-bold">Console</h1>
                        <div className="flex flex-col md:flex-row gap-5 w-full mt-10">
                            <div className="flex flex-col gap-10 bg-white py-5 px-3 shadow-lg rounded-lg w-full md:w-[20%]">
                                <h1 className="text-[18px] md:text-[26px] font-bold text-teal-600">Total Sales</h1>
                                <div className="flex justify-end">
                                    <h1 className="text-[18px] md:text-[36px] font-bold">{data && data.totalSales}</h1>
                                </div>
                            </div>

                            <div className="flex flex-col gap-10 bg-white py-5 px-3 shadow-lg rounded-lg w-full md:w-[20%]">
                                <h1 className="text-[18px] md:text-[26px] font-bold text-teal-600">Active Users</h1>
                                <div className="flex justify-end">
                                    <h1 className="text-[18px] md:text-[36px] font-bold">{data && data.uniqueUsers}</h1>
                                </div>
                            </div>

                            <div className="flex flex-col gap-10 bg-white py-5 px-3 shadow-lg rounded-lg w-full md:w-[20%]">
                                <h1 className="text-[18px] md:text-[26px] font-bold text-teal-600">No. of Orders</h1>
                                <div className="flex justify-end">
                                    <h1 className="text-[18px] md:text-[36px] font-bold">{data && data.totalOrders}</h1>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col mt-10">
                            <h1 className="font-bold text-[18px]">Orders</h1>
                            <Table>
                                <TableCaption>A list of your sales.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Invoice</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead className='text-right'>Items</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data && data.orders.length > 0 && data.orders.map((order, index) => 
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{order.invoice}</TableCell>
                                        <TableCell>{order.name}</TableCell>
                                        <TableCell>{order.email}</TableCell>
                                        <TableCell className="text-right">{order.itemsString}</TableCell>
                                        <TableCell className="text-right">${order.orderTotal}</TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </div>
                    </> : <></>}
                </section>
            </section>
        </main>
    );
}
