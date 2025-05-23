"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ResetPassword(){
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({password: "", confirmPassword: ""});
    const router = useRouter();

    useEffect(() => {
        const token = window.location.search.split("=")[1];
        setToken(token || "");
    }, [])

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangePassword = async(e: any) => {
        e.preventDefault();

        try{
            const data = {...user, token};
            const response = await axios.post("/api/users/resetPassword", data);
            console.log("Change password response is", response);

            if(!response.data.success){
                toast.error(response.data.message);
                console.log(response.data.message);
                return ;
            }

            toast.success("Your password is changed successfully");
            router.push("/login");

        }
        catch(error: any){
            console.log(error.message);
            toast.error("Something went wrong while changing the password");
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <p className="text-center text-2xl font-bold mt-8">{loading ? "" : "Change your password"}</p>
            <>
                {
                    loading ? (<p className="flex justify-center items-center h-screen text-4xl font-bold">Loading...</p>) :
                              (
                                <div className="flex flex-col justify-center items-center mt-4">
                                    <form onSubmit={handleChangePassword}>
                                        <label htmlFor="password">New Password</label>
                                        <br/>
                                        <input
                                            id="password"
                                            name="password"
                                            type="text"
                                            placeholder="Password"
                                            value={user.password}
                                            onChange={handleChange}
                                            className="border-1 rounded-lg p-1 mt-1 text-black"
                                        />
                                        <br/>

                                        <label htmlFor="confirmPassword">Confirm New Password</label>
                                        <br/>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="text"
                                            placeholder="Confirm password"
                                            value={user.confirmPassword}
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