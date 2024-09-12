import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { log } from 'console';
import { sendEmail } from '@/helpers/Mailer';

connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //Validation
        console.log(reqBody)

        const user = await User.findOne({email})
        
        if (user) {
            return NextResponse.json({error: "User Already Exist"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log("saved user after signup : ", savedUser._id, " \n\n")

        //send varification email -:

        await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}