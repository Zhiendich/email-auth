import nodeMailer, { TransportOptions } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailServices {
  transporter;
  transportOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };
  constructor() {
    this.transporter = nodeMailer.createTransport(
      this.transportOptions as TransportOptions
    );
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `<div>
     <h1>Для активации перейдите по ссылке :</h1>
     <a href = "${link}">${link}</a>
      <div>`,
    });
  }
}

export default new MailServices();
