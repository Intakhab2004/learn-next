"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function UserProfile(){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({});
    const router = useRouter();


    const getDetails = async() => {
        try{
            setLoading(true);
            const res = await axios.get("/api/users/userDetails");
            console.log(res.data);

            if(!res.data.success){
                toast.error(res.data.message);
                router.push("/profile");
                return ;
            }

            setData(res.data.userResponse);
        }
        catch(error: any){
            console.log("An error Occured ", error.message);
            toast.error("Something went wrong while fetching the details");
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getDetails();
    }, []);


    return (
        <div className="text-center text-2xl font-bold mt-8">
            <p>This is User Details Page.</p>
            {
                loading ? (<p>Loading...</p>) :
                          (
                            Object.keys(data).length > 0 ? (
                                                                <div className="bg-blue-400">
                                                                    <p>{`My email is ${data.email}`}</p>
                                                                    <p>{`My name is ${data.username}`}</p>
                                                                </div>
                                                            ) :
                                                            (<p>No user data found</p>)
                          )
            }
        </div>
    )
}