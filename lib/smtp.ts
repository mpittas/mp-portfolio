import nodemailer from "nodemailer";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim() &&
      process.env.CONTACT_TO?.trim(),
  );
}

export async function sendContactEmail(payload: ContactPayload) {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const to = requiredEnv("CONTACT_TO");
  const from =
    process.env.SMTP_FROM?.trim() || `"Portfolio contact" <${user}>`;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `Portfolio contact from ${payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    payload.message,
  ].join("\n");

  await transport.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text,
  });
}
