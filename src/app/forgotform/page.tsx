"use client"

import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";




export default function ForgotForm(){
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async() => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/forgotPassword", {email});
            console.log("Forgot email sent response", response.data);

            if(!response.data.success){
                toast.error(response.data.message);
                setEmail("");
                return ;
            }
            setEmailSent(true);
            toast.success("Email sent");
            setEmail("");

        }
        catch(error: unknown){
            if(error instanceof Error){
                console.log(error.message);
            }
            else{
                console.log("Unknown error", error);
            }
            toast.error("An error occured!");
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className=" w-screen h-screen flex flex-col items-center pt-10">
            {
                loading ? (<p className="flex justify-center items-center h-screen text-4xl font-bold">Loading...</p>) 
                          :
                          (
                            <div>
                                {
                                    emailSent ? (<div className="text-2xl font-bold mt-50">Please check your email</div>) 
                                                :
                                                (
                                                    <div>
                                                        <p className="text-2xl font-bold">Enter your email for reseting your password</p>
                                                        <form onSubmit={handleSubmit} className="mt-6 w-1/4 h-1/2 rounded-lg p-6">
                                                            <label htmlFor="email">Email</label>
                                                            <br/>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                name="email"
                                                                value={email}
                                                                placeholder="Email"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className="border-1 rounded-lg p-1 text-black"
                                                            />
                                                            <br/>
                                                            
                                                            <button className="p-1 bg-red-600 border-1 rounded-lg mt-3 cursor-pointer" type="submit">Submit</button>
                                                        </form>
                                                    </div>
                                                )
                                }
                            </div>
                          )
            }
        </div>
    )
}