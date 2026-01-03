// app/api/send/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error: Missing email credentials" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Verify connection config
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Nodemailer verify error:", verifyError);
      return NextResponse.json(
        { success: false, error: "Failed to authenticate with email server. Check credentials." },
        { status: 500 }
      );
    }

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
      text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you shortly.\n\nYour message:\n${message}\n\n– Ritik Kumar`,
    };

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToSender),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Email sending error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
