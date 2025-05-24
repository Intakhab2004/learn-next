import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

dbConnect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await User.findOne({email});
        console.log(user);

        if(!user){
            return NextResponse.json({
                success: false,
                status: 404,
                message: "No account with the given email"
            })
        }

        const mailResponse = await sendEmail({email, emailType: "RESET", userId: user._id});
        console.log("Mail response is", mailResponse);
        if(!mailResponse){
            return NextResponse.json({
                success: false,
                status: 403,
                message: "Issues is email generation"
            })
        }

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Check your email for reseting the password"
        })

    }
    catch(error: unknown){
        console.log("Internal Server error");
        if(error instanceof Error){
            console.log(error.message);
        }
        else{
            console.log("Unknown error", error);
        }
        
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Something went wrong while verifying the email"
        })
    }
}