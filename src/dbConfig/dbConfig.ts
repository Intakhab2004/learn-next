import mongoose from "mongoose";

export async function dbConnect(){
    try{
        mongoose.connect(process.env.DB_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Database is connected successfully!!!");
        })

        connection.on("error", (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running." + err);
            process.exit(1);
        })
    }
    catch(error){
        console.log("Something went wrong");
        console.log(error);

        process.exit(1);
    }
}