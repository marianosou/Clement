const router = require("express").Router()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'clementonlinewineshop@gmail.com',
        pass: 'hrzcwxqcyqqeaqdy'
    }
});

router.post("/", (req, res) => {
    let tot = 0
    const transactionInfo = req.body.transactionInfo.map(item => {
        tot+=item.price*item.quantity
        return `<div>
                <h4>${item.name} qty:${item.quantity}</h4>
                <h4>unit price $${item.price*item.quantity}</h4>
        </div>`
    })

    let htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    @font-face {
        font-family: "BonVivant-Regular";
        src: url("Fonts/Sonneta Script.otf");
      }
    h1  {
        font-family: "BonVivant-Regular";
        font-size: 2.5em;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <h1>Clement Online Wine Store</h1>
    <h2>${req.body.fullname}, thank you for your order.</h2>
    <hr>
    <h3>Purchase details:</h4>
    ${transactionInfo}
    <h2>Total amount $ ${tot}</h4>
</body>
</html>
    `
    const mail = {
        from: "Clement Online <clementonlinewineshop@gmail.com>",
        to: `${req.body.fullname} <${req.body.mailto}>`,
        subject: `Orden de compra N: ${req.body.transactionId}`,
        html: htmlTemplate,
        attachements: [{filename: "images/LogoClement.png"}]
    }

    transporter.sendMail(mail, (err, data) => {
        if (data) res.status(200).json("Email Sent")
        else res.status(400), console.log(err)
    })
})

module.exports = router;