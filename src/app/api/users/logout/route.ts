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
    catch(error: any){
        console.log("Something went wrong");
        console.log(error.message);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Internal server error"
        })
    }
}