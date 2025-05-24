"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
    email: string;
    username: string;
}

export default function UserProfile() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UserData | null>(null);
    const router = useRouter();

    const getDetails = async () => {
        try{
            setLoading(true);
            const res = await axios.get("/api/users/userDetails");
            console.log(res.data);

            if(!res.data.success){
                toast.error(res.data.message);
                router.push("/profile");
                return;
            }

            setData(res.data.userResponse);
        } 
        catch(error: unknown){
            if(error instanceof Error){
                console.log("An error occurred!!", error.message);
            } 
            else{
                console.log("Unknown Error", error);
            }

            toast.error("Something went wrong while fetching the details");
        } 
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="text-center text-2xl font-bold mt-8">
            <p>This is User Details Page.</p>
            {loading ? (
                <p>Loading...</p>
            ) : data ? (
                <div className="bg-blue-400">
                    <p>{`My email is ${data.email}`}</p>
                    <p>{`My name is ${data.username}`}</p>
                </div>
            ) : (
                <p>No user data found</p>
            )}
        </div>
    );
}
