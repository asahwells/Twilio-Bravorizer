require("dotenv").config();
const express = require("express");
const twilio = require("twilio");

const app = express();
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
app.use(express.json()); // Add this middleware to parse request body as JSON

app.post("/send-sms", (req, res) => {
	const { phoneNumber, message } = req.body;

	client.messages
		.create({
			body: message,
			to: phoneNumber,
			from: "+13203772773",
		})
		.then((message) => {
			console.log("SMS sent successfully");
			res.send("SMS sent successfully");
		})
		.catch((error) => {
			console.error("Error sending SMS:", error);
			res.status(500).send("Error sending SMS");
		});
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server running on port 3000");
});
