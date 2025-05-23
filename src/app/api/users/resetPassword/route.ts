import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {password, confirmPassword, token} = reqBody;

        if(password !== confirmPassword){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Password and confirm password do not match"
            })
        }

        const user = await User.findOne({forgetPasswordToken: token})
        if(!user){
            return NextResponse.json({
                success: false,
                status: 402,
                message: "Invalid or missing token"
            })
        }

        if(user.forgetPasswordTokenExpiry <= Date.now()){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Token has expired"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save()
        console.log("Updated user is", user);

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Password changed"
        })

    }
    catch(error: any){
        console.log("Internal server error");
        console.log(error.message);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Something went wrong while reseting the password"
        })
    }
}