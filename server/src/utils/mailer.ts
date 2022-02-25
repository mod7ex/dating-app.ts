import nodemailer, { SendMailOptions } from "nodemailer";
import { SMTP } from "../config/config";

/*

let createTestCreds = async () => {
      const creds = await nodemailer.createTestAccount();
      console.log(creds);
};

createTestCreds();

*/

let transport = nodemailer.createTransport(SMTP);

export let sendEmail = async (payload: Partial<SendMailOptions>) => {
      transport.sendMail(payload, (err, info) => {
            if (err) throw err;
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      });
};
