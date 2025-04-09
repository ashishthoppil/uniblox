import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);

    try {
        const exists = await db.collection('coupon').find().toArray();
        let result;
        if (exists.length > 0) {
            result = await db.collection('coupon').updateOne(
                {},
                {
                $set: { 
                    threshold: body.threshold, 
                    percent: body.percent, 
                    code: body.code
                },
                $currentDate: { lastModified: true }
                }
            );
        } else {
            result = await db.collection('coupon').insertOne({ 
                threshold: body.threshold,
                percent: body.percent, 
                code: body.code
            });
        }
        return NextResponse.json({ success: true, message: result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
