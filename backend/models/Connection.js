import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({

    from_user_id: {type: String, required: true, ref: "User"},
    to_user_id: {type: String, required: true, ref: "User"},
    status: {type: String, enum: ["pending", "accepted"], default: "pending"},

}, {timestamps: true})

export const Connection = mongoose.model("Connection", connectionSchema)