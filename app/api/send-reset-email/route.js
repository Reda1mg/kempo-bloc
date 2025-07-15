// app/api/send-reset-email/route.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kempo2924@gmail.com',            // Your Gmail address
    pass: 'qihd udlm qgjy rgsl',            // Your App Password (16 chars, no spaces)
  },
});

export async function POST(req) {
  const { email } = await req.json();

  try {
    // Use the email provided in the input as the recipient
    await transporter.sendMail({
      from: '"Kempo" <kempo2924@gmail.com>', // Sender address
      to: email,                             // Recipient (from the input)
      subject: 'Réinitialisation du mot de passe',
      text: 'Clique sur ce lien pour réinitialiser ton mot de passe : ...',
    });

    return Response.json({ message: 'Email envoyé !' });
  } catch (err) {
    console.error('Erreur email:', err);
    return Response.json({ message: 'Erreur lors de l\'envoi du mail.' }, { status: 500 });
  }
}
