import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide A Username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Provide An Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide A Password"],
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    varifyToken: String,
    varifyTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;