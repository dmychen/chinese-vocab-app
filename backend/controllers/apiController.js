const axios = require("axios");
const nodemailer = require('nodemailer');

// pokemon API getter
exports.pokemon = async (req, res) => {
    try {
        const pokemonName = req.params.name.toLowerCase();
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = {
            name: response.data.name,
            id: response.data.id,
            height: response.data.height,
            weight: response.data.weight,
        }
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: "Pokemon not found!" });
    }
};

exports.simpleGet = (req, res) => {
    res.send("here");
};

// Sets up our email API . 
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'ucladevxtest@gmail.com',
        pass: 'pwek lyup fzqt qtji'
    },
    secure: true,
});

// send email
exports.nodeMailerSendMail = async (req, res) => {
    const {to, subject, text} = req.body; // body takes 4 inputs
    // store mail data in dictionary
    const mailData = {
        from: 'ucladevxtest@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<p>' + text + '<p>',
    }

    // send mail through transporter
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).json({ message: "Mail sent", message_id: info.messageId })
    });
};
