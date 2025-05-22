import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


dbConnect();


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        });
        console.log(user);

        if(!user){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "Invalid token"
            })
        }
        if(user.isVerified){
            return NextResponse.json({
                success: false,
                status: 402,
                message: "User's email already verified"
            })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Email Verified"
        })

    }
    catch(error: any){
        console.log("Something went wrong while verifying the email");
        console.log(error.message);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}