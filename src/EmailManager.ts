import nodemailer from "nodemailer";
import emailConfig from "./email_config.json";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type EmailConfig = {
  transportOptions: SMTPTransport.Options;
  emailOptions: Mail.Options;
};

export interface IEmailManager {
  EmailDeck(players: string[], deck: Map<string, number[]>[], filePath: string): void;
}

export default class EmailManager implements IEmailManager {
  EmailDeck(players: string[], deck: Map<string, number[]>[], filePath: string) {
    for (let i: number = 0; i < players.length; i++) {
      this.SendMail(players[i], `${filePath}_${i}`);
    }
  }

  private async SendMail(email: string, filePath: string) {
    const config: EmailConfig = emailConfig;
    const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport(config.transportOptions);
    const mailOptions: Mail.Options = config.emailOptions;

    mailOptions.to = email;
    mailOptions.attachments = [{ path: `${filePath}.html` }, { path: `${filePath}.png` }];

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.response);
  }
}