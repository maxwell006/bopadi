const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendWelcomeEmail(name, email) {
  const htmlContent = `
    <div style="background-color:#0D0D0D; color:#EAEAEA; font-family:'Inter',Arial,sans-serif; padding:30px; border-radius:12px; max-width:550px; margin:auto;">
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://bopadi.app/assets/images/bopadi_logo.png" alt="Bopadi" style="height:40px;">
      </div>
      <h2 style="color:#ffffff; text-align:center;">Welcome to Bopadi, ${
        name.split(" ")[0]
      } ✈️</h2>
      <p style="font-size:15px; color:#bbb; text-align:center; line-height:1.6;">
        You’re officially on the waitlist! 🎉<br>
        When we launch, you’ll be the first to know — and enjoy early access to the best travel deals, right from WhatsApp.
      </p>
      <div style="text-align:center; margin:25px 0;">
        <a href="https://bopadi.app"
           style="background:#007AFF; color:white; padding:12px 28px; text-decoration:none; border-radius:50px; display:inline-block; font-weight:600;">
           Visit Website
        </a>
      </div>
      <hr style="border:0; border-top:1px solid #333; margin:30px 0;">
      <div style="text-align:center; font-size:13px; color:#777;">
        <p>Best regards,</p>
        <p style="font-weight:600; color:#ccc;">The Bopadi Team</p>
        <p>✉️ <a href="mailto:contact@bopadi.app" style="color:#007AFF; text-decoration:none;">contact@bopadi.app</a></p>
      </div>
      <p style="text-align:center; font-size:11px; color:#555; margin-top:20px;">
        © ${new Date().getFullYear()} Bopadi. All rights reserved.
      </p>
    </div>
  `;

  return transporter.sendMail({
    from: `"Bopadi" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Welcome to the Bopadi Waitlist🎉",
    html: htmlContent,
  });
}

async function sendBroadcastEmail(subject, message, recipients) {
  for (const user of recipients) {
    await transporter.sendMail({
      from: `"Bopadi" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject,
      html: `
        <div style="background-color:#0D0D0D; color:#EAEAEA; font-family:'Inter',Arial,sans-serif; padding:25px; border-radius:12px; max-width:550px; margin:auto;">
          <h2 style="color:#007AFF;">${subject}</h2>
          <p style="color:#ccc; line-height:1.6;">Hi ${
            user.name.split(" ")[0]
          },</p>
          <p style="color:#ccc; line-height:1.6;">${message}</p>
          <hr style="border:0; border-top:1px solid #333; margin:25px 0;">
          <p style="font-size:13px; color:#777; text-align:center;">
            Best regards,<br><strong>The Bopadi Team</strong>
          </p>
        </div>
      `,
    });
  }
}

module.exports = { sendWelcomeEmail, sendBroadcastEmail };
