// services/emailService.js
const { ImapFlow } = require("imapflow");
const { getEmailCredentials } = require("../services/getEmailCredentials");

async function connectToEmail(userId) {
  const creds = await getEmailCredentials(userId);

  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user: creds.user,
      pass: creds.password,
    },
  });

  await client.connect();
  console.log("📬 Connected to Gmail inbox for:", creds.user);
  return client;
}

module.exports = { connectToEmail };
