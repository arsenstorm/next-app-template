"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function SendEmail({
    to = "delivered@resend.dev", // This can be an array of emails
    from = null,
    subject = "Hello!", // The subject of the email
    ReactTemplate, // Email Template
    data = {}, // Data to populate the template with
}) {
    // if `from` is null, use the default from address
    if (from === null) {
        from = `${process.env.RESEND_NAME} <${process.env.RESEND_EMAIL}>`;
    }

    // if `to` is an array, do nothing, else convert to array
    if (!Array.isArray(to)) {
        to = [to];
    }

    try {
        const response = await resend.emails.send({
            to: to,
            from: from,
            subject: subject,
            react: ReactTemplate(data),
            headers: {
                "X-Entity-Ref-ID": new Date().getTime() + "",
            },
        });

        return Response.json(response);
    } catch (error) {
        return Response.json({ error });
    }
}