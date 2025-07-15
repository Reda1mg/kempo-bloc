import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kempo2924@gmail.com',          // <-- Your sender email
    pass: 'qihd udlm qgjy rgsl',          // <-- Your app password (no spaces)
  },
});

export async function POST(req) {
  const { name, email, subject, message } = await req.json();

  try {
    await transporter.sendMail({
      from: `"Support Kempo" <kempo2924@gmail.com>`,
      to: "mreda.elalaoui1@gmail.com", // <-- Destination support email
      subject: `[Contact Support] ${subject}`,
      text: `
Nom: ${name}
Email: ${email}
Objet: ${subject}

Message:
${message}
      `,
    });

    return Response.json({ message: 'Message envoyé !' });
  } catch (err) {
    console.error('Erreur email support:', err);
    return Response.json({ message: 'Erreur lors de l\'envoi du message.' }, { status: 500 });
  }
}
