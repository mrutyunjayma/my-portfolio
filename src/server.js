const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "mrutyunjaymasanta06@gmail.com", // Update with your Gmail address
    pass: "" // Update with your Gmail password
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/contact", async (req, res) => {
  try {
    const name = req.body.firstName + ' ' + req.body.lastName; // Fix concatenation
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    const mail = {
      from: email, // Update sender email
      to: "mrutyunjaymasanta06@gmail.com", // Update with your personal Gmail address
      subject: "Contact Form Submission - Portfolio",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
    };

    // Send email
    await contactEmail.sendMail(mail);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Message Sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
