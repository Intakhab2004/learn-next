"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage(){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignup = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup response is ", response);

            if(response.data.success){
                toast.success("User registered successfully!!");
                router.push("/login");
            }
            else{
                toast.error(response.data.message);
            }

        }
        catch(error){
            console.log("Signup Failed", error);
            toast.error("Somthing goes wrong!!");
        }
        finally{
            setLoading(false);
        }
    }

    
    return (
        <div>
            <p className="text-center text-2xl font-bold mt-8">{loading ? "" : "This is Singup Page"}</p>
            <>
                {
                    loading ? (<p className="flex justify-center items-center h-screen text-4xl font-bold">Loading...</p>) :
                              (
                                <div className="flex flex-col justify-center items-center mt-4">
                                    <form onSubmit={handleSignup}>
                                        <label htmlFor="username">Username</label>
                                        <br/>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Username"
                                            value={user.username}
                                            onChange={handleChange}
                                            className="border-1 rounded-lg p-1 mt-1 text-black"
                                        />
                                        <br/>

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
                                </div>
                              )
                }
            </>
        </div>
    )
}