/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export async function createOrResendOtp(email:string){
    const is_active = true
    const is_deleted = false
    const isActiveOtp = await prisma.otp.findFirst({
        where: { email,is_active,is_deleted },
      });
    if (isActiveOtp){
        sendOtpViaGmail(email,isActiveOtp.key)
    }else{
        const key = generateRandomKey(email)
        await prisma.otp.create({
            data: {
              key,
              email,
              is_active,
              is_deleted
            },
          });
    }
}



function generateRandomKey(email:string){
    let key = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < 8; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if(sendOtpViaGmail(email,key)){
        return key
    }
    return key;
  }

function sendOtpViaGmail(email:string,key:string):boolean{
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "varunpersonal4@gmail.com",
          pass: "rmks bpqe fkfh izgi",
        },
      });
    const mailOptions = {
    from: "varunpersonal4@gmail.com",
    to: email,
    subject: "Otp Verification",
    text: `${key} is your verification key`,
    };
    transporter.sendMail(mailOptions, (error: any) => {
        if (error) {
          return false
        } else {
          return true
        }
      });
    return false
}

  