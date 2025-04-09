"use client"

import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Inter } from "next/font/google";
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

  const [coupon, setCoupon] = useState('')
  const [code, setCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [total, setTotal] = useState(0)

  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const checkCouponEligibility = async (event) => {
    event.preventDefault();
    if (userDetails.email === '' || userDetails.name === '') {
        toast.error('Enter your email address and name to check eligibility.')
        return;
    }
    const response = await fetch('/api/check-coupon', {
        method: 'POST',
        body: JSON.stringify({
            email: userDetails.email
        })
    });

    const data = await response.json();

    if (data.success) {
        setCoupon(data.message);
        return true;
    } else {
        setCoupon('no-offer');
        return false;
    }
  }

  const getTotal = (products) => {
    let total = 0;
    products.forEach((product) => {
        total += (product.qty * product.price)
    });

    if (appliedDiscount !== 0) {
        total = total - (total * (appliedDiscount / 100))
    }

    setTotal(total)
  }

  useEffect(() => {
    if (cartItems.length < 1) {
        router.push('/');
    }
    getTotal(cartItems);
  }, [appliedDiscount])



  const applyCode = async (event) => {
    event.preventDefault();
    if (userDetails.email === '' || userDetails.name === '') {
        toast.error('Enter your email address and name to check eligibility.')
        return;
    }
    if (code === '') {
        toast.error('Enter discount code.')
        return;
    }
    const response = await fetch('/api/apply-discount', {
        method: 'POST',
        body: JSON.stringify({
            email: userDetails.email,
            code
        })
    });

    const data = await response.json();

    if (data.success) {
        toast.success(data.message);
        setAppliedDiscount(data.data.percent);
    } else {
        toast.error(data.message);
    }

  }

  const placeOrder = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/place-order', {
        method: 'POST',
        body: JSON.stringify({
            invoice: `UNI${Math.floor(10000 + Math.random() * 90000)}`,
            name: userDetails.name,
            email: userDetails.email,
            items: cartItems,
            orderTotal: total
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

  const getCouponMessage = (coupon) => {
    switch (coupon) {
        case 'no-offer':
            return 'You are not eligible for a discount at the moment.'
        case '':
            return ''
        default:
            return `Congratulations! You are eligible for a discount of ${coupon && coupon.percent}%, use ${coupon && coupon.code} as the code.`
    }
  }

  return (
    <main className={`flex flex-col-reverse md:flex-row gap-10 w-full py-5 px-10 ${inter.className}`}>
        <div className="flex flex-col justify-between border-2 border-gray-100 shadow-md rounded-md w-full md:w-[30%] h-[50vh] overflow-y-auto p-5">
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
                    <h1 className="font-bold text-[26px]">{`$${total}`}</h1>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-5 border-2 border-gray-100 shadow-md rounded-md w-full md:w-[70%] p-5">
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
                <div className="flex flex-col md:flex-row items-center justify-end gap-5">
                    <label className="font-bold text-left">Coupon Code</label>
                    <input onChange={(e) => setCode(e.target.value)}  value={code} className="outline-none p-2 border-2 border-gray-200 rounded-md" type="text" />
                    <button onClick={applyCode} className="text-teal-600 cursor-pointer text-[14px]">Apply</button>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <button onClick={checkCouponEligibility} className="text-teal-600 cursor-pointer text-[14px]">Check coupon eligibility</button>
                    {getCouponMessage(coupon)}
                </div>
                <div className="flex items-center justify-center bg-teal-100 border-2 border-dashed border-teal-600 py-5 rounded-lg">
                    <span className="text-[16px] text-teal-600 font-bold">-- Card Details Here --</span>
                </div>
                <button type="submit" onClick={(e) => placeOrder(e)} className="flex justify-center items-center bg-teal-500 p-2 font-bold text-sm rounded-md text-white cursor-pointer hover:bg-teal-600 duration-500">Pay {`$${total}`} & Place Order</button>
            </form>
        </div>
    </main>
  );
}
