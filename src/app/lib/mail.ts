"use server";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { AppointmentTemplate } from "./templates/AppoitmentTemplate";

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    if (sendResult.accepted.length === 1) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function compileAppointmentTemplate(
  name: string,
  date: string,
  email: string,
  phone: string,
  description: string
) {
  const template = handlebars.compile(AppointmentTemplate);
  const htmlBody = template({
    name: name,
    date: date,
    email: email,
    phone: phone,
    description: description,
  });
  return htmlBody;
}
