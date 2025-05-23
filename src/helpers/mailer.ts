import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        // generating hashed token 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        const mailOptions = {
            from: `Intakhab Alam ${process.env.MAIL_USER}`,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Rest your Password",
            html: `<p>
                    Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}"> 
                    here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or paste 
                    <p>${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}<p>
                    this link to browser.
                  </p>`
        }

        const response = await transporter.sendMail(mailOptions);
        return response;

    }
    catch(error: any){
        throw new Error(error.message);
    }
}