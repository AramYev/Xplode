import nodemailer from 'nodemailer';
import { UtilsError } from './error-handling';

const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

export const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: '"👻" <arm.arakelyan.ay@gmail.com>',
      to: email,
      subject,
      text: message,
    });
  } catch (err) {
    throw new UtilsError(err.message, 410);
  }
};
