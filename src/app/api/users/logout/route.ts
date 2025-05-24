import { NextResponse } from "next/server";


export async function GET(){
    try{
        const response = NextResponse.json({
            success: true,
            status: 200,
            message: "User logged out successfully"
        })

        response.cookies.set("Token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    }
    catch(error: unknown){
        console.log("Something went wrong");
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