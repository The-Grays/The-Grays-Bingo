import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface INodeMailerWrapper {
    CreateTransport(transportOptions: SMTPTransport.Options): nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
}

export default class NodeMailerWrapper implements INodeMailerWrapper {
    CreateTransport(transportOptions: SMTPTransport.Options): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
        return nodemailer.createTransport(transportOptions);
    }
}