import nodemailer from 'nodemailer'
import { WELCOME_EMAIL_TEMPLATE } from './templets'

export const transport=nodemailer.createTransport({
    service: 'Gemail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!

    }
})

export const sendWelcomeEmail=async({email, name, intro}: WelcomeEmailData)=>{
const htmlTemplet=WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);
const mailOptions={
    from: `"Signalist" <signalist@abcd.pro>`,
    to: email,
    subject: `Welcome to Signalist - your stock market toolkit is ready!`,
    text: 'Thanks for joining Signalist',
    html: htmlTemplet,

}
await transport.sendMail(mailOptions);

}