import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export function getUserData(request: NextRequest){
    try{
        const token = request.cookies.get("Token")?.value || "";
        const tokenData: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return tokenData.id;
    }
    catch(error: any){
        throw new Error("Something went wrong while fetching the data", error.message);
    }
}
