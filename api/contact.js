import { Resend } from 'resend';

let resend;
const getResend = () => {
    if (!resend && process.env.RESEND_API_KEY) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const resendClient = getResend();
        if (resendClient) {
            await resendClient.emails.send({
                from: `GentleCutx Contact <${process.env.RESEND_FROM_EMAIL}>`,
                to: [process.env.SALON_EMAIL || 'info@gentlecutx.com'],
                subject: `Contact Form: ${subject}`,
                replyTo: email,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
                    <div style="background-color: #1a1a2e; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: #c4a265; margin: 0; font-size: 24px;">GentleCutx</h1>
                        <p style="color: #9ca3af; margin: 8px 0 0;">New Contact Form Message</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 100px;">Name</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Email</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Subject</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${subject}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 20px;">
                            <p style="color: #6b7280; margin-bottom: 8px;">Message:</p>
                            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; color: #374151; line-height: 1.6;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; text-align: center;">
                            You can reply directly to this email to respond to ${name}.
                        </p>
                    </div>
                </div>
            `,
            });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Failed to send contact email:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
