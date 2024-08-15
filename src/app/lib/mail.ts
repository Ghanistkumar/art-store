"use server";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { AppointmentTemplate } from "./templates/AppoitmentTemplate";
import { OrderSummaryTemplate } from "./templates/OrderSummaryTemplate";

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

export async function compileOrderSummaryTemplate(
  order_id: number,
  total_quantity: number,
  product_name?: string,
  product_price?: number,
  product_description?: string,
  product_quantity?: number,
  payment_type?: string,
  subtotal?: number,
  shipping_charge?: number,
  total_amount?: number,
  customer_address?: string,
  delivery_date?: string,
  tracking_url?: string,
  company_email?: string,
  company_number?: number
) {
  const template = handlebars.compile(OrderSummaryTemplate);
  const htmlBody = template({
    order_id: order_id,
    total_quantity: total_quantity,
    product_name: product_name,
    product_price: product_price,
    product_description: product_description,
    product_quantity: product_quantity,
    payment_type: payment_type,
    subtotal: subtotal,
    shipping_charge: shipping_charge,
    total_amount: total_amount,
    customer_address: customer_address,
    delivery_date: delivery_date,
    tracking_url: tracking_url,
    company_email: company_email,
    company_number: company_number,
  });
  return htmlBody;
}
