import nodemailer from "nodemailer";

function nodemailer_sent(data) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
    });

    // Send an email using async/await
    (async () => {
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Hello world?", // Plain-text version of the message
           // html: "<b>Hello world?</b>", // HTML version of the message
        });

        console.log("Message sent:", info.messageId);
    })();
}

export default { nodemailer_sent }