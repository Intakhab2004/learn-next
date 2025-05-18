


export default function UserProfile({params}: any){
    return (
        <div className="text-center text-2xl font-bold mt-8">
            <p>This is Signup Page.</p>
            <span className="font-bold text-yellow-300 bg-red-500 rounded-2xl p-2">{params.id}</span>
        </div>
    )
}