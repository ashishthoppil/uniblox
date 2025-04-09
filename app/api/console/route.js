import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);

    try {
        const orders = await db.collection('orders').find().toArray();
        const coupon = await db.collection('coupon').find().toArray();
        const totalOrders = orders.length;
        const uniqueUsers = Array.from(
            new Map(orders.map(user => [user.email, user])).values()
        ).length;
        let totalSales = 0;
        orders.forEach(element => {
            totalSales += element.orderTotal;
        })

        const modifiedOrders = orders.map((order) => {
            let itemsString = '';
            order.items.forEach((item, index) => {
                if (index === order.items.length - 1) {
                    itemsString += item.name;
                } else {
                    itemsString += item.name + ', ';
                }
            });
            return {
                ...order,
                itemsString
            }
        })
        return NextResponse.json({ success: true, message: {
            totalOrders,
            uniqueUsers,
            totalSales,
            orders: modifiedOrders,
            coupon: coupon[0]
        } });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
