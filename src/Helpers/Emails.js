const nodemailer = require("nodemailer")
exports.sendEmail = async (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smpt.gmail.com",
            port: 465,
            auth: {
                user: "kalpanavarsha118@gmail.com",
                pass: "dlvl cerf uyhg nbph"
            }
        })
        const data = {
            from: "kalpanavarsha118@gmail.com",
            to: req.body.email,
            stubject: req.stubject,
            text: req.text
        }
        transport.sendMail(data, (error, info) => { //callbackfunction
            if (error) {
                console.log(error);
                res.status(400).json({ message: "Email Delivery Error" })
            } else {
                console.log(info);
                res.status(200).json({ message: "success" })
            }

        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error" })

    }

}
