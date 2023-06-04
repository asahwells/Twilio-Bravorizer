const express = require("express");
const twilio = require("twilio");

const app = express();
const client = twilio(
	"AC4d91d8f9028f9922730801c1cfbbd8cd",
	"c552cd34075eca9f7225eb37f7485bce"
);
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

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
