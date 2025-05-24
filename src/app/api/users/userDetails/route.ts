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
    catch(error: unknown){
        console.log("Something went wrong!!");
        if(error instanceof Error){
            console.log(error.message);
        }
        else{
            console.log("Unknown error", error);
        }

        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}