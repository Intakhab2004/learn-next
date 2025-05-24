"use client"

import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p className="text-2xl font-bold">This is Home page.</p>
      <div className="mt-[-20rem]">
        <button className="p-2 bg-[#000000c4] font-bold text-white rounded-lg mr-3 cursor-pointer border border-transparent
                           hover:border-black hover:bg-white hover:text-black" onClick={() => router.push("/login")}>
          Login
        </button>
        <button className="p-2 bg-[#000000c4] font-bold text-white rounded-lg cursor-pointer border border-transparent
                           hover:border-black hover:bg-white hover:text-black" onClick={() => router.push("/signup")}>
          Sign up
        </button>
      </div>
    </div>
  );
}
