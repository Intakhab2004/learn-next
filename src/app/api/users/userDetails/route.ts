import { getUserData } from "@/helpers/getData";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


dbConnect();

export async function GET(request: NextRequest){
    try{
        const userId = getUserData(request);
        const userResponse = await User.findById(userId).select("-password");  // - sign for deselecting
        console.log(userResponse);

        return NextResponse.json({
            success: true,
            status: 200,
            message: "User data fetched successfully",
            userResponse
        })


    }
    catch(error: any){
        console.log("Something went wrong!!");
        console.log(error.message);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}