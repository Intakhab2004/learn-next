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
                router.push("/login");
            }
            else{
                toast.error(response.data.message);
            }

        }
        catch(error: any){
            console.log("Logout failed ", error.message);
            toast.error("Something went wrong");
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
                              (<button onClick={handleLogout} className="p-[8px] mt-3 bg-red-600 text-black font-bold rounded-lg cursor-pointer">Logout</button>)
                }
            </div>
        </div>
    )
}