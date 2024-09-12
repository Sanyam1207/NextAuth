import { log } from "console";
import mongoose from "mongoose";


export async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/ConnectionDemo")
        const connection = mongoose.connection

        connection.on('connection', () => {
            log("MongoDB Connected")
        })

        connection.on('error', (err) => {
            log("MongoDB Connection Error Make Sure Dbs is Up And Running", + err)
            process.exit()
        })
    } catch (error) {
        log("Error", error)
    }
}