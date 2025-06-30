// app/api/send/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  // Email to yourself (receiver)
  const mailToOwner = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `📬 Portfolio Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Confirmation email to sender (user)
  const mailToSender = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "✅ Thanks for contacting me!",
    text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you shortly.\n\nYour message:\n${message}\n\n– Ritik`,
  };

  try {
    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToSender),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
