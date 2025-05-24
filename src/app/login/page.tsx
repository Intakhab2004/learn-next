"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function LoginPage(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            setLoading(true);

            const response = await axios.post("/api/users/login", user);
            console.log("Login response ", response);

            if(response.data.success){
                toast.success("User logged in successfully");
                router.push("/profile");
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log("Login failed ", error.message);
            }
            else{
                console.log("Unknown Error", error);
            }

            toast.error("Something went wrong!!");
        }
        finally{
            setLoading(false);
        }
    }


    return (
        <div>
            <p className="text-center text-2xl font-bold mt-8">{loading ? "" : "This is Login Page"}</p>
            <>
                {
                    loading ? (<p className="flex justify-center items-center h-screen text-4xl font-bold">Loading...</p>) :
                              (
                                <div className="flex flex-col justify-center items-center mt-4">
                                    <form onSubmit={handleLogin}>
                                        <label htmlFor="email">Email</label>
                                        <br/>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className="border-1 rounded-lg p-1 mt-1 text-black"
                                        />
                                        <br/>

                                        <label htmlFor="password">Password</label>
                                        <br/>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            value={user.password}
                                            onChange={handleChange}
                                            className="border-1 rounded-lg p-1 mt-1 text-black"
                                        />
                                        <br/>

                                        <button className="p-1 bg-red-600 border-1 rounded-lg mt-3" type="submit">Submit</button>
                                    </form>
                                    <button onClick={() => router.push("/forgotform")} className="text-blue-600 underline text-[0.8rem] ml-30 mt-[-1.7rem] cursor-pointer">
                                        Forgot password
                                    </button>

                                </div>
                              )
                }
            </>
        </div>
    )
}