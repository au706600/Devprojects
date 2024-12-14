
/*

const http = require('http');

const server = http.createServer((req, res) => 
{
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<h1>Hello World </h1>');
});

const Port = 8080;

server.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}/`)
});

*/

/*

const http = require('http');

const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('QR_generator.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

const Port = 8080;

server.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}/`)
}); 

*/

// ----Documentation: https://discord.js.org/#/--

// Taking the different "modules" from the "discord.js" library. 
// - The Client module is used to create a client to interact with the Discord API and thereby with the bot. 
// - The GatewayIntentBits module is used to specify the intents (events) that the bot will use. 
// - The AttachmentBuilder module is used to create an attachment image file that will be sent to the user through binary data. 
require('dotenv').config();
const {Client, GatewayIntentBits, AttachmentBuilder} = require('discord.js');

// The "qrcode" module is used to generate a QR code from a URL.
const qrCode = require('qrcode');

// Here, we create a new instance of the client module with the specified intents. Here, we the intents are set to include 
// accessing information from the exclusive server, accessing messages and their content. 
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// When the Discord client creates a new message, it returns a message object, which is then passed to the messageCreate event handler.
// The message object contains information about the qrcode that was created from the specified URL through regex.
client.on("messageCreate", async message => 
{
    const Url_link = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]+/;
    const Match = message.content.match(Url_link);

    if(Match)
    {
        const qrcode_buffer = await qrCode.toBuffer(Match[0]);
        const attachment = new AttachmentBuilder(qrcode_buffer, {name: 'qrcode.png'});
        message.reply({files: [attachment]});
    }
});

// The client is then logged in with the specified token.
client.login(`${process.env.client_id}`)

//console.log("Id: ", process.env.client_id);






