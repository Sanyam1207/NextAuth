import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server'
import { log } from 'console';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                message: "User Does Not Exist"
            }, { status: 400 })
        }

        console.log("User Exist", user)

        const validPassword = await bcryptjs.compare(password, user.password)
        console.log("\n\nPassword Validation", validPassword)

        if (!validPassword) {
            return NextResponse.json({
                message: "Check Your Credentials"
            }, { status: 500 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        console.log("\n\nToken Data From Login Route : ", tokenData);

        const token = jwt.sign(tokenData, "SANYAMSAUMYA",
            {expiresIn: '1d'}
        )

        console.log("\nToken: ", token)

        const response = NextResponse.json({
            message: 'Logegd In Success',
            success: true
        });

        console.log("\nRespone: ", response)

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response


    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 500 })
    }
}