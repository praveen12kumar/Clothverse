import nodemailer from "nodemailer";
//import { Resend } from "resend";

const sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL_SEND_FROM,
            pass:process.env.SMPT_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL_SEND_FROM,
        to:options.email,
        subject:options.emailType === "VERIFY" ? options.vSubject : options.fSubject,
        text:options.emailType === "VERIFY" ? options.vMessage : options.fMessage
    };

    await transporter.sendMail(mailOptions);
}


// const sendForgotEmail = async(options)=>{


// const resend = new Resend(process.env.RESEND_API);

// (async function(){
//     const{data, error} = await resend.emails.send({ 
//     from:process.env.SMPT_MAIL_SEND_FROM,
//     to:options.email,
//     subject:options.subject,
//     html:`<p>${options.message}</p>`
//     });

//     if(error){
//         console.log(error)
//     }
// })();

// }



export {sendEmail};