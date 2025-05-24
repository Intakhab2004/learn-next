"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    async function handleLogout(){
        try{
            setLoading(true);
            const response = await axios.get("/api/users/logout");
            console.log("Logout response is ", response);

            if(response.data.success){
                toast.success(response.data.message);
                router.push("/");
            }
            else{
                toast.error(response.data.message);
            }

        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log("Logout failed!!", error.message);
            }
            else{
                console.log("Unknown Error", error);
            }
            
            toast.error("Something went wrong");
        }
        finally{
            setLoading(false);
        }
    }

    const handleUserDetails = async() => {
        try{
            setLoading(true);
            const user = await axios.get("/api/users/userDetails");
            console.log("User details are ", user.data);
            router.push(`/profile/${user.data.userResponse._id}`);
        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log("An error occured!!", error.message);
            }
            else{
                console.log("Unknown Error", error);
            }
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col items-center">
            <p className="text-2xl font-bold mt-8">{loading ? "" : "This is Profile Page."}</p>
            <div>
                {
                    loading ? (<p className="flex justify-center items-center h-screen text-4xl font-bold">Loading...</p>) :
                            (
                                <div>
                                    <button onClick={handleLogout} className="p-[8px] mt-3 bg-red-600 text-black font-bold rounded-lg cursor-pointer">
                                        Logout
                                    </button>
                                    <button onClick={handleUserDetails} className="p-[8px] mt-3 ml-3 bg-red-600 text-black font-bold rounded-lg cursor-pointer">
                                        User Details
                                    </button>
                                </div>
                            )
                }
            </div>
        </div>
    )
}