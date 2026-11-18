import nodemailer from "nodemailer";

const createMailer = async () => {
  const testAccount = await nodemailer.createTestAccount();

  const mailer = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return mailer;
};

const mailer = await createMailer();

const getTestMessageUrl = nodemailer.getTestMessageUrl;

export { mailer, getTestMessageUrl };
