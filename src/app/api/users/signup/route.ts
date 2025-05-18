import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

dbConnect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);

        const getUser = await User.findOne({email});
        if(getUser){
            return NextResponse.json({
                success: false,
                status: 400,
                message: "User already exists."
            })
        }

        if(!username || !email || !password){
            return NextResponse.json({
                success: false,
                status: 401,
                message: "Please fill all the details carefully."
            })
        }

        // Password hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            success: true,
            status: 201,
            message: "New User created successfully.",
            savedUser
        })

    }
    catch(error: any){
        console.log("Something went wrong while creating the user.");
        console.log(error.message);
        return NextResponse.json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}