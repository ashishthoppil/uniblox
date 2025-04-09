import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);

    try {
        const result = await db.collection('orders').insertOne(body);
        return NextResponse.json({ success: true, message: result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
