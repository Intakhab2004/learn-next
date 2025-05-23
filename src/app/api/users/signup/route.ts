import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

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

        const emailResponse = await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
        if(!emailResponse){
            return NextResponse.json({
                success: false,
                status: 403,
                message: "Issues is email generation"
            })
        }

        return NextResponse.json({
            success: true,
            status: 201,
            message: "New User created successfully.",
            savedUser
        })

    }
    catch(error: unknown){
        console.log("Something went wrong while creating the user.");
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