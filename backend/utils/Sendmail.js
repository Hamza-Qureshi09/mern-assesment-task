const nodemailer = require('nodemailer');

module.exports = async (to, subject, otp) => {
    // Nola Terry
    // nola47@ethereal.email
    // kaxfNjSSJS4mefwdaK
    let transporter = nodemailer.createTransport({
        host: 'hq.TechTalks.info',
        // host: 'smtp.ethereal.email',
        service: 'gmail',
        port: 587,
        // prot:465,
        auth: {
            user: 'noman97301@gmail.com',
            pass: 'zxtzxwpvpbqppfjw'
            // user: 'nola47@ethereal.email',
            // pass: 'kaxfNjSSJS4mefwdaK'
        }
    })


    const mailOptions = {
        from: 'HQ <hamzaqureshi2909@gmail.com>',
        to: `${to}`,
        subject: `${subject} ✔`, // Subject line
        text: `Your OTP: ${otp}`,
        html: `<span>Your OTP: </span> <b> ${otp}</b>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent: ' + info.messageId);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}