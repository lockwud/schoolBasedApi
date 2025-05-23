import nodemailer from "nodemailer";
import HttpException from "./http-error";
import { HttpStatus } from "./http-status";
export const generateOtp = async() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  

  export const sendOtpEmail = async (email: string, otp: string) => {
      const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP email sent successfully");
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw new HttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to send OTP email"
      );
    }
  };


  export const sendPasswordResetLink = async (email: string, link: string | any, resetToken: string | "null")=>{
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Forgot password",
    text: `Click on this link to reset your password ${link + resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset link sent successfully");
  } catch (error) {
    console.error("Error sending password reset link to  email:", error);
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Failed to send password reset link to email"
    );
  }
  }