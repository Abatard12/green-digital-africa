import nodemailer from "nodemailer";

const transport = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

// 9. Envoi du résumé ET de l'article
export async function sendArticle(o: { title: string; summary: string; articlePath: string; summaryPath: string; deleteOn: string }) {
  await transport().sendMail({
    from: process.env.MAIL_FROM, to: process.env.MAIL_TO,
    subject: `Veille AfGD : ${o.title}`,
    text: `${o.summary}\n\n---\nL'article et le résumé sont en pièces jointes.\n` +
      `Le journal et son résumé seront supprimés de tous les dossiers le ${o.deleteOn}.`,
    attachments: [{ path: o.articlePath }, { path: o.summaryPath }],
  });
}

export async function sendWarning(title: string, deleteOn: string) {
  await transport().sendMail({
    from: process.env.MAIL_FROM, to: process.env.MAIL_TO,
    subject: `Suppression prochaine : ${title}`,
    text: `Le journal « ${title} » et son résumé seront supprimés de tous les dossiers le ${deleteOn}.`,
  });
}
