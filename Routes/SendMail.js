const router = require("express").Router();
const nodemailer = require('nodemailer');
router.post("/", async (req, res) => {
    const { email } = req.body;
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service:'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'hieptv150698@gmail.com', // generated ethereal user
            pass: 'hieplo98', // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `${email}`, // sender address
        to: "hieptv150698@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
    res.send('Send mail!')
});
module.exports = router;
