"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";


export default function VerifyEmail(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    const clickHandler = async() => {
        try{
            const response = await axios.post("/api/users/verifytoken", {token});
            if(!response.data.success){
                toast.error(response.data.message);
                return ;
            }
            setVerified(true);
            toast.success("Verification successful");

        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong in token verification")
        }
    }

    return (
        <div className=" w-screen h-screen flex flex-col items-center pt-10">
            <h2 className="text-2xl font-bold">Verify your Email</h2>
            <div className="w-1/4 h-1/2 bg-[#5f87d0] mt-6 rounded-lg flex flex-col items-center justify-center">
                {
                    token ? (
                                <div>
                                    {
                                        verified ? (
                                                    <div>
                                                        <h2>Your email verification is successful</h2>
                                                        <h2>Please click i=on the below link to go to the login page.</h2>
                                                        <Link href="/login">Click Here</Link>
                                                    </div>
                                            ) 
                                            :
                                            (
                                                    <div>
                                                        <h2>Please click below to get verified</h2>
                                                        <button className="bg-green-600 text-yellow-300 border-1 border-black rounded-lg" onClick={clickHandler}>
                                                            Verify Email
                                                        </button>
                                                    </div>
                                            )
                                    }
                                </div>
                            ) 
                            : 
                            (
                                <h2 className="text-2xl font-bold border-1 border-black p-2 rounded-lg bg-red-700">You do not have any token</h2>
                            )
                }
            </div>
        </div>
    )
}