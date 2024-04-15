import nodemailer from "nodemailer";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { ApiError } from "./ApiError.js";

export const sendEmail = async({email, emailType, userId})=>{
  
    try {
        // create a hashed Token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        const emailVerify = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
        ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> 
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`;
    
        const forgotMessage = `<p>Click <a href="${process.env.DOMAIN}/forgotPassword?token=${hashedToken}">here</a> to 
        ${emailType === "RESET" ? "reset your email" : "verify your password"}
        or copy and paste the link below in your browser. <br> 
        ${process.env.DOMAIN}/forgotPassword?token=${hashedToken}
        </p>`

        // const forgotPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/users/forgot-password/${forgotToken}`;
        // const forgotMessage = `<p> Your password reset token is:- \n\n ${forgotPasswordUrl} \n\n If You have not requested this email then, Please ignore it</p>`

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken, verifyTokemExpiry:Date.now() + 3600000})
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken:hashedToken, forgotPasswordTokenExpire:Date.now() + 15 * 60 * 1000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
          });

          const mailOptions = {
            from: 'praveen.13it030@abes.ac.in', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: emailType === "VERIFY" ? emailVerify : forgotMessage // html body
          }

          const mailResponse =  await transport.sendMail(mailOptions)
          return mailResponse;


    } catch (error) {
        throw new ApiError(400, error.message);
    }
}