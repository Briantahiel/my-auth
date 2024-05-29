import  { NextResponse } from "next/server";
// import { connectToDatabase } from "../utils/mongoose";

export function GET(){
    // connectToDatabase()
    return NextResponse.json({ message: "Connected" });
}
