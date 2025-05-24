import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export function getUserData(request: NextRequest){
    try{
        const token = request.cookies.get("Token")?.value || "";
        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!) as {id: string};

        return tokenData.id;
    }
    catch(error: unknown){
        if(error instanceof Error){
            throw new Error(`Something went wrong while fetching the data ${error.message}`);
        }
        else{
            throw new Error("Something went wrong while fetching the data");
        }
    }
}
