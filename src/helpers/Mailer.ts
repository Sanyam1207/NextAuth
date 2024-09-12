import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        //Configure Mail For Usage

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        console.log("\nFrom Mailer File Mail: ", email, "\n\n")
        console.log("\nFrom Mailer File UserId: ", userId, "\n\n")
        console.log("\nFrom Mailer File emailtype: ", emailType, "\n\nand type ", typeof email, "\n\n")

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        varifyToken: hashedToken,
                        varifyTokenExpiry: Date.now() + 36000000
                    }
                }
            )
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 36000000
                    }
                }
            )
        }

        console.log("\nMailer.js Outside of if else statement \n")



        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "fc48ef82a38a7f",
                pass: "30b8aa25815e9b"
            }
        });


        const mailOptions = {
            from: 'sanyam071104@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VARIFY" ? "Varify Your Email" : "Reset Your Password",


            html: `<p> Click <a href="${process.env.DOMAIN}/varifyemail?token=${hashedToken}"> Here </a> to ${emailType === "VARIFY" ? " varify your email " : " reset your password "} or copy and paste the link below in the browser <br> ${process.env.DOMAIN}/varifyemail?token=${hashedToken}</p>`, // html body

        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse


    } catch (error: any) {
        throw new Error(error.message)
    }
}