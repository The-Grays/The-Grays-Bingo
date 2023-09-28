import nodemailer from "nodemailer";
import emailConfig from "./email_config.json";

async function SendMail(email: string, filePath: string) {
    const transporter = nodemailer.createTransport(emailConfig);

      const info = await transporter.sendMail({
        from: '"The Gray\'s Bingo" <bingo@TheGrays.com>',
        to: email,
        subject: "The Gray\'s Bingo Card",
        text: "See attached\n\n",
        html: "<strong>See attached</strong></br></br>",
        headers: { 'x-cloudmta-class': 'standard' },
        attachments: [{ path: `${filePath}.html` }, { path: `${filePath}.png` }]
      });
    
      console.log("Message sent: %s", info.response);
}

export default function EmailDeck(players: string[], deck: Map<string, number[]>[], filePath: string) {
    for (let i: number = 0; i < players.length; i++) {
        SendMail(players[i], `${filePath}_${i}`);
    }
}
