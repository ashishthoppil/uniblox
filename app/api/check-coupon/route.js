import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);

    try {
        const coupon = await db.collection('coupon').find().toArray();
        const orders = await db.collection('orders').find({
            email: body.email
        }).toArray();

        if (coupon.length > 0) {
            const orderNo = orders.length + 1;
            if (orderNo % parseInt(coupon[0].threshold) === 0) {
                return NextResponse.json({ success: true, message: coupon[0] });
            } else {
                return NextResponse.json({ success: false, message: '' });
            }
        } else {
            return NextResponse.json({ success: false, message: '' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
