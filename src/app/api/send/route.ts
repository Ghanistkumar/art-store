import { Resend } from 'resend';
import * as React from 'react';
import EmailTemplate from '@/components/email-template';

const resend = new Resend('re_Fe1Nr7gV_KPrFQyMYz22ipDvrxRLmYSna');

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['patekghanist@gmail.com'],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}