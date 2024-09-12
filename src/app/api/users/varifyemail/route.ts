import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { log } from 'console';

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({varifyToken: token, varifyTokenExpiry: {$gt : Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid Token Details"}, {status: 400})
        }

        console.log(user)

        user.isVarified = true;
        user.varifyToken = undefined
        user.varifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Email Varified Successfully",
            success: true
        }, {
            status: 500
        })

        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500})
    }
}