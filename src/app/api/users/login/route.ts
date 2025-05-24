import { dbConnect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


dbConnect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        if(!email || !password){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Please fill all the details carefully."
            })
        }

        const getUser = await User.findOne({email});
        if(!getUser){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "User not found"
            })
        }

        // Password comparing
        const validPassword = await bcryptjs.compare(password, getUser.password);
        if(!validPassword){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Invalid password!"
            })
        }

        // creating token data
        const tokenData = {
            id: getUser._id,
            email: getUser.email,
            username: getUser.username
        }

        // creating token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "2d"});

        // creating options for cookies
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        const response = NextResponse.json({
            success: true,
            status: 200,
            message: "User logged in successfully",
            token
        });

        // Setting token in cookies
        response.cookies.set("Token", token, options);
        return response;

    }
    catch(error: unknown){
        console.log("Something went wrong while Logging in!!");
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